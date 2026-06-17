from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv('../.env')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SuggestionRequest(BaseModel):
    transcript: str
    article: str = ""

@app.post("/suggestions")
def get_suggestions(body: SuggestionRequest):
    api_key = os.getenv("CLAUDE_API_KEY")

    response = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        json={
            "model": "claude-sonnet-4-6",
            "max_tokens": 1000,
            "system": """You are KasaUp, a quiet participation coach for students in seminar discussions.
Generate exactly 3 suggestions the student can say right now based on the live conversation.
Return ONLY valid JSON, no explanation, no markdown, just the JSON array.
Use this exact structure:
[
  { "id": 1, "type": "question", "label": "Question", "text": "..." },
  { "id": 2, "type": "point", "label": "From reading", "text": "..." },
  { "id": 3, "type": "pushback", "label": "Push back", "text": "..." }
]
Keep each suggestion under 40 words. Sound like a smart student, not an AI.""",
            "messages": [
                {
                    "role": "user",
                    "content": f"LIVE TRANSCRIPT:\n{body.transcript}\n\nASSIGNED READING:\n{body.article or 'No reading uploaded.'}"
                }
            ]
        }
    )

    data = response.json()
    text = data["content"][0]["text"]
    clean = text.replace("```json", "").replace("```", "").strip()
    return json.loads(clean)

@app.post("/notes")
def get_notes(body: SuggestionRequest):
    api_key = os.getenv("CLAUDE_API_KEY")

    response = requests.post(
        "https://api.anthropic.com/v1/messages",
        headers={
            "x-api-key": api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
        },
        json={
            "model": "claude-sonnet-4-6",
            "max_tokens": 2000,
            "system": """You are KasaUp. A seminar just ended. Generate structured notes from the transcript.
Return ONLY valid JSON with this exact structure, no markdown, no explanation:
{
  "summary": "2-3 sentence overview of the discussion",
  "concepts": ["concept 1", "concept 2", "concept 3"],
  "arguments": ["argument 1", "argument 2", "argument 3"],
  "unresolved": ["question 1", "question 2"],
  "followUp": [{ "title": "Book or Author", "note": "why relevant" }],
  "quotes": [{ "text": "quote", "speaker": "speaker name or Classmate" }]
}""",
            "messages": [
                {
                    "role": "user",
                    "content": f"TRANSCRIPT:\n{body.transcript}\n\nREADING:\n{body.article or 'No reading uploaded.'}"
                }
            ]
        }
    )

    data = response.json()
    text = data["content"][0]["text"]
    clean = text.replace("```json", "").replace("```", "").strip()
    return json.loads(clean)