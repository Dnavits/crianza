import { itemsIds, FALLBACK_PRICES } from '../utils/constants';

export async function fetchHistoricalPrices(region, city) {
  const allIds = new Set();
  for (let t of [3,4,5,6,7,8]) {
    allIds.add(itemsIds[t].bebe);
    allIds.add(itemsIds[t].adulto);
    allIds.add(itemsIds[t].comida);
    if (itemsIds[t].producto) allIds.add(itemsIds[t].producto);
    allIds.add(itemsIds[t].carne);
  }
  const idsParam = Array.from(allIds).join(',');
  const pricesUrl = `https://${region}.albion-online-data.com/api/v2/stats/prices/${idsParam}?locations=${encodeURIComponent(city)}`;
  const historyUrl = `https://${region}.albion-online-data.com/api/v2/stats/history/${idsParam}?locations=${encodeURIComponent(city)}&time-scale=24`;
  try {
    const [pricesRes, historyRes] = await Promise.all([fetch(pricesUrl), fetch(historyUrl)]);
    let priceData = [], historyData = [];
    if (pricesRes.ok) priceData = await pricesRes.json();
    if (historyRes.ok) historyData = await historyRes.json();

    const finalPriceMap = new Map();
    // fallback
    for (const [id, p] of Object.entries(FALLBACK_PRICES)) finalPriceMap.set(id, p);
    // precios actuales
    if (Array.isArray(priceData)) {
      for (let item of priceData) {
        if (item && item.item_id && item.sell_price_min > 0) finalPriceMap.set(item.item_id, item.sell_price_min);
      }
    }
    // históricos (sobrescriben)
    if (Array.isArray(historyData)) {
      for (let item of historyData) {
        if (item && item.item_id && item.avg_price > 0) finalPriceMap.set(item.item_id, Math.round(item.avg_price));
      }
    }
    return { priceMap: finalPriceMap };
  } catch (err) {
    console.error(err);
    const fallbackMap = new Map();
    for (const [id, p] of Object.entries(FALLBACK_PRICES)) fallbackMap.set(id, p);
    return { priceMap: fallbackMap };
  }
}
