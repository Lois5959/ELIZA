# User Journey — LilleMoove

**Persona choisi :** Lucas, 21 ans, étudiant à Lille
**Scénario :** Un samedi après-midi pluvieux, Lucas cherche une activité avec ses amis

---

## Étape 1 — Déclencheur

**Contexte**
Il est 14h, il pleut sur Lille. Lucas et ses 2 amis sont dans leur coloc et s'ennuient. Quelqu'un propose de sortir mais personne ne sait quoi faire.

**Action de l'utilisateur**
Lucas ouvre Discord où il a ajouté LilleMoove Bot sur leur serveur commun.

**Émotion**
😐 Neutre — légèrement frustré de ne pas avoir d'idée

---

## Étape 2 — Premier contact avec le bot

**Action de l'utilisateur**
Lucas tape dans le channel Discord :
```
!eliza qu'est-ce qu'on peut faire aujourd'hui ?
```

**Ce que fait le bot**
- Détecte les mots-clés d'activité
- Appelle l'API météo → il pleut, 12°C
- Filtre les activités indoor dans sa base de données
- Génère une réponse via Ollama

**Réponse du bot**
> Il pleut à Lille (12°C). Voici 3 activités indoor pour aujourd'hui :
> 🧗 Climb Up — Escalade indoor, rue de Tournai. -10% avec MOOVE10
> 🎾 Urban Padel — Session padel couverte, bd de la Liberté. -15% avec MOOVE10
> 🎨 LaM — Musée d'art moderne de Villeneuve-d'Ascq. Entrée 5€ étudiant

**Émotion**
😊 Satisfait — réponse rapide et pertinente

---

## Étape 3 — Approfondissement

**Action de l'utilisateur**
Lucas veut en savoir plus sur l'escalade :
```
!eliza c'est combien Climb Up ?
```

**Ce que fait le bot**
- Reconnaît la question comme hors base de données spécifique
- Répond avec les infos disponibles et suggère de vérifier sur place

**Émotion**
🙂 Ok — il aurait voulu plus d'infos mais ça suffit pour décider

---

## Étape 4 — Décision

**Action de l'utilisateur**
Lucas montre la réponse du bot à ses amis dans Discord. Ils décident d'aller à Climb Up et utilisent le code MOOVE10.

**Émotion**
😄 Content — décision prise en moins de 5 minutes

---

## Étape 5 — Expérience partenaire

**Ce qui se passe chez Climb Up**
- Marc (gérant) voit l'utilisation du code MOOVE10
- Il note une augmentation des réservations les jours de pluie depuis le partenariat

**Émotion partenaire**
😄 Satisfait — ROI mesurable, clients supplémentaires

---

## Étape 6 — Retour et fidélisation

**Action de l'utilisateur**
Le lendemain, Lucas retape une question sur les restaurants :
```
!eliza un bon resto pas cher près de Wazemmes ?
```

**Émotion**
😄 Fidélisé — le bot devient un réflexe pour planifier ses sorties

---

## Synthèse du parcours

| Étape | Action | Émotion | Point de friction |
|---|---|---|---|
| Déclencheur | S'ennuie par temps de pluie | 😐 Neutre | Manque d'idées |
| Premier contact | Tape `!eliza` sur Discord | 😊 Curieux | Aucun — déjà sur Discord |
| Réponse bot | Reçoit 3 suggestions avec promos | 😄 Satisfait | Voudrait plus de détails |
| Décision | Choisit Climb Up avec code promo | 😄 Content | Doit vérifier les horaires lui-même |
| Expérience | Va à Climb Up, utilise MOOVE10 | 😄 Très satisfait | Aucun |
| Retour | Réutilise le bot le lendemain | 😄 Fidélisé | Aucun |

**Insight clé :** Le moment critique est l'étape 2 — la réponse doit être rapide, pertinente et contenir une action concrète (code promo) pour convertir l'intention en sortie réelle.
