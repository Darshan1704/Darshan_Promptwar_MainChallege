# 🧠 MindShift AI
### AI-Powered Habit Transformation & Addiction Recovery Coach

> A GenAI-powered web application that helps users reduce harmful habits such as excessive screen time, gaming, social media addiction, and other unhealthy behaviors through personalized AI coaching, intelligent nudges, progress tracking, and adaptive behavior analysis.

---

## 🚀 Problem Statement

Millions of people struggle with harmful habits that negatively impact productivity, mental health, and overall well-being. Existing habit trackers only record data—they don't understand *why* users relapse or provide personalized guidance.

MindShift AI leverages Generative AI to become an intelligent accountability partner that continuously learns from user behavior and provides adaptive coaching.

---

# ✨ Features

## 🤖 AI Habit Coach

- Personalized conversations powered by Gemini
- Daily motivational coaching
- Behavioral insights
- Adaptive suggestions based on user history
- Emotional support during relapse

---

## 📊 Habit Tracking

- Create custom habits
- Track daily progress
- Record streaks
- View success percentage
- Daily completion statistics

---

## 🎯 Personalized Goals

Users can

- Set weekly goals
- Define target habits
- Monitor improvement
- Receive AI-generated recommendations

---

## 🔔 Smart Nudges

The AI reminds users to

- Stay focused
- Avoid triggers
- Celebrate milestones
- Recover after relapses

---

## 📈 Progress Dashboard

Visual analytics including

- Habit completion
- Weekly trends
- Monthly progress
- Streak history

---

## 🧠 Adaptive AI

Instead of giving identical advice to everyone, the AI

- Understands previous conversations
- Learns user preferences
- Generates contextual coaching
- Provides unique recovery plans

---

# 🏗️ System Architecture

```
                User
                  │
                  ▼
          React Frontend
                  │
                  ▼
        Backend API Server
                  │
       ┌──────────┴─────────┐
       ▼                    ▼
 Gemini API             Database
       │                    │
       ▼                    ▼
 Personalized AI      User Progress
```

---

# 🛠 Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express

### Database

- Firebase / MongoDB / Supabase *(replace with yours)*

### AI

- Google Gemini API

### Authentication

- Firebase Auth / Clerk / JWT *(replace with yours)*

---

# 🧠 How AI Works

1. User logs their daily habit.
2. Previous progress is retrieved.
3. User history is combined with today's data.
4. Gemini generates personalized coaching.
5. The response is saved for future learning.
6. Progress dashboards update automatically.

Unlike traditional chatbots, the AI provides adaptive coaching based on behavioral patterns.

---

# 📂 Project Structure

```
src/
│
├── components/
├── pages/
├── hooks/
├── services/
├── utils/
├── api/
├── context/
├── types/
└── assets/
```

---

# ⚙️ Installation

```bash
git clone https://github.com/yourusername/project.git

cd project

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file.

```env
VITE_GEMINI_API_KEY=your_api_key

DATABASE_URL=your_database

AUTH_SECRET=your_secret
```

---

# 📸 Screenshots

## Dashboard

(Add screenshot)

---

## AI Coach

(Add screenshot)

---

## Habit Tracker

(Add screenshot)

---

## Progress Analytics

(Add screenshot)

---

# 🎥 Demo Video

(Add YouTube link)

---

# 🧪 Testing

The application has been tested for

- User Authentication
- AI Response Generation
- Habit Tracking
- Dashboard Updates
- Progress Calculations

---

# 🔒 Security

- Environment variables
- Secure authentication
- Input validation
- Protected API routes
- Error handling
- No API keys exposed

---

# ♿ Accessibility

- Responsive UI
- Keyboard navigation
- Proper labels
- High contrast
- Mobile support

---

# 📈 Future Improvements

- Voice-based AI coach
- Wearable integration
- Smartwatch reminders
- AI relapse prediction
- Family accountability mode
- Therapist dashboard
- Multilingual support

---

# 💡 Innovation

Unlike conventional habit trackers, MindShift AI acts as a behavioral coach that learns, adapts, and continuously motivates users using Generative AI.

---

# 👨‍💻 Team

Team Name

Members

College / Organization

---

# 📄 License

MIT License

---

# 🙏 Acknowledgements

- Google Gemini API
- Google AI Studio
- PromptWars
- Build with AI