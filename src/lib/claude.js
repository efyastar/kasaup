const SERVER_URL = 'https://kasaup-production.up.railway.app';

export async function getSuggestions(transcript, article) {
  const response = await fetch(`${SERVER_URL}/suggestions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript, article }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response.json();
}

export async function getNotes(transcript, article) {
  const response = await fetch(`${SERVER_URL}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript, article }),
  });

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  return response.json();
}