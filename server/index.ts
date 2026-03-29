import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === "production";
const isRunningOnVercel = Boolean(process.env.VERCEL);

const staticPath = isProd || isRunningOnVercel ? path.resolve(__dirname, "public") : path.resolve(__dirname, "..", "dist", "public");

const app = express();

// Serve pre-built assets
app.use(express.static(staticPath));

// SPA fallback so client-side routing works everywhere
app.get("*", (_req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

const startServer = () => {
  const port = process.env.PORT || 3000;
  const server = createServer(app);
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
};

if (!isRunningOnVercel) {
  startServer();
}

export default app;
