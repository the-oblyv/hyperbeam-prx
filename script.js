import { Hyperbeam } from "./imports.js";

const container = document.getElementById("browsers");

async function startVM() {
  try {
    const res = await fetch("/api/create-session");
    const data = await res.json();

    if (!data.embed_url) {
      console.error("No embed_url returned:", data);
      container.innerText = "Failed to load VM";
      return;
    }

    console.log("Embed URL:", data.embed_url);
    await Hyperbeam(container, data.embed_url);
    console.log("VM embedded!");
  } catch (err) {
    console.error("Failed to start VM:", err);
    container.innerText = "Failed to load VM";
  }
}

// Auto-start on page load
startVM();
