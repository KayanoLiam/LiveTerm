import axios from 'axios';
import config from '../../../config.json';

// Get API key from environment variable
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';

// Check if API key exists
const hasApiKey = apiKey && apiKey.length > 0;

// AI对话历史记录
let conversationHistory: { role: string; content: string }[] = [];

// 系统提示词
const systemPrompt = "You are an intelligent assistant named kayano. Please respond to user questions in English by default. Provide detailed and accurate information. If the user asks you to write code, provide code with detailed comments. Only respond in Chinese if the user specifically asks or writes in Chinese.";

// 清除对话历史
export const clearAiChat = async (args: string[]): Promise<string> => {
  conversationHistory = [];
  return "AI chat history cleared.";
};

// 与AI对话的主要命令
export const aiChat = async (args: string[]): Promise<string> => {
  // 检查API密钥
  if (!hasApiKey) {
    return `
<span style="color: #ff8037;">Error: Gemini API key not configured</span>

Please add your Gemini API key in the .env file:

NEXT_PUBLIC_GEMINI_API_KEY=YOUR_API_KEY_HERE

You can get an API key at: https://aistudio.google.com/app/apikey
`;
  }

  // 如果没有提供参数，显示帮助信息
  if (args.length === 0) {
    return `
<span style="color: #ff8037; font-weight: bold;">AI Chat Mode</span>

Usage:
- <span style="color: #83a598;">ai [your question]</span> - Ask the AI a question
- <span style="color: #83a598;">ai-clear</span> - Clear conversation history

Examples:
- ai Explain how artificial intelligence works
- ai Write a simple calculator program in Python
- ai How can I learn Japanese?

<span style="color: #b8bb26;">Tip:</span> The AI remembers conversation history, so you can ask follow-up questions.
`;
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
      ]
    };

    // 如果有对话历史，则使用对话格式
    if (conversationHistory.length > 1) { // 如果历史记录大于1（当前问题算一条）
      // 先移除最后一条，因为这是我们刚刚添加的当前问题
      const currentQuestion = conversationHistory.pop();

      // 创建新的内容数组
      const contents = [];

      // 添加系统提示词
      contents.push({
        role: "user",
        parts: [{ text: systemPrompt }]
      });

      contents.push({
        role: "model",
        parts: [{ text: "I understand. I'm kayano, and I'll answer your questions as requested." }]
      });

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
    } else {
      // 如果没有历史对话，添加系统提示词
      requestData.contents = [
        {
          role: "user",
          parts: [{ text: systemPrompt }]
        },
        {
          role: "model",
          parts: [{ text: "I understand. I'm kayano, and I'll answer your questions as requested." }]
        },
        {
          role: "user",
          parts: [{ text: userInput }]
        }
      ];
    }

    // 调用Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // 处理响应
    console.log('API response:', JSON.stringify(response.data, null, 2));

    if (response.data &&
        response.data.candidates &&
        response.data.candidates[0] &&
        response.data.candidates[0].content &&
        response.data.candidates[0].content.parts &&
        response.data.candidates[0].content.parts[0]) {

      const aiResponse = response.data.candidates[0].content.parts[0].text;

      // 添加AI回复到历史记录
      conversationHistory.push({ role: "assistant", content: aiResponse });

      // 格式化输出
      return `
<div style="border-left: 2px solid #ff8037; padding-left: 10px; margin: 10px 0;">
  <span style="color: #ebdbb2; font-style: italic;">Your question:</span>
  <div style="margin: 5px 0 15px 0;">${userInput}</div>
  <span style="color: #ff8037; font-weight: bold;">AI response:</span>
  <div style="margin-top: 5px;">${formatAiResponse(aiResponse)}</div>
</div>
`;
    } else {
      return `<span style="color: #fb4934;">Error: Unable to get AI response.</span>`;
    }
  } catch (error) {
    console.error('AI API call error:', error);
    console.error('Request data:', JSON.stringify(requestData, null, 2));

    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }

    return `
<span style="color: #fb4934;">Error: AI API call failed</span>

Details: ${error.message || 'Unknown error'}

Please check if your API key is correct, or try again later.
`;
  }
};

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
