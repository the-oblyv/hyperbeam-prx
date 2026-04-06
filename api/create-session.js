export default async function handler(req, res) {
  try {
    const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HYPERBEAM_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        timeout: 300000,           
        region: "US",              
        start_url: "https://google.com", 
        vm: "standard"             
      })
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Hyperbeam API error:", text);
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}
