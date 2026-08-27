import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { configureApiRoutes } from './server/index';

const app = express();
const PORT = 3000;

app.use(express.json());

// Register modular backend routes (/server/)
configureApiRoutes(app);

// Vite middleware / static serving setup
async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SANKET Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

start();
