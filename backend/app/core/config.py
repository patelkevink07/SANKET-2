"""
Centralized app settings. Everything env-specific lives here so no other
module reaches into os.environ directly — one place to see every config
knob the app depends on.
"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "postgresql://sanket:sanket@localhost:5432/sanket"
    environment: str = "development"
    api_v1_prefix: str = "/api/v1"
    cors_origins: str = "http://localhost:5173,http://localhost:3000"

    # Ingestion credentials — optional at boot; only required when the
    # corresponding ingestion job actually runs.
    reddit_client_id: str = ""
    reddit_client_secret: str = ""
    reddit_user_agent: str = "sanket-ingestion/0.1"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
