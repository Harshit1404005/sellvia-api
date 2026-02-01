export function healthCheck(req, res) {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ 
        status: "OK" ,
        timestamp: new Date().toISOString(),
        service: "Sellvia API",
        env: "local"
    }));
    return true;
  }
}