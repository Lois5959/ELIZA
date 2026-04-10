import os
from pathlib import Path

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

LILLE_LAT = 50.6292
LILLE_LON = 3.0573
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
DATA_DIR = Path(__file__).parent / "data"
DISCORD_TOKEN = os.getenv("DISCORD_TOKEN")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
