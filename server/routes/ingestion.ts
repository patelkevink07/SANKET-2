import { Router } from 'express';
import crypto from 'crypto';
import { ingestionJobs, IngestionJobRecord } from '../models';

export const ingestionRouter = Router();

// Create Ingestion Job
ingestionRouter.post('/jobs', (req, res) => {
  const { platform } = req.body;
  if (!platform) {
    return res.status(400).json({ detail: 'Missing platform parameter' });
  }

  const job: IngestionJobRecord = {
    id: crypto.randomUUID(),
    platform,
    status: 'running',
    records_ingested: 0,
    started_at: new Date().toISOString(),
  };

  ingestionJobs.set(job.id, job);
  return res.status(201).json(job);
});

// Complete / Patch Ingestion Job
ingestionRouter.patch('/jobs/:job_id/complete', (req, res) => {
  const { job_id } = req.params;
  const { records_ingested, status = 'succeeded', error } = req.body;

  const job = ingestionJobs.get(job_id);
  if (!job) {
    return res.status(404).json({ detail: 'Ingestion job not found' });
  }

  if (!['succeeded', 'failed', 'rate_limited'].includes(status)) {
    return res.status(400).json({ detail: 'Invalid terminal status' });
  }

  job.status = status;
  job.records_ingested = records_ingested || 0;
  job.completed_at = new Date().toISOString();
  job.error = error;

  return res.json(job);
});

// List Ingestion Jobs
ingestionRouter.get('/jobs', (req, res) => {
  const limit = Math.min(parseInt((req.query.limit as string) || '50', 10), 200);
  const list = Array.from(ingestionJobs.values())
    .sort((a, b) => new Date(b.started_at).getTime() - new Date(a.started_at).getTime())
    .slice(0, limit);
  return res.json(list);
});

// Get Single Ingestion Job
ingestionRouter.get('/jobs/:job_id', (req, res) => {
  const job = ingestionJobs.get(req.params.job_id);
  if (!job) {
    return res.status(404).json({ detail: 'Ingestion job not found' });
  }
  return res.json(job);
});
