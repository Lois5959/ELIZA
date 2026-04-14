# LilleMove Bot - Landing Page

Une landing page moderne et responsive pour **LilleMove Bot**, le chatbot Discord intelligent qui recommande des activités sportives, culturelles et touristiques à Lille en fonction de la météo en temps réel.

## 🎯 Objectif du Projet

LilleMoove Bot aide les habitants et visiteurs de Lille à découvrir des activités adaptées à la météo du moment. Cette landing page présente le bot Discord, ses fonctionnalités, et permet aux utilisateurs de l'ajouter à leur serveur.

### Cibles
- 🏃 Sportifs locaux cherchant des activités selon la météo
- 🧳 Touristes découvrant Lille
- 👨‍👩‍👧 Familles lilloises en quête d'idées de sorties

## ✨ Fonctionnalités

### 🌐 Interface Utilisateur
- ✅ Design moderne avec identité visuelle "French Tech"
- ✅ **Système bilingue** (Français / Anglais)
- ✅ **100% responsive** (mobile, tablette, desktop)
- ✅ Animations fluides avec Motion (Framer Motion)
- ✅ Palette de couleurs cohérente : Bleu Athlétique (#0052CC) et Vert Émeraude (#10B981)

### 📊 Sections de la Landing Page
1. **Hero Section** - Accroche principale avec CTA Discord
2. **Business & Valeur Ajoutée** - Bénéfices pour utilisateurs et partenaires
3. **Tutoriel Vidéo** - Guide d'utilisation du bot Discord
4. **KPIs Animés** - Métriques de performance (taux de conversion, activités, rétention)
5. **Éthique & Confidentialité** - Engagement transparent
6. **Footer** - Liens ressources et réseaux sociaux

### 🤝 Partenaires Intégrés
- 🧗 **Climb Up** - Escalade indoor
- 🎾 **Urban Padel** - Sessions de padel
- 🦁 **Zoo de Lille** - Activités familiales

## 🛠️ Technologies Utilisées

| Technologie 

| **React** 
| **TypeScript** 
| **Tailwind CSS** 
| **Motion** 
| **Vite** 
| **Lucide React** 

## 🚀 Installation

### Prérequis
- Node.js 18+ 
- npm 

### Étapes
bash

# Cloner le repository
git clone 

# Naviguer dans le dossier
cd lillemove

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

Le site est accessible sur `http://localhost:5173`


## 🎨 Design System

### Palette de Couleurs
```css
--color-primary-blue: #0052CC;   
--color-primary-green: #10B981;  
--color-accent-dark: #003D99;
--color-accent-light: #059669;
```

### Typographie
- **Headings** : Système par défaut avec tokens Tailwind
- **Body** : Configuration dans `/src/styles/theme.css`

## 🎬 Ajouter Votre Vidéo Tutoriel

1. Enregistrez une vidéo de démonstration Discord (30-60 secondes)
2. Exportez en format MP4
3. Placez le fichier dans `/public/videos/tutorial.mp4`
4. Dans `App.tsx`, mettez à jour le chemin :

```tsx
<video
  controls
  className="w-full h-full object-cover"
  poster="/videos/thumbnail.jpg"
>
  <source src="/videos/tutorial.mp4" type="video/mp4" />
</video>
```

## 🌍 Configuration Bilingue

Le système de traduction est géré dans `App.tsx` via l'objet `translations`. Pour ajouter une langue :

```typescript
const translations: Record<Language, Translation> = {
  FR: { /* ... */ },
  EN: { /* ... */ },
  // Ajoutez votre langue ici
};
```

## 📊 KPIs Affichés

Les métriques actuelles sont configurées dans `App.tsx` :
- **Taux de conversion** : 42% (codes promos utilisés)
- **Activités suggérées** : 350+ par jour
- **Utilisateurs récurrents** : 78% (rétention mensuelle)


## 🔒 Éthique & Confidentialité

Le projet met en avant :
- ✅ Aucune donnée personnelle stockée
- ✅ Algorithme transparent sans biais
- ✅ Respect de la vie privée des utilisateurs


## 📧 Contact

Pour toute question ou suggestion :
- **Discord** : https://discord.com/api/oauth2/authorize?client_id=1489257669721194658&permissions=2048&scope=bot

## 🙏 Remerciements

- **OpenWeather API** - Données météo en temps réel
- **Partenaires locaux** - Climb Up, Urban Padel, Zoo de Lille
- **Communauté Discord** - Support et feedback


