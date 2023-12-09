const fetch = require("node-fetch");
const http = require("http");
const url = require("url");

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // Parse the URL and extract query parameters
  const parsedUrl = url.parse(req.url, true);
  const { per_page, page } = parsedUrl.query;

  // Make a request to the CoinGecko API with the provided query parameters
  const currency = "usd"; // You can change this to your desired currency
  const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d&per_page=${
    per_page || 100
  }&page=${page || 1}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Send the fetched data as the response
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
  } catch (error) {
    console.error("Error fetching data:", error);

    // Send an error response
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
