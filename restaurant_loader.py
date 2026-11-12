import json, random
from pathlib import Path

RESTAURANTS_FILE = Path(__file__).parent / "data" / "restaurants.json"

CUISINE_MAP = {
    'italien': 'Italienne', 'pâtes': 'Italienne', 'pizza': 'Italienne',
    'japonais': 'Japonaise', 'sushi': 'Japonaise',
    'chinois': 'Chinoise', 'indien': 'Indienne',
    'mexicain': 'Mexicaine', 'nordiste': 'Nordiste', 'flamand': 'Nordiste',
    'français': 'Française', 'bistrot': 'Française',
    'végé': 'Végétarienne', 'vegan': 'Végétalienne',
    'burger': 'Américaine', 'libanais': 'Libanaise', 'marocain': 'Marocaine',
    'thaï': 'Thaïlandaise', 'vietnamien': 'Vietnamienne',
    'grec': 'Grecque', 'espagnol': 'Espagnole',
}

PRICE_MAP = {
    'pas cher': '€', 'petit budget': '€', 'économique': '€',
    'cher': '€€€', 'luxe': '€€€€', 'gastronomique': '€€€€',
}

RESTO_KEYWORDS = [
    'restaurant', 'resto', 'manger', 'bouffe', 'cuisine', 'repas',
    'déjeuner', 'dîner', 'pizzeria', 'sushi', 'kebab', 'burger',
    'brasserie', 'bistrot', 'où manger', 'table', 'réserver'
]


def load_restaurants():
    """Charge les restaurants depuis le fichier JSON"""
    if not RESTAURANTS_FILE.exists():
        return []
    try:
        with open(RESTAURANTS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError):
        return []


def filter_restaurants(cuisine=None, price=None, limit=5):
    """Filtre par cuisine, prix et limite le nombre de résultats"""
    restaurants = load_restaurants()
    if cuisine:
        restaurants = [r for r in restaurants if cuisine.lower() in r.get("cuisine", "").lower()]
    if price:
        restaurants = [r for r in restaurants if r.get("price_range") == price]
    random.shuffle(restaurants)
    return restaurants[:limit]


def get_restaurant_context_for_llm(user_query):
    """Retourne 5 restaurants formatés selon la requête utilisateur"""
    query = user_query.lower()
    
    cuisine_filter = next((v for k, v in CUISINE_MAP.items() if k in query), None)
    price_filter = next((v for k, v in PRICE_MAP.items() if k in query), None)
    
    results = filter_restaurants(cuisine=cuisine_filter, price=price_filter, limit=5)
    if not results:
        results = filter_restaurants(limit=5)
    
    lines = ["RESTAURANTS À LILLE :"]
    for r in results:
        lines.append(f"- {r['name']} ({r['cuisine']}, {r['price_range']}) - {r['desc']}")
    
    return "\n".join(lines)


def is_restaurant_query(user_query):
    """Vérifie si la requête concerne les restaurants"""
    return any(kw in user_query.lower() for kw in RESTO_KEYWORDS)
