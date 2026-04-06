const iframe = document.getElementById("hb-frame");

async function startSession() {
  try {
    const res = await fetch("/api/create-session"); // ✅ must be exactly this
    const data = await res.json();
    iframe.src = data.embed_url;
  } catch (err) {
    console.error("Failed to start Hyperbeam session:", err);
  }
}

startSession();
