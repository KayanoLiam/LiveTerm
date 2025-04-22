import axios from 'axios';
import config from '../../../config.json';

// Get API key from environment variable
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

// Check if API key exists
const hasApiKey = apiKey && apiKey.length > 0;

// AI对话历史记录
let conversationHistory: { role: string; content: string }[] = [];

// 系统提示词 - 从环境变量读取，或使用默认值
const defaultSystemPrompt = `You are Kayano, a friendly and knowledgeable terminal-based AI assistant. Your personality is helpful, concise, and slightly playful.

When responding:
- Identify yourself as Kayano
- Respond in English by default
- If the user writes in Chinese, respond in Chinese
- For coding questions, provide well-commented code with explanations
- Keep responses concise but informative
- For technical topics, show your expertise in programming (JavaScript, TypeScript, React, Next.js)
- When asked about yourself, mention you're a terminal-based assistant created for www.kayano.fun
- Never mention being an AI model created by Google or any other company

Your goal is to provide a personalized, terminal-friendly experience that feels like chatting with a knowledgeable developer friend.`;

const systemPrompt = process.env.NEXT_PUBLIC_AI_SYSTEM_PROMPT || defaultSystemPrompt;

// 清除对话历史
export const clearAiChat = async (args: string[]): Promise<string> => {
  conversationHistory = [];
  return "AI chat history cleared.";
};

// 与AI对话的主要命令 - 流式输出版本
export const aiChat = async (args: string[], setHistory: (value: string) => void): Promise<void> => {
  // 检查API密钥
  if (!hasApiKey) {
    setHistory(`
<span style="color: #ff8037;">Error: Gemini API key not configured</span>

Please add your Gemini API key in the .env file:

NEXT_PUBLIC_GEMINI_API_KEY=YOUR_API_KEY_HERE

You can get an API key at: https://aistudio.google.com/app/apikey
`);
    return;
  }

  // 如果没有提供参数，显示帮助信息
  if (args.length === 0) {
    setHistory(`
<span style="color: #ff8037; font-weight: bold;">AI Chat Mode</span>

Usage:
- <span style="color: #83a598;">ai [your question]</span> - Ask the AI a question
- <span style="color: #83a598;">ai-clear</span> - Clear conversation history

Examples:
- ai Explain how artificial intelligence works
- ai Write a simple calculator program in Python
- ai How can I learn Japanese?

<span style="color: #b8bb26;">Tip:</span> The AI remembers conversation history, so you can ask follow-up questions.
`);
    return;
  }

  // 获取用户输入
  const userInput = args.join(' ');

  try {
    // 添加用户消息到历史记录
    conversationHistory.push({ role: "user", content: userInput });

    // 准备请求数据
    let requestData = {
      contents: [
        {
          role: "user",
          parts: [
            { text: userInput }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      }
    };

    // 如果有对话历史，则使用对话格式
    if (conversationHistory.length > 1) { // 如果历史记录大于1（当前问题算一条）
      // 先移除最后一条，因为这是我们刚刚添加的当前问题
      const currentQuestion = conversationHistory.pop();

      // 创建新的内容数组
      const contents = [];

      // 添加历史对话
      conversationHistory.forEach(msg => {
        contents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }]
        });
      });

      // 添加当前用户问题
      if (currentQuestion) {
        contents.push({
          role: "user",
          parts: [{ text: currentQuestion.content }]
        });

        // 将当前问题放回历史记录
        conversationHistory.push(currentQuestion);
      }

      // 替换请求数据中的contents
      requestData.contents = contents;
    }

    // 显示用户问题和加载指示器
    setHistory(`
<div style="border-left: 2px solid #ff8037; padding-left: 10px; margin: 10px 0;">
  <span style="color: #ebdbb2; font-style: italic;">Your question:</span>
  <div style="margin: 5px 0 15px 0;">${userInput}</div>
  <span style="color: #ff8037; font-weight: bold;">AI response:</span>
  <div style="margin-top: 5px;" id="ai-response">
    <span class="loading-indicator">Thinking<span class="dot-1">.</span><span class="dot-2">.</span><span class="dot-3">.</span></span>
  </div>
</div>
<style>
  @keyframes blink {
    0% { opacity: 0.2; }
    20% { opacity: 1; }
    100% { opacity: 0.2; }
  }
  .loading-indicator .dot-1, .loading-indicator .dot-2, .loading-indicator .dot-3 {
    animation: blink 1.4s infinite;
    animation-fill-mode: both;
  }
  .loading-indicator .dot-2 { animation-delay: 0.2s; }
  .loading-indicator .dot-3 { animation-delay: 0.4s; }
</style>
`);

    // 使用axios进行流式请求
    let aiResponse = '';
    let isFirstChunk = true;

    try {
      // 使用axios发送请求，但不等待完整响应
      const axiosResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          responseType: 'text'
        }
      );

      // 处理完整响应
      if (axiosResponse.data &&
          axiosResponse.data.candidates &&
          axiosResponse.data.candidates[0] &&
          axiosResponse.data.candidates[0].content &&
          axiosResponse.data.candidates[0].content.parts &&
          axiosResponse.data.candidates[0].content.parts[0]) {

        aiResponse = axiosResponse.data.candidates[0].content.parts[0].text;

        // 更新UI，显示完整响应
        setHistory(`
<div style="border-left: 2px solid #ff8037; padding-left: 10px; margin: 10px 0;">
  <span style="color: #ebdbb2; font-style: italic;">Your question:</span>
  <div style="margin: 5px 0 15px 0;">${userInput}</div>
  <span style="color: #ff8037; font-weight: bold;">AI response:</span>
  <div style="margin-top: 5px;" id="ai-response">
    ${formatAiResponse(aiResponse)}
  </div>
</div>
`);

        // 模拟打字机效果
        simulateTypingEffect(aiResponse, userInput, setHistory);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error with axios request:', error);
      throw error; // 将错误传递给外部catch块
    }

    // 添加AI回复到历史记录
    conversationHistory.push({ role: "assistant", content: aiResponse });

    // 最终更新
    setHistory(`
<div style="border-left: 2px solid #ff8037; padding-left: 10px; margin: 10px 0;">
  <span style="color: #ebdbb2; font-style: italic;">Your question:</span>
  <div style="margin: 5px 0 15px 0;">${userInput}</div>
  <span style="color: #ff8037; font-weight: bold;">AI response:</span>
  <div style="margin-top: 5px;">
    ${formatAiResponse(aiResponse)}
  </div>
</div>
`);

  } catch (error) {
    console.error('AI API call error:', error);
    console.error('Request data:', JSON.stringify(requestData, null, 2));

    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    } else if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }

    setHistory(`
<span style="color: #fb4934;">Error: AI API call failed</span>

Details: ${error.message || 'Unknown error'}

Please check if your API key is correct, or try again later.
`);
  }
};

