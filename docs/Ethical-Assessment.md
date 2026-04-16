# Éthique & Responsabilité — LilleMoove

## L'Effet ELIZA : Risque de projection émotionnelle
> Les utilisateurs peuvent attribuer des sentiments ou une compréhension humaine au bot.

### Mesures préventives
- Disclaimer clair dans chaque réponse : *"Je suis un assistant automatique, pas un humain."*
- Ton neutre et informatif : pas de fausse empathie ("Je comprends ta douleur" → "Voici des pistes pour t'aider")
- Redirection vers des ressources humaines si détection de détresse (mots-clés : "dépressif", "seul", "aide")

## Protection des données & RGPD
| Donnée collectée | Usage | Conservation | Droit utilisateur |
|-----------------|-------|--------------|------------------|
| ID Discord | Personnalisation | Durée de la session | Suppression via `!reset` |
| Historique des requêtes | Amélioration du modèle | 24h max, anonymisé | Export sur demande |
| Localisation (ville) | Recommandations géolocalisées | Non stockée | Non applicable |

### Engagements
- Aucune revente de données à des tiers
- Pas de tracking cross-platform
- Logs anonymisés pour le debugging uniquement

## Biais algorithmiques & Équité
- **Risque** : Le bot pourrait privilégier les partenaires payants ou les activités "grand public".
- **Solution** : 
  - Rotation aléatoire dans les suggestions équivalentes
  - Label transparent : "Partenaire" vs "Suggestion neutre"
  - Audit trimestriel des recommandations

## Limites du système
- LilleMoove ne remplace pas :
  - Un professionnel de santé (sport adapté, blessures)
  - Un service d'urgence (météo extrême, sécurité)
- En cas de doute, le bot affiche : *"Pour ta sécurité, vérifie les conditions sur le site officiel."*

## Signalement & Support
- Commande `!report <problème>` pour signaler une réponse inappropriée
- Channel Discord dédié : `#support-lillemoove`
- Réponse sous 48h par l'équipe de développement
