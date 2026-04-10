import os
import requests
from config import OLLAMA_HOST
from prompts import (
    build_prompt, 
    get_system_prompt, 
    get_out_of_scope_message,
    is_relevant_query
)
from restaurant_loader import is_restaurant_query, get_restaurant_context_for_llm
from weather import get_weather, get_weather_recommendation
from activity_loader import get_activities_context

OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5:1.5b")


class LLMClient:
    def __init__(self, model=None, max_history=10):
        self.model = model or OLLAMA_MODEL
        self.base_url = OLLAMA_HOST
        self.session = requests.Session()
        self.max_history = max_history
        self.conversation_history = []
    
    def query(self, user_message, context=None):
        """Reçoit un message et retourne la réponse."""
        
        # Vérifications pertinentes
        if not is_relevant_query(user_message):
            return get_out_of_scope_message()
        
        lower_msg = user_message.lower()
        
        # Météo
        if any(kw in lower_msg for kw in ['météo', 'temps', 'pluie', 'soleil', 'beau', 'dehors']):
            weather_data = get_weather()
            if context is None: context = {}
            context['weather'] = get_weather_recommendation()
            context['weather_data'] = weather_data
        
        # Restaurants
        if is_restaurant_query(lower_msg):
            if context is None: context = {}
            context['restaurants'] = get_restaurant_context_for_llm(user_message)
        
        # Activité
        if any(kw in lower_msg for kw in ['activité', 'visiter', 'faire', 'sortir', 'balade', 'musée', 'parc']):
            if context is None: context = {}
            weather_data = context.get('weather_data') or get_weather()
            context['activities'] = get_activities_context(weather_data)
        
        # Construction et appels
        user_content = build_prompt(user_message, context)
        self.conversation_history.append({"role": "user", "content": user_content})
        
        response_text = self._call_ollama_chat()
        
        self.conversation_history.append({"role": "assistant", "content": response_text})
        if len(self.conversation_history) > self.max_history:
            self.conversation_history = self.conversation_history[-self.max_history:]
        
        return response_text
    
    def _call_ollama_chat(self):
        """Appel API vers Ollama."""
        try:
            response = self.session.post(
                f"{self.base_url}/api/chat",
                json={
                    "model": self.model,
                    "messages": [
                        {"role": "system", "content": get_system_prompt()},
                        *self.conversation_history
                    ],
                    "stream": False,
                    "options": {"temperature": 0.7, "num_predict": 500}
                },
                timeout=120
            )
            response.raise_for_status()
            return response.json().get("message", {}).get("content", "Erreur de réponse.").strip()
        except Exception as e:
            return f"Erreur : {str(e)}"
    
    def clear_history(self):
        self.conversation_history = []


def get_llm_response(message, context=None):
    return LLMClient().query(message, context)
