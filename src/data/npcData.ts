export const RACES = [
  "Human", "Elf", "High Elf", "Wood Elf", "Drow", "Dwarf", "Halfling",
  "Gnome", "Half-Elf", "Half-Orc", "Tiefling", "Dragonborn", "Aasimar",
  "Goliath", "Tabaxi", "Kenku", "Lizardfolk", "Tortle", "Firbolg",
];

export const CLASSES = [
  "Innkeeper", "Blacksmith", "Merchant", "Guard", "Beggar", "Noble",
  "Scholar", "Healer", "Farmer", "Fisher", "Hunter", "Priest",
  "Street Urchin", "Thief", "Bard", "Wizard", "Mercenary", "Sailor",
  "Assassin", "Spy", "Herbalist", "Cartographer", "Messenger", "Jailer",
  "Butcher", "Baker", "Alchemist", "Knight", "Bounty Hunter", "Oracle",
];

export const PERSONALITY_TRAITS = [
  "Always speaks in rhymes", "Laughs at everything, even tragedy",
  "Deeply paranoid — checks over their shoulder constantly",
  "Obsessively clean and tidy", "Speaks in a whisper regardless of setting",
  "Cannot maintain eye contact", "Overly generous to a fault",
  "Brutally honest, even when it hurts", "Talks to inanimate objects",
  "Has a catchphrase they overuse", "Extremely superstitious",
  "Collects strange trinkets", "Names every animal they encounter",
  "Cannot sit still, always fidgeting", "Exaggerates every story wildly",
  "Deeply philosophical about mundane things", "Terrified of magic",
  "Keeps detailed notes about everything", "Hums constantly while working",
  "Disagrees with everything on principle",
];

export const APPEARANCES = [
  "Scarred left cheek, piercing grey eyes", "Enormous braided red beard",
  "Crooked nose, warm brown eyes", "Shaved head with tattoos on the scalp",
  "Unusually tall, lanky with a stoop", "Round-faced, always sweating",
  "Silver hair despite being young", "Missing two fingers on the right hand",
  "Hazel eyes of different sizes", "Elaborate jewelry on every finger",
  "Pale skin with dark circles under the eyes", "Sun-darkened skin, calloused hands",
  "Wild unkempt hair, stained clothes", "Immaculately dressed, not a hair out of place",
  "Limps on the left leg", "Breathtaking beauty, knows it",
  "Forgettable face — hard to describe later", "Burns covering the left arm",
  "Unusually short, stocky build", "Peculiar green tint to the skin",
];

export const MOTIVATIONS = [
  "Wants to find their missing sibling",
  "Trying to pay off an enormous gambling debt",
  "Seeks revenge against a corrupt noble",
  "Dreams of opening a famous tavern",
  "Searching for a cure for a dying loved one",
  "Wants to prove their worth after being disgraced",
  "Hoarding wealth for an early retirement",
  "Devoted to protecting their neighbourhood",
  "Collecting rare books and forbidden knowledge",
  "Trying to escape their criminal past",
  "Wants to see every country in the world",
  "Driven by religious devotion",
  "Protecting a dangerous secret",
  "Trying to win back a lost love",
  "Desperate to gain social status",
];

export const SECRETS = [
  "Is secretly a noble in hiding",
  "Witnessed a murder but never reported it",
  "Works as an informant for the city watch",
  "Is actually much older than they appear",
  "Carries a cursed item they can't get rid of",
  "Owes their life to a devil — literally",
  "Their whole identity is fabricated",
  "Has been slowly poisoning their employer",
  "Knows the location of a buried treasure",
  "Was once a famous hero under a different name",
  "Has a hidden second family across town",
  "Is the true heir to a contested throne",
  "Can hear the thoughts of whoever touches them",
  "Was responsible for a terrible accident long ago",
  "Is being blackmailed and will do anything to stop it",
];

export const VOICE_MANNERISMS = [
  "Deep, gravelly voice — speaks slowly and deliberately",
  "High-pitched and excitable, talks very fast",
  "Formal and overly polished speech",
  "Thick regional accent, hard to understand",
  "Pauses mid-sentence to think for a long time",
  "Uses outdated slang from decades past",
  "Whispers everything conspiratorially",
  "Interrupts others frequently",
  "Narrates their own actions in third person",
  "Quotes proverbs for every situation",
  "Switches languages mid-sentence",
  "Never finishes a sentence, leaves them trailing off...",
];

const FIRST_NAMES_M = [
  "Aldric", "Bram", "Corvin", "Dorian", "Elias", "Fenn", "Gordan", "Harald",
  "Idris", "Joran", "Kael", "Lucian", "Mace", "Nolan", "Oryn", "Pell",
  "Quinlan", "Rael", "Soren", "Tavish", "Ulric", "Vorn", "Wren", "Xander",
  "Yoren", "Zephyr", "Theron", "Silas", "Roderick", "Magnus",
];

const FIRST_NAMES_F = [
  "Aelys", "Bryn", "Calla", "Dara", "Elia", "Faye", "Greta", "Hilde",
  "Isla", "Jessa", "Kira", "Lyra", "Mira", "Nessa", "Orla", "Petra",
  "Quinn", "Rael", "Sera", "Talia", "Una", "Vera", "Wynne", "Xara",
  "Yara", "Zara", "Thea", "Selene", "Rhea", "Maren",
];

const LAST_NAMES = [
  "Ashford", "Blackwood", "Crane", "Dunmore", "Edgeworth", "Fairchild",
  "Graves", "Holloway", "Ironside", "Jett", "Kingsley", "Lockwood",
  "Moorewood", "Nightshade", "Oldbury", "Pembrooke", "Quicksilver",
  "Ravenscroft", "Stonegate", "Thorn", "Underhill", "Vane", "Whitmore",
  "Yarrow", "Zane", "Crowley", "Duskmantle", "Embervale", "Frostborn",
];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateRandomNPC() {
  const isFemale = Math.random() > 0.5;
  return {
    name: `${pick(isFemale ? FIRST_NAMES_F : FIRST_NAMES_M)} ${pick(LAST_NAMES)}`,
    race: pick(RACES),
    occupation: pick(CLASSES),
    appearance: pick(APPEARANCES),
    personality: pick(PERSONALITY_TRAITS),
    motivation: pick(MOTIVATIONS),
    secret: pick(SECRETS),
    voice: pick(VOICE_MANNERISMS),
    notes: "",
  };
}

export type NPC = ReturnType<typeof generateRandomNPC> & { id: string; createdAt: number };
