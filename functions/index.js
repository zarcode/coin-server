/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const fetch = require("node-fetch");
const url = require("url");
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.coins = onRequest(async (req, res) => {
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
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);

    // Send an error response
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});
