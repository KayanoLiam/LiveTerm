interface Article {
  id: string;
  title: string;
  date: string;
  tags: string[];
  content: string;
}

// Admin password for article management
// In a real application, this should be stored securely and not in client-side code
const ADMIN_PASSWORD = "kayano123";

// Articles are stored in localStorage to persist between sessions
const loadArticles = (): Article[] => {
  if (typeof window !== 'undefined') {
    const savedArticles = localStorage.getItem('terminal_articles');
    if (savedArticles) {
      return JSON.parse(savedArticles);
    }
  }
  return DEFAULT_ARTICLES;
};

const saveArticles = (articles: Article[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('terminal_articles', JSON.stringify(articles));
  }
};

// Default articles that will be loaded if no articles are found in localStorage
const DEFAULT_ARTICLES: Article[] = [
  {
    id: "getting-started-with-rust",
    title: "Getting Started with Rust Programming",
    date: "2023-05-15",
    tags: ["rust", "programming", "beginner"],
    content: `# Getting Started with Rust Programming

Rust is a systems programming language that focuses on safety, speed, and concurrency. It's designed to provide memory safety while maintaining high performance.

## Why Learn Rust?

- **Memory Safety Without Garbage Collection**: Rust's ownership system ensures memory safety at compile time.
- **Concurrency Without Data Races**: Rust's type system prevents data races.
- **Zero-Cost Abstractions**: Rust provides high-level features without runtime overhead.

## Setting Up Your Environment

First, install Rust using rustup:

\`\`\`bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
\`\`\`

## Your First Rust Program

Create a file named \`hello.rs\`:

\`\`\`rust
fn main() {
    println!("Hello, world!");
}
\`\`\`

Compile and run it:

\`\`\`bash
rustc hello.rs
./hello
\`\`\`

## Using Cargo

Cargo is Rust's build system and package manager. Create a new project:

\`\`\`bash
cargo new hello_cargo
cd hello_cargo
\`\`\`

Build and run your project:

\`\`\`bash
cargo build
cargo run
\`\`\`

## Next Steps

- Explore the [Rust Book](https://doc.rust-lang.org/book/)
- Try building small projects
- Join the Rust community on [Discord](https://discord.gg/rust-lang)

Happy coding!`
  },
  {
    id: "java-vs-kotlin",
    title: "Java vs Kotlin: A Comparison for Android Development",
    date: "2023-06-22",
    tags: ["java", "kotlin", "android", "programming"],
    content: `# Java vs Kotlin: A Comparison for Android Development

Android development has evolved over the years, and with it, the programming languages used. Let's compare Java and Kotlin for Android development.

## Java: The Original Android Language

Java has been the primary language for Android development since the beginning. It's object-oriented, class-based, and runs on the Java Virtual Machine (JVM).

### Pros of Java:
- Mature ecosystem with extensive libraries
- Large community and resources
- Stable and well-documented

### Cons of Java:
- Verbose syntax
- Null pointer exceptions
- Slower development time

## Kotlin: The Modern Alternative

Kotlin is a statically typed language that runs on the JVM and is fully interoperable with Java. Google officially supports Kotlin for Android development.

### Pros of Kotlin:
- Concise syntax (less boilerplate)
- Null safety built into the type system
- Modern language features (extension functions, coroutines)

### Cons of Kotlin:
- Steeper learning curve for beginners
- Slightly slower compilation time
- Smaller (but growing) community

## Code Comparison

### Java Example:
\`\`\`java
public class User {
    private final String name;
    private final int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
\`\`\`

### Kotlin Example:
\`\`\`kotlin
data class User(val name: String, val age: Int)
\`\`\`

## Conclusion

Both languages have their strengths and weaknesses. Java is more established but Kotlin offers modern features that can increase productivity. If you're starting a new Android project, Kotlin is recommended by Google, but Java is still a valid choice, especially if your team is already familiar with it.`
  },
  {
    id: "intro-to-vue",
    title: "Introduction to Vue.js Framework",
    date: "2023-07-10",
    tags: ["vue", "javascript", "frontend", "web-development"],
    content: `# Introduction to Vue.js Framework

Vue.js is a progressive JavaScript framework used for building user interfaces. It's designed to be incrementally adoptable, meaning you can start using it for just a small part of your application.

## Why Choose Vue?

- **Approachable**: Familiar syntax for HTML, CSS, and JavaScript developers
- **Versatile**: Can be used for a library or a full-featured framework
- **Performant**: Virtual DOM rendering and minimal optimization efforts
- **Maintainable**: Logical component-based architecture

## Getting Started

Add Vue to your project using a CDN:

\`\`\`html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
\`\`\`

Or install it using npm:

\`\`\`bash
npm install vue
\`\`\`

## Basic Example

\`\`\`html
<div id="app">
  <h1>{{ message }}</h1>
  <button @click="reverseMessage">Reverse Message</button>
</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    },
    methods: {
      reverseMessage() {
        this.message = this.message.split('').reverse().join('')
      }
    }
  }).mount('#app')
</script>
\`\`\`

## Vue Components

Components are reusable Vue instances with a name:

\`\`\`javascript
app.component('todo-item', {
  props: ['todo'],
  template: \`<li>{{ todo.text }}</li>\`
})
\`\`\`

## Vue CLI

For larger projects, use Vue CLI:

\`\`\`bash
npm install -g @vue/cli
vue create my-project
\`\`\`

## Conclusion

Vue.js offers a gentle learning curve while providing powerful features for building modern web applications. Its flexibility makes it suitable for projects of any size, from simple widgets to complex single-page applications.`
  }
];

