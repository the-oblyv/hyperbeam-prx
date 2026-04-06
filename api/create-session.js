export default async function handler(req, res) {
  const response = await fetch("https://engine.hyperbeam.com/v0/vm", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HYPERBEAM_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ timeout: 300000, region: "US" })
  });
  const data = await response.json();
  res.status(200).json(data);
}
