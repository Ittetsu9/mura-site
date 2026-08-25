import http from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const port = 4173;

http.createServer(async (req, res) => {
  const file = req.url === "/og.png" ? "og.png" : "index.html";
  try {
    const body = await readFile(join(root, "public", file));
    res.writeHead(200, { "content-type": file.endsWith(".png") ? "image/png" : "text/html; charset=utf-8" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Local URL: http://127.0.0.1:${port}`));
