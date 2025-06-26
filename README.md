
# 🚀 Zeltra AI

Zeltra AI is a chatbot that helps founders refine and structure their startup ideas through focused, LLM-powered conversations.

Built using **LangChain** and **Gemini**, it guides users from raw ideas to more defined directions by providing:

- 🧠 Idea breakdown (market, problem, solution)  
- 🔍 Niche suggestions  
- ✍️ Tailored MVP-building prompts  

---

## 🔧 Tech Stack

- **Framework**: Next.js (App Router) + TypeScript  
- **LLM**: Gemini API via LangChain  
- **Database**: PostgreSQL with Prisma ORM  
- **Memory**: BufferMemory (for short-term chat context)  
- **Authentication**: NextAuth.js  
- **Deployment**: Vercel  

---

## 📁 Folder Structure

```
zeltra-ai/
├── app/            → Next.js App Router
│   ├── api/        → API routes (/analyze, /niche-insights)
│   └── chat/       → Chat interface
├── components/     → Reusable UI components
├── context/        → Global state/context providers
├── hooks/          → Custom React hooks
├── lib/            → LangChain logic
├── prisma/         → Prisma schema/migrations
├── schemas/        → Zod schemas
├── styles/         → Global styles (Tailwind)
└── utils/          → Utility functions
```

---

## 🚀 Getting Started

1. **Clone the repo**

```
git clone https://github.com/avinash-1707/zeltra-ai.git
cd zeltra-ai
```

2. **Install dependencies**

```
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root with:

```
DATABASE_URL=your_postgres_url
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_API_KEY=your_gemini_api_key
```

4. **Run Prisma**

```
npx prisma generate
npx prisma migrate dev
```

5. **Start the dev server**

```
npm run dev
```

---

## 🛠️ Deployment

Deployed via [Vercel](https://vercel.com). Just connect the repo and add your environment variables.

---

## 🤝 Contributing

Open to contributions, ideas, and feedback. Feel free to open an issue or PR!

---

## 👤 Author

**Avinash Narwariya**  
[LinkedIn]([https://www.linkedin.com/in/avinashnarwariya](https://www.linkedin.com/in/avinash-narwariya-392513336/))
