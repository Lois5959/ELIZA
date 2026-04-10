const CUISINES = [
  { type: "Française", names: ["Le Bistrot", "La Brasserie", "Le Comptoir", "La Table", "L'Assiette", "Le Gourmet", "La Fourchette", "Le Régal", "La Cuisine", "Le Délice"] },
  { type: "Italienne", names: ["La Trattoria", "Pizzeria", "Ristorante", "Trattoria", "La Piazza", "Bella Italia", "Napoli", "Roma", "Venezia", "Milano"] },
  { type: "Nordiste", names: ["Estaminet", "La Chicorée", "Le Potjevleesch", "La Carbonnade", "Le Welsh", "La Bière", "Le Maroilles", "La Gueuze", "Le Genièvre", "La Flandre"] },
  { type: "Japonaise", names: ["Sushi", "Ramen", "Tokyo", "Kyoto", "Osaka", "Nagoya", "Sapporo", "Yokohama", "Kobe", "Nara"] },
  { type: "Chinoise", names: ["Dragon", "Pékin", "Shanghai", "Canton", "Hong Kong", "Sichuan", "Wok", "Bambou", "Lotus", "Jade"] },
  { type: "Indienne", names: ["Taj Mahal", "Bombay", "Delhi", "Curry", "Tandoori", "Namasté", "Mumbai", "Calcutta", "Goa", "Kerala"] },
  { type: "Mexicaine", names: ["El Mariachi", "La Fiesta", "Casa Mexicana", "El Pueblo", "La Hacienda", "El Toro", "La Cantina", "El Camino", "La Plaza", "El Sol"] },
  { type: "Libanaise", names: ["Beyrouth", "Cèdre", "Orient", "Phénicie", "Liban", "Byblos", "Tripoli", "Sidon", "Baalbek", "Jounieh"] },
  { type: "Marocaine", names: ["Marrakech", "Casablanca", "Fès", "Rabat", "Tanger", "Agadir", "Essaouira", "Ouarzazate", "Meknès", "Chefchaouen"] },
  { type: "Thaïlandaise", names: ["Bangkok", "Thai Garden", "Siam", "Pad Thai", "Chiang Mai", "Phuket", "Krabi", "Ayutthaya", "Sukhothai", "Pattaya"] },
  { type: "Vietnamienne", names: ["Hanoï", "Saïgon", "Pho", "Bánh Mì", "Huế", "Da Nang", "Nha Trang", "Hoi An", "Halong", "Mekong"] },
  { type: "Grecque", names: ["Athènes", "Santorin", "Mykonos", "Crète", "Rhodes", "Corfou", "Olympie", "Delphes", "Paros", "Naxos"] },
  { type: "Espagnole", names: ["Barcelona", "Madrid", "Sevilla", "Valencia", "Granada", "Toledo", "Bilbao", "San Sebastián", "Málaga", "Zaragoza"] },
  { type: "Américaine", names: ["Burger", "Steakhouse", "BBQ", "Diner", "Grill", "Smokehouse", "Pub", "Tavern", "Roadhouse", "Brewery"] },
  { type: "Végétarienne", names: ["Green", "Veggie", "Bio", "Nature", "Zen", "Pure", "Earth", "Garden", "Leaf", "Root"] }
];

const AMBIANCES = [
  "Conviviale / Traditionnelle", "Moderne / Décontractée", "Élégante / Raffinée",
  "Cosy / Romantique", "Familiale / Enfants", "Trendy / Branchée",
  "Rustique / Authentique", "Zen / Naturelle", "Dynamique / Animée",
  "Intimiste / Discrète", "Lumineuse / Claire", "Historique / Patrimoniale"
];

const PRICE_RANGES = ["€", "€", "€€", "€€", "€€", "€€€", "€€€", "€€€€"];

const STREETS_LILLE = [
  "Rue de Béthune", "Rue Nationale", "Rue Faidherbe", "Rue de la Monnaie",
  "Rue Esquermoise", "Rue de Paris", "Boulevard Carnot", "Rue Solférino",
  "Rue du Molinel", "Rue de la Clef", "Rue des Chats Bossus", "Rue de Gand",
  "Rue Saint-André", "Rue Basse", "Rue de Roubaix", "Avenue du Peuple Belge",
  "Rue Colbert", "Rue Inkermann", "Rue Jeanne d'Arc", "Rue Léon Gambetta"
];

const QUARTIERS = ["Vieux-Lille", "Centre", "Wazemmes", "Lille-Sud", "Moulins", "Fives", "Hellemmes", "Lomme"];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRestaurants(count = 500) {
  const restaurants = [];
  const usedNames = new Set();

  for (let i = 0; i < count; i++) {
    const cuisine = randomElement(CUISINES);
    const baseName = randomElement(cuisine.names);
    
    // Génère un nom unique
    let name;
    let suffix = "";
    do {
      suffix = Math.random() > 0.5 ? ` ${randomInt(1, 99)}` : "";
      const prefix = Math.random() > 0.7 ? randomElement(["Le", "La", "L'", "Chez"]) + " " : "";
      name = `${prefix}${baseName}${suffix}`.trim();
    } while (usedNames.has(name));
    usedNames.add(name);

    const street = randomElement(STREETS_LILLE);
    const quartier = randomElement(QUARTIERS);
    const price = randomElement(PRICE_RANGES);
    const ambiance = randomElement(AMBIANCES);
    
    const openHour = randomInt(10, 12);
    const closeHour = randomInt(21, 23);
    const openDays = Math.random() > 0.3 
      ? [0,1,2,3,4,5,6] 
      : [1,2,3,4,5,6]; // Fermé le dimanche

    restaurants.push({
      name: name,
      cuisine: cuisine.type,
      ambiance: ambiance,
      indoor: Math.random() > 0.2,
      price_range: price,
      open_hour: openHour,
      close_hour: closeHour,
      open_days: openDays,
      desc: `${name} propose une cuisine ${cuisine.type.toLowerCase()} ${quartier === "Vieux-Lille" ? "au cœur du Vieux-Lille" : `dans le quartier de ${quartier}`}, avec des produits frais et un service attentif.`
    });
  }

  return restaurants;
}

// Génération et export
const restaurants = generateRestaurants(500);
console.error(`\n${restaurants.length} restaurants générés.`);
console.log(JSON.stringify(restaurants, null, 2));
