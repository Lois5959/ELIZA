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
!eliza qu'est-ce qu'on peut faire aujourd'hui à Lille ?
```

**Ce que fait le bot**
- Détecte les mots-clés d'activité
- Appelle l'API météo → il fait beau, 19°C
- Filtre les activités indoor dans sa base de données
- Génère une réponse via Ollama

**Réponse du bot**
Pour commencer votre journée, nous vous recommandons le marché gourmand 93 à Vieux-Lille, idéal pour déguster de la viande et des légumes frais. Ensuite, visitez l'institut bien-être institut 49 dans le quartier de République où vous pourrez prendre un moment détente.

Si vous préférez une activité plus active, profitez d'une promenade au centre-ville avec sa belle architecture médiévale et ses nombreux musées. Enfin, n'oubliez pas les parcs qui se trouvent près de votre ville, comme le parc du Rempart ou le Parc des Aures pour une pause relaxante.

En fin de journée, vous pouvez passer un agréable moment à la sauna 81 dans le quartier de Lomme. C'est idéal pour détendre les muscles après une journée ensoleillée!

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

**Insight clé :** Le moment critique est l'étape 2 — la réponse doit être rapide, pertinente et contenir une action concrète (code promo) pour convertir l'intention en sortie réelle.
