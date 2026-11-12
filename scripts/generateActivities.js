const CATEGORIES = [
  { name: "Musée", indoor: true, baseNames: ["Musée", "Galerie", "Exposition", "Collection", "Patrimoine"] },
  { name: "Parc", indoor: false, baseNames: ["Parc", "Jardin", "Espace vert", "Bois", "Square"] },
  { name: "Culture", indoor: true, baseNames: ["Théâtre", "Cinéma", "Opéra", "Concert", "Spectacle", "Festival"] },
  { name: "Sport", indoor: false, baseNames: ["Course", "Vélo", "Foot", "Tennis", "Escalade", "Natation", "Yoga"] },
  { name: "Shopping", indoor: true, baseNames: ["Centre commercial", "Boutique", "Marché", "Brocante", "Antiquités"] },
  { name: "Gastronomie", indoor: true, baseNames: ["Restaurant", "Brasserie", "Café", "Bar", "Food truck", "Marché gourmand"] },
  { name: "Loisirs", indoor: false, baseNames: ["Balade", "Découverte", "Visite", "Promenade", "Excursion"] },
  { name: "Bien-être", indoor: true, baseNames: ["Spa", "Massage", "Hammam", "Sauna", "Institut"] },
  { name: "Événement", indoor: false, baseNames: ["Festival", "Marché", "Foire", "Braderie", "Concert plein air"] },
  { name: "Histoire", indoor: false, baseNames: ["Monument", "Église", "Château", "Ruines", "Site historique"] }
];

const SPECIFIC_ACTIVITIES = [
  { name: "Palais des Beaux-Arts", category: "Musée", indoor: true, price: "€€", tags: ["rainy", "cloudy", "cold", "snowy"] },
  { name: "LaM - Musée d'Art Moderne", category: "Musée", indoor: true, price: "€€", tags: ["rainy", "cloudy", "cold", "snowy", "sunny"] },
  { name: "Maison Natale de Charles de Gaulle", category: "Histoire", indoor: true, price: "€", tags: ["rainy", "cloudy", "cold"] },
  { name: "Hospice Comtesse", category: "Musée", indoor: true, price: "€€", tags: ["rainy", "cloudy", "cold", "snowy"] },
  { name: "Musée d'Histoire Naturelle", category: "Musée", indoor: true, price: "€", tags: ["rainy", "cloudy", "cold", "snowy"] },
  { name: "Théâtre du Nord", category: "Culture", indoor: true, price: "€€€", tags: ["rainy", "cloudy", "cold", "snowy", "sunny"] },
  { name: "Opéra de Lille", category: "Culture", indoor: true, price: "€€€€", tags: ["rainy", "cloudy", "cold", "snowy", "sunny"] },
  { name: "Cinéma UGC Lille", category: "Culture", indoor: true, price: "€€", tags: ["rainy", "cloudy", "cold", "snowy"] },
  { name: "Aquarium de Lille", category: "Loisirs", indoor: true, price: "€€", tags: ["rainy", "cloudy", "cold", "snowy"] },
  { name: "Zoo de Lille", category: "Loisirs", indoor: false, price: "Gratuit", tags: ["sunny", "cloudy"] },
  { name: "Parc de la Citadelle", category: "Parc", indoor: false, price: "Gratuit", tags: ["sunny", "cloudy", "hot"] },
  { name: "Jardin Vauban", category: "Parc", indoor: false, price: "Gratuit", tags: ["sunny", "cloudy", "hot"] },
  { name: "Parc Jean-Baptiste Lebas", category: "Parc", indoor: false, price: "Gratuit", tags: ["sunny", "cloudy"] },
  { name: "Bois de Boulogne", category: "Parc", indoor: false, price: "Gratuit", tags: ["sunny", "cloudy", "hot"] },
  { name: "Parc Mosaïc", category: "Parc", indoor: false, price: "€€", tags: ["sunny", "cloudy", "hot"] },
  { name: "Canal de la Deûle (Balade)", category: "Loisirs", indoor: false, price: "Gratuit", tags: ["sunny", "cloudy", "hot"] },
  { name: "Vieux-Lille (Balade)", category: "Histoire", indoor: false, price: "Gratuit", tags: ["sunny", "cloudy"] },
  { name: "Remparts de Lille", category: "Histoire", indoor: false, price: "Gratuit", tags: ["sunny", "cloudy"] },
  { name: "Dégustation de bières artisanales", category: "Gastronomie", indoor: true, price: "€€", tags: ["rainy", "cloudy", "cold", "snowy"] },
  { name: "Terrasse Grand'Place", category: "Gastronomie", indoor: false, price: "€€", tags: ["sunny", "hot"] },
  { name: "Marché de Wazemmes", category: "Gastronomie", indoor: false, price: "€", tags: ["sunny", "cloudy"] },
  { name: "Atelier cuisine nordiste", category: "Gastronomie", indoor: true, price: "€€€", tags: ["rainy", "cloudy", "cold"] },
  { name: "Piscine Olympique", category: "Sport", indoor: true, price: "€€", tags: ["rainy", "cloudy", "cold", "snowy", "hot"] },
  { name: "Patinoire", category: "Sport", indoor: true, price: "€€", tags: ["cold", "snowy", "rainy"] },
  { name: "Escalade indoor", category: "Sport", indoor: true, price: "€€", tags: ["rainy", "cloudy", "cold", "snowy"] },
  { name: "Yoga en plein air", category: "Sport", indoor: false, price: "€", tags: ["sunny", "cloudy", "hot"] },
  { name: "Spa & Hammam", category: "Bien-être", indoor: true, price: "€€€", tags: ["rainy", "cloudy", "cold", "snowy"] }
];

