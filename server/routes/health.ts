import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (req, res) => {
  res.json({
    status: 'ok',
    environment: process.env.ENVIRONMENT || process.env.NODE_ENV || 'development',
    service: 'SANKET API & Analytics Engine',
    version: '0.1.0'
  });
});
