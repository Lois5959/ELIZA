import requests
from config import LILLE_LAT, LILLE_LON, OPENWEATHER_API_KEY

API_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_weather():
    """
    Récupère la météo actuelle de Lille via OpenWeatherMap
    """
    if not OPENWEATHER_API_KEY:
        return _fallback_weather()
    
    try:
        response = requests.get(
            API_URL,
            params={
                "lat": LILLE_LAT,
                "lon": LILLE_LON,
                "appid": OPENWEATHER_API_KEY,
                "units": "metric",
                "lang": "fr"
            },
            timeout=5
        )
        response.raise_for_status()
        data = response.json()
        
        desc = data["weather"][0]["description"].lower()
        temp = round(data["main"]["temp"])
        icon = data["weather"][0]["icon"]
        
        return {
            "temperature": temp,
            "description": desc,
            "is_rainy": "pluie" in desc or "rain" in icon,
            "is_sunny": "clair" in desc or "soleil" in desc or "01d" in icon,
            "is_cloudy": "nuage" in desc or any(c in icon for c in ["02", "03", "04"])
        }
        
    except Exception:
        return _fallback_weather()


def _fallback_weather():
    """Retourne une météo par défaut en cas d'erreur API"""
    return {
        "temperature": 15,
        "description": "couvert",
        "is_rainy": False,
        "is_sunny": False,
        "is_cloudy": True
    }


def get_weather_recommendation():
    """Retourne une phrase de recommandation avec la température en °C."""
    w = get_weather()
    temp = w["temperature"]
    
    if w["is_rainy"]:
        return f"Il pleut à Lille ({temp}°C). Privilégiez les activités en intérieur."
    elif w["is_sunny"]:
        return f"Il fait beau à Lille ({temp}°C). Profitez des terrasses et des parcs."
    elif w["is_cloudy"]:
        return f"Temps couvert à Lille ({temp}°C). Idéal pour visiter les musées."
    else:
        return f"{w['description'].capitalize()} à Lille ({temp}°C)."