const LOCATIONS = [
  "Vieux-Lille", "Centre", "Wazemmes", "Lille-Sud", "Moulins", "Fives", 
  "Hellemmes", "Lomme", "Vauban", "Saint-Maurice", "République", "Euralille"
];

const PRICE_RANGES = ["Gratuit", "€", "€", "€€", "€€", "€€€", "€€€€"];

const WEATHER_TAGS = ["rainy", "sunny", "cloudy", "cold", "hot", "snowy"];

// Générateur pseudo-aléatoire avec graine : `make fetch` produit toujours les mêmes données.
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const random = mulberry32(Number(process.env.SEED || 42));

function randomElement(arr) {
  return arr[Math.floor(random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(random() * (max - min + 1)) + min;
}

function generateWeatherTags(indoor, category) {
  if (indoor) {
    // Activités dedans quand il pleut, fait froid, neige
    const tags = ["rainy", "cloudy", "cold", "snowy"];
    // Certaines sont bien par beau temps
    if (random() > 0.5) tags.push("sunny");
    if (random() > 0.7) tags.push("hot");
    return tags;
  } else {
    // Activités dehors quand il fait beau
    const tags = ["sunny"];
    if (random() > 0.3) tags.push("cloudy");
    if (random() > 0.6) tags.push("hot");
    // Activités d'hiver
    if (random() > 0.8) tags.push("cold", "snowy");
    return tags;
  }
}

function generateDescription(name, category, location, indoor, price, properName = false) {
  const intro = {
    "Musée": "Découvrez",
    "Parc": "Profitez d'une balade",
    "Culture": "Assistez à",
    "Sport": "Pratiquez",
    "Shopping": "Explorez",
    "Gastronomie": "Dégustez",
    "Loisirs": "Partez à la découverte",
    "Bien-être": "Détendez-vous",
    "Événement": "Participez à",
    "Histoire": "Visitez"
  };
  
  const weatherTip = indoor 
    ? "Parfait quand il pleut ou fait froid." 
    : "Idéal par beau temps.";
  
  const label = properName ? name : name.toLowerCase();  // garde la majuscule des vrais lieux
  return `${intro[category] || "Découvrez"} ${label} ${location ? `dans le quartier de ${location}` : "à Lille"}. ${weatherTip} Tarif: ${price}.`;
}

function generateActivities(count = 500) {
  const activities = [];
  const usedNames = new Set();
  
  //Ajoute les activités spécifiques
  for (const act of SPECIFIC_ACTIVITIES) {
    activities.push({
      name: act.name,
      type: act.category,
      indoor: act.indoor,
      price: act.price,
      // lieux réels : on ne leur invente pas de quartier
      desc: generateDescription(act.name, act.category, null, act.indoor, act.price, true),
      weather: act.tags,
      location: "Lille"
    });
    usedNames.add(act.name);
  }
  
  // Génère le reste aléatoirement
  let generated = SPECIFIC_ACTIVITIES.length;
  while (generated < count) {
    const category = randomElement(CATEGORIES);
    const baseName = randomElement(category.baseNames);
    const location = randomElement(LOCATIONS);
    const price = randomElement(PRICE_RANGES);
    
    // Génère un nom unique
    let name;
    let suffix = "";
    do {
      suffix = random() > 0.6 ? ` ${randomInt(1, 99)}` : "";
      const hasArticle = /^(Le|La|Les|L') /.test(baseName) || baseName.startsWith("L'");
      const prefix = !hasArticle && random() > 0.7 ? randomElement(["Atelier ", "Espace "]) : "";
      name = `${prefix}${baseName}${suffix}`.trim();
    } while (usedNames.has(name));
    usedNames.add(name);
    
    const indoor = category.indoor;
    const weather = generateWeatherTags(indoor, category.name);
    
    activities.push({
      name: name,
      type: category.name,
      indoor: indoor,
      price: price,
      desc: generateDescription(name, category.name, location, indoor, price),
      weather: weather,
      location: location
    });
    
    generated++;
  }
  
  return activities;
}

// Génération et export
const activities = generateActivities(500);
console.error(`\n${activities.length} activités générées.`);
console.log(JSON.stringify(activities, null, 2));
