import axios from 'axios';
import config from '../../../config.json';

// 检查是否有API密钥
const hasApiKey = config.geminiApiKey && config.geminiApiKey.length > 0;

// AI对话历史记录
let conversationHistory: { role: string; content: string }[] = [
  { role: "model", content: "你的名字是kayano" }
];

// 清除对话历史
export const clearAiChat = async (args: string[]): Promise<string> => {
  // 保留系统提示词
  conversationHistory = [
    { role: "model", content: "你的名字是kayano" }
  ];
  return "AI对话历史已清除。";
};

// 与AI对话的主要命令
export const aiChat = async (args: string[]): Promise<string> => {
  // 检查API密钥
  if (!hasApiKey) {
    return `
<span style="color: #ff8037;">错误：未配置Gemini API密钥</span>

请在config.json文件中添加您的Gemini API密钥：
{
  ...
  "geminiApiKey": "YOUR_API_KEY_HERE"
  ...
}

您可以在以下网址获取API密钥：https://aistudio.google.com/app/apikey
`;
  }

  // 如果没有提供参数，显示帮助信息
  if (args.length === 0) {
    return `
<span style="color: #ff8037; font-weight: bold;">AI对话模式</span>

使用方法：
- <span style="color: #83a598;">ai [您的问题]</span> - 向AI提问
- <span style="color: #83a598;">ai-clear</span> - 清除对话历史

示例：
- ai 解释一下人工智能是如何工作的
- ai 用Python写一个简单的计算器程序
- ai 如何学习日语？

<span style="color: #b8bb26;">提示：</span> AI会记住对话历史，您可以继续提问相关问题。
`;
  }

  // 获取用户输入
  const userInput = args.join(' ');

  try {
    // 添加用户消息到历史记录
    conversationHistory.push({ role: "user", content: userInput });

    // 准备请求数据
    const requestData = {
      contents: [
        {
          parts: conversationHistory.map(msg => ({
            text: msg.content,
            role: msg.role === "user" ? "user" : "model"
          }))
        }
      ]
    };

    // 调用Gemini API
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${config.geminiApiKey}`,
      requestData,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // 处理响应
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
  <span style="color: #ebdbb2; font-style: italic;">您的问题：</span>
  <div style="margin: 5px 0 15px 0;">${userInput}</div>
  <span style="color: #ff8037; font-weight: bold;">AI回答：</span>
  <div style="margin-top: 5px;">${formatAiResponse(aiResponse)}</div>
</div>
`;
    } else {
      return `<span style="color: #fb4934;">错误：无法获取AI回复。</span>`;
    }
  } catch (error) {
    console.error('AI API调用错误:', error);
    return `
<span style="color: #fb4934;">错误：AI API调用失败</span>

详细信息：${error.message || '未知错误'}

请检查您的API密钥是否正确，或者稍后再试。
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
