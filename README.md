# KasaUp

**KasaUp is an AI-powered seminar participation coach that helps students speak up during live class discussions.**

Many students understand the reading and have thoughtful ideas, but struggle to jump into fast-moving seminar conversations at the right moment. KasaUp listens to the discussion in real time, understands the context of the assigned reading, and suggests smart things the student can say while the conversation is happening.

The goal is simple: help students feel more prepared, confident, and included in discussion-based classes.



## What KasaUp Does

KasaUp turns a live seminar into an interactive support system for students.

A student can:

1. Start a class session
2. Paste in the assigned reading or topic notes
3. Let KasaUp listen to the live discussion
4. Receive real-time suggestions for what to say
5. Mark suggestions as used
6. End the session and receive organized notes from the discussion

Instead of being a passive note-taking tool, KasaUp actively helps students participate.



## The Problem It Solves

Seminar classes often reward students who can think quickly, speak confidently, and find the right opening in a discussion. That can be difficult for students who are shy, anxious, new to the topic, or still forming their ideas.

KasaUp helps bridge that gap by giving students timely, relevant prompts such as:

- a question they can ask
- a point from the reading they can bring up
- a thoughtful counterpoint or pushback
- a summary of key discussion themes after class

This makes participation more accessible without replacing the student’s own thinking.



## Key Features

### Real-Time Speech Transcription

KasaUp uses the browser’s speech recognition capabilities to listen to a live classroom discussion and convert spoken conversation into a running transcript.

Students do not need to type notes manually while trying to follow the discussion.



### Live AI Participation Suggestions

During the session, KasaUp sends the most recent part of the transcript to an AI backend and returns three concise suggestions the student can say in the moment:

- **Question** — something thoughtful to ask the room
- **From reading** — a point connected to the assigned text
- **Push back** — a respectful counterargument or challenge

Each suggestion is designed to sound like something a smart student would naturally say, not like an AI-generated script.



### Reading-Aware Suggestions

Before class, the student can paste in their assigned reading or notes.

KasaUp uses that context when generating suggestions, so the responses are not generic. They are grounded in what the student was actually supposed to read or discuss.



### Post-Session Notes

When the session ends, KasaUp automatically turns the transcript into structured notes, including:

- a short discussion summary
- core concepts
- key arguments
- unresolved questions
- useful follow-up ideas
- important quotes from the discussion

This helps students review what happened after class and prepare for future sessions.



### Quick Session Mode

KasaUp includes a quick-start flow for students who want to try it immediately without creating an account or saving anything.

This makes the product easy to demo and lowers the barrier for first-time users.



## How It Works

KasaUp has three main parts:

### 1. Frontend Web App

The frontend is built with **React**.

It handles the student-facing experience:

- landing page
- session setup
- live listening interface
- real-time transcript display
- AI suggestion cards
- post-session summary page

The interface is designed around a simple classroom workflow: prepare, listen, participate, review.



### 2. Backend API

The backend is built with **Python FastAPI**.

It acts as the bridge between the frontend and the AI model. The frontend sends the transcript and optional reading text to the backend, and the backend returns structured AI responses.

The backend currently supports two main actions:

- `/suggestions` — generates live participation suggestions
- `/notes` — generates structured post-session notes



### 3. Claude AI Integration

KasaUp uses the Claude API to generate context-aware suggestions and notes.

The AI is prompted to behave like a quiet participation coach for students. It is specifically instructed to produce short, natural suggestions that a student could realistically say during a seminar.



## User Flow

A typical KasaUp session looks like this:

1. The student opens KasaUp.
2. They choose a quick session or set up a named class session.
3. They paste in the assigned reading or topic notes.
4. They start the live listening session.
5. KasaUp transcribes the class discussion.
6. The student can request suggestions or receive them during the session.
7. The student marks useful suggestions as used.
8. At the end, KasaUp generates a clean summary of the discussion.



## Why This Project Matters

KasaUp is built around a real student experience: knowing you have something to contribute, but not knowing exactly when or how to say it.

The product is not just a chatbot. It is a real-time classroom companion that combines speech recognition, AI reasoning, and a focused user experience to support better participation.

It is especially useful for:

- students in discussion-heavy classes
- students who experience classroom anxiety
- students preparing for seminars
- students who want better notes after class
- educators interested in more inclusive participation



## Tech Stack

### Frontend

- React
- React Router
- CSS
- Browser Speech Recognition API

### Backend

- Python
- FastAPI
- Uvicorn
- Requests
- python-dotenv

### AI

- Claude API

### Deployment

- Frontend deployed on Vercel
- Backend deployed on Railway


## What I Built

For this project, I built a full-stack AI web application that:

- captures live classroom audio through the browser
- turns speech into a transcript in real time
- sends transcript context to a Python backend
- integrates with Claude to generate useful participation prompts
- creates post-class notes from the full discussion
- separates frontend and backend deployment
- provides a polished student-facing interface

This project demonstrates product thinking, frontend development, backend API design, AI integration, and deployment across modern web platforms.



## Current Status

KasaUp is a working prototype focused on the core student experience:

- live transcription
- AI-generated participation suggestions
- reading-aware context
- session summaries
- deployed frontend and backend

Future improvements could include user accounts, saved session history, better PDF parsing, instructor dashboards, and support for more browsers.


## Live Demo

Frontend: https://kasaup-theta.vercel.app


## Repository

GitHub: https://github.com/efyastar/kasaup
