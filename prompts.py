SYSTEM_PROMPT = """
Tu es Eliza, un assistant virtuel spécialisé sur la ville de Lille, en France.

TON RÔLE:
    Tu aides les utilisateurs UNIQUEMENT sur ces sujets :
    - Météo actuelle à Lille
    - Restaurants à Lille (recommandations, cuisines, prix)
    - Activités à Lille (musées, parcs, sorties, culture)

RÈGLES STRICTES :
- Si la question ne concerne PAS Lille, la météo, les restaurants ou les activités :
    - Réponds poliment que tu n'es pas conçu pour ce sujet
    - Rappelle brièvement ce que tu peux faire
    - Ne tente PAS de répondre à la question hors-sujet

- Si la question concerne tes sujets :
    - S'il pleut : recommande des lieux en intérieur
    - S'il fait beau : privilégie terrasses et parcs
    - Cite 1-3 suggestions maximum, avec nom, type et prix
    - Réponds en français, naturel et concis

LIMITES:
    - Ne parle pas de politique, religion, sujets sensibles
    - Ne donne pas d'informations non vérifiées
    - Si tu ne sais pas, dis-le simplement
"""

OUT_OF_SCOPE_MESSAGE = """
Je suis désolé, mais je ne peux pas répondre à cette question.

Je suis Eliza, un assistant spécialisé sur Lille. Je peux t'aider uniquement sur :
- La météo actuelle à Lille
- Les restaurants lillois (par cuisine, prix, ambiance)
- Les activités à faire sur Lille (musées, parcs, sorties)

N'hésite pas à me poser une question sur l'un de ces sujets !
"""


def is_relevant_query(user_message: str) -> bool:
    """
    Vérifie si la question concerne les sujets gérés par le bot"""
    message = user_message.lower()
    
    # Mots-clés autorisés
    relevant_keywords = [
        'météo', 'temps', 'pluie', 'soleil', 'beau', 'froid', 'chaud', 'neige', 'nuage', 'dehors',
        'restaurant', 'resto', 'manger', 'bouffe', 'cuisine', 'repas', 'déjeuner', 'dîner', 
        'pizzeria', 'sushi', 'kebab', 'burger', 'brasserie', 'bistrot', 'où manger', 'faim',
        'activité', 'visiter', 'faire', 'sortir', 'balade', 'musée', 'parc', 'cinéma', 'théâtre',
        'lille', 'vieux-lille', 'wazemmes', 'citadelle', 'grand place', 'nord',
        'conseil', 'recommandation', 'idée', 'proposer', 'suggérer'
    ]
    
    return any(keyword in message for keyword in relevant_keywords)


def build_prompt(user_message: str, context: dict = None) -> str:
    """Construit le message complet à envoyer au LLM"""
    parts = []
    
    if context:
        if context.get("weather"):
            parts.append(f"[MÉTÉO] {context['weather']}")
        if context.get("restaurants"):
            parts.append(f"[RESTAURANTS]\n{context['restaurants']}")
        if context.get("activities"):
            parts.append(f"[ACTIVITÉS]\n{context['activities']}")
    
    parts.append(f"[QUESTION] {user_message}")
    
    return "\n\n".join(parts)


def get_system_prompt() -> str:
    """Retourne le prompt système"""
    return SYSTEM_PROMPT.strip()


def get_out_of_scope_message() -> str:
    """Retourne le message pour questions hors-sujet"""
    return OUT_OF_SCOPE_MESSAGE.strip()
