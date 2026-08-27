import express, { Express } from 'express';
import { healthRouter } from './routes/health';
import { postsRouter } from './routes/posts';
import { ingestionRouter } from './routes/ingestion';
import { aiRouter } from './routes/ai';

export function configureApiRoutes(app: Express) {
  const apiPrefix = process.env.API_V1_PREFIX || '/api/v1';

  // Health check endpoint
  app.use('/health', healthRouter);

  // Core SANKET API routes
  app.use(`${apiPrefix}/posts`, postsRouter);
  app.use(`${apiPrefix}/ingestion`, ingestionRouter);

  // Gemini AI inference routes
  app.use('/api', aiRouter);
}
