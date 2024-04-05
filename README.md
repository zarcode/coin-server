# CoinGecko API Limit

CoinGecko imposes a limit on REST API requests from a single IP, which hinders direct usage on Google Sheets. Deploying these Firebase functions on Vercel acts as a proxy, overcoming this limitation by forwarding requests to CoinGecko.