// 模拟打字机效果
async function simulateTypingEffect(fullResponse: string, userInput: string, setHistory: (value: string) => void) {
  // 将完整响应分成小块
  const chunks = splitIntoChunks(fullResponse, 5); // 每次显示5个字符
  let displayedText = '';

  for (let i = 0; i < chunks.length; i++) {
    // 添加新块
    displayedText += chunks[i];

    // 更新UI
    setHistory(`
<div style="border-left: 2px solid #ff8037; padding-left: 10px; margin: 10px 0;">
  <span style="color: #ebdbb2; font-style: italic;">Your question:</span>
  <div style="margin: 5px 0 15px 0;">${userInput}</div>
  <span style="color: #ff8037; font-weight: bold;">AI response:</span>
  <div style="margin-top: 5px;" id="ai-response">
    ${formatAiResponse(displayedText)}
  </div>
</div>
`);

    // 暂停一小段时间，模拟打字速度
    await new Promise(resolve => setTimeout(resolve, 10));
  }
}

// 将文本分成小块
function splitIntoChunks(text: string, chunkSize: number): string[] {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks;
}

// 格式化AI回复，处理代码块和其他格式
function formatAiResponse(text: string): string {
  // 处理代码块
  text = text.replace(/```([\s\S]*?)```/g, (match, code) => {
    // 检测语言
    const languageMatch = code.match(/^([a-zA-Z]+)\n/);
    let language = '';
    let codeContent = code;

    if (languageMatch) {
      language = languageMatch[1];
      codeContent = code.substring(languageMatch[0].length);
    }

    return `
<div style="background-color: rgba(0, 0, 0, 0.3); border-radius: 5px; margin: 10px 0; overflow: auto;">
  ${language ? `<div style="background-color: rgba(0, 0, 0, 0.5); padding: 5px 10px; color: #ff8037; font-size: 0.8em;">${language}</div>` : ''}
  <pre style="padding: 10px; margin: 0; overflow-x: auto;"><code>${codeContent}</code></pre>
</div>
`;
  });

  // 处理粗体
  text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // 处理斜体
  text = text.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // 处理列表
  text = text.replace(/^- (.*)/gm, '• $1');

  // 处理链接
  text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" style="color: #83a598; text-decoration: underline;">$1</a>');

  // 处理段落
  text = text.replace(/\n\n/g, '</p><p>');
  text = `<p>${text}</p>`;

  return text;
}
