import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parser
  app.use(express.json());

  // API route to securely verify administrative password
  app.post("/api/verify-password", (req, res) => {
    const { password } = req.body;
    if (!password) {
      return res.status(400).json({ success: false, error: "Password is required" });
    }

    const adminPassword = process.env.ADMIN_PASSWORD || "*ad123min#";
    
    if (password === adminPassword) {
      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, error: "Invalid password" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
