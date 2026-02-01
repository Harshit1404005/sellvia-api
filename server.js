import http from "http";
import { router } from "./router.js";

const PORT = 3000;

const server = http.createServer((req, res) => {
  router(req, res);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Sellvia API running on port ${PORT}`);
});
