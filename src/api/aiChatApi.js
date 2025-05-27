export async function askAI(question) {
  const res = await fetch('http://localhost:5001/api/ai-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });
  if (!res.ok) throw new Error("Gagal menghubungi AI");
  const data = await res.json();
  return data.answer;
} 