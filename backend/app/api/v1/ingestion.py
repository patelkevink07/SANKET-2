from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.models import IngestionJob
from app.schemas.schemas import IngestionJobCreate, IngestionJobOut

router = APIRouter(prefix="/ingestion", tags=["ingestion"])


@router.post("/jobs", response_model=IngestionJobOut, status_code=201)
def create_job(payload: IngestionJobCreate, db: Session = Depends(get_db)):
    """
    Called by an ingestion worker when it starts a run. Gives every
    ingestion run a visible, queryable record — this is what makes
    async ingestion debuggable instead of a black box.
    """
    job = IngestionJob(platform=payload.platform, status="running")
    db.add(job)
    db.commit()
    db.refresh(job)
    return job


@router.patch("/jobs/{job_id}/complete", response_model=IngestionJobOut)
def complete_job(
    job_id: str,
    records_ingested: int,
    status: str = "succeeded",
    error: str | None = None,
    db: Session = Depends(get_db),
):
    job = db.query(IngestionJob).filter(IngestionJob.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Ingestion job not found")

    if status not in {"succeeded", "failed", "rate_limited"}:
        raise HTTPException(status_code=400, detail="Invalid terminal status")

    job.status = status
    job.records_ingested = records_ingested
    job.completed_at = datetime.now(timezone.utc)
    job.error = error
    db.commit()
    db.refresh(job)
    return job


@router.get("/jobs", response_model=list[IngestionJobOut])
def list_jobs(limit: int = 50, db: Session = Depends(get_db)):
    return (
        db.query(IngestionJob)
        .order_by(IngestionJob.started_at.desc())
        .limit(min(limit, 200))
        .all()
    )


@router.get("/jobs/{job_id}", response_model=IngestionJobOut)
def get_job(job_id: str, db: Session = Depends(get_db)):
    job = db.query(IngestionJob).filter(IngestionJob.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Ingestion job not found")
    return job
