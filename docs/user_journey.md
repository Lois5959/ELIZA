# User Journey — Sophie, la jeune professionnelle

**Persona :** Sophie, 28 ans, chef de projet à Lille
**Scénario :** Un dimanche matin nuageux, Sophie cherche une activité culturelle pour sa journée
**Canal :** Discord

---

## Vue d'ensemble

| Phase | Action | Émotion |
|---|---|---|
| Déclencheur | Se réveille, regarde la météo | 😐 Indécise |
| Découverte | Ouvre Discord, voit le bot | 🙂 Curieuse |
| Interaction | Pose une question à LilleMoove | 😊 Engagée |
| Décision | Choisit une activité | 😄 Satisfaite |
| Expérience | Vit la sortie | 😄 Ravie |
| Retour | Recommande le bot à une amie | 🤩 Fidélisée |

---

## Étape 1 — Déclencheur

**Contexte**
Il est 9h30, dimanche. Sophie se fait un café et regarde par la fenêtre — temps couvert, 14°C. Elle a sa journée libre mais aucune idée de quoi faire. Elle ne veut pas rester chez elle mais n'a pas envie de chercher pendant une heure sur Google.

**Pensée**
> "J'aimerais faire quelque chose de sympa aujourd'hui mais je sais pas quoi..."

**Émotion :** 😐 Indécise, légèrement frustrée

**Point de friction :** Trop d'options sur internet, pas assez contextualisées à la météo et à Lille

---

## Étape 2 — Découverte du bot

**Contexte**
Sophie ouvre Discord pour voir les messages de sa communauté de running. Elle remarque LilleMoove Bot dans la liste des membres en ligne d'un serveur communautaire lillois.

**Action**
Elle clique sur le bot, voit la description : *"Recommandations d'activités à Lille selon la météo"*. Elle rejoint le channel `#lillemove`.

**Pensée**
> "Tiens, ça pourrait être utile justement..."

**Émotion :** 🙂 Curieuse, intriguée

**Point de friction :** Elle ne sait pas exactement comment utiliser le bot, hésite sur la commande

---

## Étape 3 — Première interaction

**Action**
Sophie tape sa première question :
```
!eliza qu'est-ce qu'il y a d'intéressant à faire aujourd'hui à Lille ?
```

**Ce que fait le bot**
- Détecte la question d'activité générale
- Appelle l'API météo → temps couvert, 14°C
- Filtre les activités adaptées (musées, expos, visites indoor/outdoor léger)
- Génère une réponse personnalisée via Ollama

**Réponse du bot**
> Temps couvert à Lille (14°C), idéal pour les sorties culturelles. Voici 3 suggestions pour aujourd'hui :
>
> 🎨 LaM — Musée d'art moderne de Villeneuve-d'Ascq. Expo temporaire en ce moment. Entrée 5€ tarif réduit.
>
> 🏛️ Palais des Beaux-Arts — Gratuit le 1er dimanche du mois. L'une des plus grandes collections de France hors Paris.
>
> ☕ Vieux-Lille à pied — Balade dans les ruelles historiques + terrasses couvertes. Idéal avant le déjeuner.

**Pensée**
> "Oh le Palais des Beaux-Arts est gratuit aujourd'hui, je savais même pas !"

**Émotion :** 😊 Agréablement surprise, engagée

**Point de friction :** Aucun — la réponse est rapide, claire et directement actionnable

---

## Étape 4 — Approfondissement

**Action**
Sophie veut enchaîner avec un repas après la visite :
```
!eliza un bon resto pas trop cher près du Palais des Beaux-Arts ?
```

**Réponse du bot**
> Voici 2 restos à deux pas du Palais des Beaux-Arts :
>
> 🍽️ Le Bloempot — Cuisine nordiste créative, cadre chaleureux. ~25€/pers.
>
> 🥗 Chez la Vieille — Brasserie traditionnelle lilloise, menus midi à 14€. Parfait après une visite.

**Émotion :** 😄 Contente, sa journée prend forme

---

## Étape 5 — Décision

**Action**
Sophie décide d'aller au Palais des Beaux-Arts le matin (gratuit) puis déjeuner à Chez la Vieille. Elle note les infos et invite une amie via un message Discord.

**Pensée**
> "Journée calée en 5 minutes, c'est exactement ce qu'il me fallait."

**Émotion :** 😄 Satisfaite, soulagée

**Point de friction :** Elle aurait aimé un lien direct vers le site du musée pour vérifier les horaires

---

## Étape 6 — Expérience vécue

**Contexte**
Sophie passe une excellente matinée au musée. Le déjeuner est bon. Elle prend des photos et les poste dans son serveur Discord en mentionnant LilleMoove.

**Émotion :** 😄 Très satisfaite

---

## Étape 7 — Fidélisation et recommandation

**Action**
Le week-end suivant, Sophie revient spontanément sur le bot pour planifier une sortie running si la météo le permet. Elle recommande aussi LilleMoove à une collègue qui vient d'arriver à Lille.

```
!eliza est-ce qu'il fera beau samedi pour courir dehors ?
```

**Émotion :** 🤩 Fidélisée, ambassadrice

---

## Synthèse — Points clés

**Ce qui a fonctionné**
- Réponse instantanée sans formulaire ni filtre
- Information inattendue et à valeur ajoutée (gratuit le 1er dimanche)
- Enchaînement naturel activité → restaurant en une seule conversation

**Ce qui peut être amélioré**
- Ajouter des liens directs vers les sites officiels
- Permettre de filtrer par distance ou quartier
- Notifier proactivement les bons plans du week-end

**Insight clé**
Sophie ne cherchait pas une app de plus — elle cherchait un conseil rapide d'un "ami qui connaît Lille". LilleMoove répond exactement à ce besoin en s'intégrant dans un outil qu'elle utilise déjà au quotidien.
