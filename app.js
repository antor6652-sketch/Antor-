const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = new Date().getFullYear();

const statusNode = document.getElementById("form-status");
const listNode = document.getElementById("messages-list");
const countNode = document.getElementById("message-count");
const form = document.getElementById("guest-form");

const hasSupabaseConfig = () =>
  window.SUPABASE_URL && window.SUPABASE_ANON_KEY &&
  window.SUPABASE_URL.startsWith("https://") &&
  window.SUPABASE_ANON_KEY.length > 20;

let db = null;
if (hasSupabaseConfig() && window.supabase) {
  db = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
} else {
  statusNode.textContent = "Guestbook setup is not connected yet. The portfolio is ready; connect Supabase to enable messages.";
  listNode.innerHTML = '<p class="muted">Guestbook is waiting for database setup.</p>';
}

async function loadMessages() {
  if (!db) return;
  const { data, error } = await db.from("guestbook_messages")
    .select("id, name, message, created_at")
    .eq("approved", true)
    .order("created_at", { ascending: false })
    .limit(30);

  if (error) {
    listNode.innerHTML = '<p class="muted">Messages could not be loaded right now.</p>';
    countNode.textContent = "—";
    return;
  }
  countNode.textContent = String(data.length).padStart(2, "0");
  if (!data.length) {
    listNode.innerHTML = '<p class="muted">No public messages yet. Be the first to leave a note.</p>';
    return;
  }
  listNode.replaceChildren();
  data.forEach((item) => {
    const article = document.createElement("article");
    article.className = "message-item";
    const name = document.createElement("strong");
    name.textContent = item.name;
    const message = document.createElement("p");
    message.textContent = item.message;
    article.append(name, message);
    listNode.append(article);
  });
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!db) {
    statusNode.textContent = "Guestbook is not connected yet. Complete the Supabase setup first.";
    return;
  }
  const formData = new FormData(form);
  if (String(formData.get("website") || "").trim()) return; // Honeypot spam check.
  const name = String(formData.get("name") || "").trim();
  const message = String(formData.get("message") || "").trim();
  if (!name || !message || name.length > 60 || message.length > 500) {
    statusNode.textContent = "Please enter a name and a message (maximum 500 characters).";
    return;
  }
  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = true;
  submit.style.opacity = ".65";
  statusNode.textContent = "Sending your message…";
  const { error } = await db.from("guestbook_messages").insert({
    name, message, approved: false
  });
  submit.disabled = false;
  submit.style.opacity = "1";
  if (error) {
    statusNode.textContent = "Sorry, your message could not be sent. Please try again later.";
  } else {
    form.reset();
    statusNode.textContent = "Thank you! Your message was submitted and will appear after Antor approves it.";
  }
});

loadMessages();