// Initialize articles from localStorage or defaults
let articles = loadArticles();

// Get all articles
export const getArticles = (): Article[] => {
  return articles;
};

// Get article by ID
export const getArticleById = (id: string): Article | undefined => {
  return articles.find(article => article.id === id);
};

// Get articles by tag
export const getArticlesByTag = (tag: string): Article[] => {
  return articles.filter(article => article.tags.includes(tag.toLowerCase()));
};

// Get all unique tags
export const getAllTags = (): string[] => {
  const tagsSet = new Set<string>();

  articles.forEach(article => {
    article.tags.forEach(tag => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet).sort();
};

// Verify admin password
export const verifyPassword = (password: string): boolean => {
  return password === ADMIN_PASSWORD;
};

// Create a new article
export const createArticle = (article: Omit<Article, 'id' | 'date'>, password: string): { success: boolean; message: string; id?: string } => {
  // Verify password
  if (!verifyPassword(password)) {
    return { success: false, message: 'Incorrect password. Access denied.' };
  }

  // Generate ID from title
  const id = article.title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '-');

  // Check if ID already exists
  if (articles.some(a => a.id === id)) {
    return { success: false, message: `Article with ID '${id}' already exists.` };
  }

  // Create new article
  const newArticle: Article = {
    id,
    title: article.title,
    date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
    tags: article.tags,
    content: article.content
  };

  // Add to articles array
  articles = [...articles, newArticle];

  // Save to localStorage
  saveArticles(articles);

  return { success: true, message: `Article '${article.title}' created successfully.`, id };
};

// Delete an article
export const deleteArticle = (id: string, password: string): { success: boolean; message: string } => {
  // Verify password
  if (!verifyPassword(password)) {
    return { success: false, message: 'Incorrect password. Access denied.' };
  }

  // Check if article exists
  const articleIndex = articles.findIndex(a => a.id === id);
  if (articleIndex === -1) {
    return { success: false, message: `Article with ID '${id}' not found.` };
  }

  // Remove article
  articles = articles.filter(a => a.id !== id);

  // Save to localStorage
  saveArticles(articles);

  return { success: true, message: `Article with ID '${id}' deleted successfully.` };
};

// List all article IDs and titles
export const listArticles = (): { id: string; title: string }[] => {
  return articles.map(article => ({
    id: article.id,
    title: article.title
  }));
};
