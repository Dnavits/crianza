// Iconos y nombres por tier
export const tierIconos = {
  3: { bebe: "🐤", adulto: "🐔", comida: "🌾", carne: "🍗", producto: "🥚" },
  4: { bebe: "🐐", adulto: "🐐", comida: "🥕", carne: "🥩", producto: "🥛" },
  5: { bebe: "🦢", adulto: "🦆", comida: "🥬", carne: "🥩", producto: "🥚" },
  6: { bebe: "🐏", adulto: "🐑", comida: "🥔", carne: "🥩", producto: "🥛" },
  7: { bebe: "🐖", adulto: "🐷", comida: "🌽", carne: "🥩", producto: null },
  8: { bebe: "🐄", adulto: "🐮", comida: "🎃", carne: "🥩", producto: "🥛" }
};

export const tierNombres = {
  3: { bebe: "Pollito", adulto: "Pollo", comida: "Manojo de trigo", producto: "Huevos de Gallina", carne: "Carne de Pollo" },
  4: { bebe: "Cabrito", adulto: "Cabra", comida: "Rábanos", producto: "Leche de Cabra", carne: "Carne de Cabra" },
  5: { bebe: "Ansarino", adulto: "Ganso", comida: "Coles", producto: "Huevos de Ganso", carne: "Carne de Ganso" },
  6: { bebe: "Cordero", adulto: "Oveja", comida: "Patatas", producto: "Leche de Oveja", carne: "Carne de Carnero" },
  7: { bebe: "Lechón", adulto: "Cerdo", comida: "Fardo de maíz", producto: null, carne: "Carne de Cerdo" },
  8: { bebe: "Ternero", adulto: "Vaca", comida: "Calabaza", producto: "Leche de Vaca", carne: "Carne de Ternera" }
};

// IDs internos de la API
export const itemsIds = {
  3: { bebe: "T3_CHICKEN", adulto: "T3_CHICKEN", comida: "T3_WHEAT", producto: "T3_EGG", carne: "T3_MEAT_CHICKEN" },
  4: { bebe: "T4_GOAT", adulto: "T4_GOAT", comida: "T4_RADISH", producto: "T4_GOAT_MILK", carne: "T4_MEAT_GOAT" },
  5: { bebe: "T5_GOOSE", adulto: "T5_GOOSE", comida: "T5_CABBAGE", producto: "T5_GOOSE_EGG", carne: "T5_MEAT_GOOSE" },
  6: { bebe: "T6_SHEEP", adulto: "T6_SHEEP", comida: "T6_POTATO", producto: "T6_SHEEP_MILK", carne: "T6_MEAT_SHEEP" },
  7: { bebe: "T7_PIG", adulto: "T7_PIG", comida: "T7_CORN", producto: null, carne: "T7_MEAT_PIG" },
  8: { bebe: "T8_CALF", adulto: "T8_CALF", comida: "T8_PUMPKIN", producto: "T8_COW_MILK", carne: "T8_MEAT_CALF" }
};

// Porcentajes de nuevas crías según FOCO
export const focusNewPercent = {
  3: { noFocus: 60, focus: 140 },
  4: { noFocus: 73.33, focus: 126.66 },
  5: { noFocus: 80, focus: 120 },
  6: { noFocus: 86.67, focus: 113.34 },
  7: { noFocus: 91.11, focus: 108.89 },
  8: { noFocus: 93.33, focus: 106.66 }
};

// Precios de respaldo (fallback)
export const FALLBACK_PRICES = {
  "T3_CHICKEN": 5648, "T3_WHEAT": 499, "T3_MEAT_CHICKEN": 376, "T3_EGG": 64,
  "T4_GOAT": 8185, "T4_RADISH": 403, "T4_MEAT_GOAT": 379, "T4_GOAT_MILK": 500,
  "T5_GOOSE": 10998, "T5_CABBAGE": 487, "T5_MEAT_GOOSE": 410, "T5_GOOSE_EGG": 351,
  "T6_SHEEP": 14999, "T6_POTATO": 489, "T6_MEAT_SHEEP": 393, "T6_SHEEP_MILK": 409,
  "T7_PIG": 34885, "T7_CORN": 483, "T7_MEAT_PIG": 394,
  "T8_CALF": 34987, "T8_PUMPKIN": 424, "T8_MEAT_CALF": 427, "T8_COW_MILK": 317
};

// Funciones auxiliares
export const cityBonusMult = (hasBonus) => hasBonus ? 1.218 : 1.152;
export const baseProductUnits = (hasBonus) => hasBonus ? 22 : 17;
export const meatUnitsPerDay = (plots, hasBonus) => 18 * cityBonusMult(hasBonus) * plots * 9;
