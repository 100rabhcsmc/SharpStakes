const BASE_URL = 'http://localhost:3000';

export async function fetchGames() {
  const res = await fetch(`${BASE_URL}/games`);
  const data = await res.json();
  return data; 
}

export async function submitPrediction(prediction) {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(prediction),
  });
  return res.json();
}

export async function fetchUser() {
  const res = await fetch(`${BASE_URL}/user`);
  return res.json();
}
