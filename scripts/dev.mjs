import http from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const port = 4173;

http.createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const file = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const types = {
    ".html": "text/html; charset=utf-8",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
  };
  const extension = Object.keys(types).find((type) => file.toLowerCase().endsWith(type));
  try {
    const body = await readFile(join(root, "public", file));
    res.writeHead(200, { "content-type": types[extension] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end("Not found");
  }
}).listen(port, "127.0.0.1", () => console.log(`Local URL: http://127.0.0.1:${port}`));
