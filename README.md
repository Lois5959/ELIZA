# Eliza Lille - Assistant virtuel local

Chatbot intelligent spécialisé sur la ville de Lille, fonctionnant en local avec Qwen 2.5 via Ollama.

## Fonctionnalités

- Réponses IA locales (pas de clé OpenAI requise)
- Météo actuelle à Lille avec température (OpenWeatherMap)
- Recommandations de restaurants (500 entrées) avec filtrage par cuisine et prix
- Suggestions d'activités adaptées à la météo (500 entrées)
- Mémoire de conversation pendant la session
- Interface terminal ET bot Discord (!eliza)

## Prérequis

- Python 3.10+
- Node.js 18+
- Ollama installé avec le modèle qwen2.5:1.5b
- Clé API OpenWeatherMap (gratuite)

## Installation

```bash
# Cloner le projet
git clone git@github.com:EpitechBachelorPromo2028/B-AIA-210-LIL-2-1-eliza-8.git
cd Eliza-lille

# Installer les dépendances Python
pip install -r requirements.txt

# Télécharger le modèle IA
ollama pull qwen2.5:1.5b

# Configurer les variables d'environnement
cp .env.example .env

# Générer les données
make fetch
```
