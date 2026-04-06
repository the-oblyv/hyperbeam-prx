export default async function handler(req, res) {
  const keys = [
    process.env.HYPERBEAM_API_KEY,
    process.env.HYPERBEAM_TEST_KEY
  ].filter(Boolean); // Only include keys that exist

  if (!keys.length) {
    return res.status(500).json({ error: "No Hyperbeam API keys set" });
  }

  for (let i = 0; i < keys.length; i++) {
    try {
      const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${keys[i]}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          type: "standard_vm" // required
        })
      });

      if (response.status === 429) {
        console.warn(`Key ${i} rate-limited, trying next key...`);
        continue; // Try next key
      }

      if (!response.ok) {
        const text = await response.text();
        console.error("Hyperbeam API error:", text);
        return res.status(response.status).json({ error: text });
      }

      const data = await response.json();
      return res.status(200).json(data);

    } catch (err) {
      console.error(`Key ${i} request failed:`, err);
      if (i === keys.length - 1) {
        return res.status(500).json({ error: "All Hyperbeam keys failed" });
      }
    }
  }
}
