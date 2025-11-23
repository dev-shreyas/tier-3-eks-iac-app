const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  await fetch("http://localhost:3001/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, message })
  });

  loadMessages();
});

async function loadMessages() {
  const res = await fetch("http://localhost:3001/api/messages");
  const data = await res.json();

  const container = document.getElementById("messages");
  container.innerHTML = data
    .map((m) => `<p><strong>${m.name}</strong>: ${m.message}</p>`)
    .join("");
}

loadMessages();
