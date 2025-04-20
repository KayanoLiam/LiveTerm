# [💻 KayanoHaruka's Terminal Website](https://www.kayano.fun)

This is my personal terminal-styled website built with LiveTerm and Next.js. It's a customized version of the original [LiveTerm](https://github.com/Cveinnt/LiveTerm) project.

## 🔄 Customizations & Improvements

### UI/UX Changes
- **Minimalist Initial View**: The website starts with just a command prompt, without displaying personal information upfront
- **Bilingual Support**: Support for both English and Chinese content
- **Improved Command Structure**: Commands have been reorganized for better user experience
- **Custom Banner**: Updated the ASCII banner with my personal branding

### Content Changes
- **Personal Information**: Updated with my education, skills, and project experience
- **Resume Command**: Added a detailed resume that displays directly in the terminal
- **GitHub Integration**: Modified to link to my GitHub repositories

### Technical Changes
- **AI Chat Integration**: Added AI chat functionality using Google's Gemini API with environment variables for secure API key storage
- **Removed Article System**: Simplified the website by removing the article/blog functionality
- **Removed Sumfetch**: Simplified the codebase by removing the sumfetch component
- **Enhanced Help Command**: Improved the help command with better categorization
- **Direct Information Display**: Information is now displayed directly in the terminal instead of opening external links

## 📸 Website Features

### Available Commands

Here are some of the key commands available on my website:

- `help` - List all available commands
- `about` - Display information about me and my skills
- `resume` - View my detailed resume directly in the terminal
- `repo` - Visit my GitHub repositories
- `email` - Contact me via email

#### AI Chat Commands
- `ai [question]` - Chat with AI assistant powered by Google's Gemini API
- `ai-clear` - Clear AI chat history

The AI assistant can answer questions, provide information, and even write code examples. It remembers the conversation context, allowing for follow-up questions.

### Navigation

- Use `Tab` for command completion
- Use `Ctrl+L` or type `clear` to clear the terminal
- Use arrow keys to navigate command history

## 🚀 Deployment

This website is deployed on Vercel and accessible at [www.kayano.fun](https://www.kayano.fun).

### Local Development

If you want to run this website locally:

```bash
# Clone the repository
git clone https://github.com/KayanoLiam/LiveTerm.git

# Navigate to the project directory
cd LiveTerm

# Install dependencies
npm install
# or
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key

# Start the development server
npm run dev
# or
yarn dev
```

The website will be available at [http://localhost:3000](http://localhost:3000).

## 📝 Configuration Details

### Key Files Modified

The following files were modified from the original LiveTerm project:

- `config.json` - Updated with my personal information and preferences
- `src/utils/bin/commands.ts` - Modified commands and added custom functionality
- `src/utils/bin/index.ts` - Removed sumfetch component and article functionality, added AI chat
- `public/manifest.json` - Updated website metadata
- `src/styles/global.css` - Simplified by removing article-related styles
- Added `src/utils/bin/ai_commands.ts` - Added AI chat functionality
- Added `src/utils/bin/command_aliases.ts` - Added command aliases for AI chat
- Removed `src/utils/bin/article_commands.ts` - Removed article functionality
- Removed `src/utils/data/articles.ts` - Removed article data
- Removed `src/utils/copyCode.ts` - Removed code copy functionality for articles

### Example Configuration

```javascript
// Example of my customized config.json
{
  "readmeUrl": "https://raw.githubusercontent.com/KayanoLiam/KayanoLiam/main/README.md",
  "title": "Kayano's Terminal",
  "name": "KayanoHaruka",
  "ascii": "liveterm",
  "social": {
    "github": "KayanoLiam"
  },
  "email": "Kayano04@outlook.jp",
  "ps1_hostname": "kayano.fun",
  "ps1_username": "visitor"
}
```

### Banner

The ASCII banner was generated using [ASCII Banner Generator](https://manytools.org/hacker-tools/ascii-banner/) and customized to display my name.

### Environment Variables

This project uses environment variables to securely store API keys. The following variables are required:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

You can get a Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

## 🌐 Deployment on Vercel

This website is deployed using [Vercel](https://vercel.com/), which provides seamless integration with Next.js applications. The deployment process involves:

1. Pushing code to the GitHub repository
2. Connecting the repository to Vercel
3. Configuring the custom domain (www.kayano.fun)

## 👏 Acknowledgements

- Original [LiveTerm](https://github.com/Cveinnt/LiveTerm) project by [Cveinnt](https://github.com/Cveinnt)
- Based on [Terminal](https://github.com/m4tt72/terminal) by M4TT72
- Built with [Next.js](https://nextjs.org/)

## 🔒 License

This project is licensed under the MIT License - see the original [LiveTerm repository](https://github.com/Cveinnt/LiveTerm) for details.
