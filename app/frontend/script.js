const form = document.getElementById("form");
const alertBox = document.getElementById("alert");
const submitBtn = document.getElementById("submitBtn");

function showAlert(type, message) {
  alertBox.className = "p-4 rounded-lg text-sm";

  if (type === "success") {
    alertBox.classList.add("bg-green-100", "text-green-800", "border", "border-green-200");
  } else {
    alertBox.classList.add("bg-red-100", "text-red-800", "border", "border-red-200");
  }

  alertBox.innerText = message;
  alertBox.classList.remove("hidden");

  setTimeout(() => alertBox.classList.add("hidden"), 3000);
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.disabled = true;
  submitBtn.innerText = "Submitting...";

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  try {
    const res = await fetch("http://app-backend:3001/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message })
    });

    if (!res.ok) throw new Error("Failed to submit");

    showAlert("success", "Message submitted successfully!");
    form.reset();
    loadMessages();

  } catch (err) {
    showAlert("error", "Error submitting message.");
  }

  submitBtn.disabled = false;
  submitBtn.innerText = "Submit Message";
});

async function loadMessages() {
  try {
    const res = await fetch("http://app-backend:3001/api/messages");
    const data = await res.json();

    const container = document.getElementById("messages");
    container.innerHTML = data
      .map(
        (m) => `
        <div class="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
          <p class="text-sm text-gray-600"><strong>${m.name}</strong></p>
          <p class="text-gray-800 mt-1">${m.message}</p>
        </div>
      `
      )
      .join("");

  } catch (err) {
    console.error("Failed to load messages", err);
  }
}

loadMessages();
