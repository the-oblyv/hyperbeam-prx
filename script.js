import { Hyperbeam } from "./imports.js";
const container = document.getElementById("browsers");

async function startVM() {
  const data = await (await fetch("/api/create-session")).json();
  await Hyperbeam(container, data.embed_url);
}

startVM();
