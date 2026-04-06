import { Hyperbeam } from "./imports.js";

const container = document.getElementById("browsers");

async function startVM() {
  try {
    const res = await fetch("/api/create-session");
    const data = await res.json();

    // Embed Hyperbeam directly into the div
    await Hyperbeam(container, data.embed_url);
  } catch (err) {
    console.error("Failed to start Hyperbeam VM:", err);
    container.innerText = "Failed to load VM";
  }
}

// Auto-start on page load
startVM();
