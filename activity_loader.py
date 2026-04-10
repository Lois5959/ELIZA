import json, random
from pathlib import Path

ACTIVITIES_FILE = Path(__file__).parent / "data" / "activities.json"


def load_activities():
    """Charge les activités depuis le JSON."""
    if not ACTIVITIES_FILE.exists():
        return []
    try:
        return json.load(open(ACTIVITIES_FILE, "r", encoding="utf-8"))
    except:
        return []


def get_activities_context(weather_data):
    """Retourne 3 activités adaptées à la météo."""
    activities = load_activities()
    
    # Choisit le tag météo
    tag = "rainy" if weather_data.get("is_rainy") else "sunny" if weather_data.get("is_sunny") else "cloudy"
    
    # Filtre et sélectionne 3 activités
    compatible = [a for a in activities if tag in a.get("weather", [])]
    selected = random.sample(compatible, min(3, len(compatible))) if compatible else []
    
    if not selected:
        return "Activités : musées, parcs, théâtres à Lille."
    
    lines = ["ACTIVITES RECOMMANDEES :"]
    for act in selected:
        loc = "interieur" if act.get("indoor") else "exterieur"
        lines.append(f"- {act['name']} ({act['type']}, {loc}) - {act['desc']}")
    
    return "\n".join(lines)
