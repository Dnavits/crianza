import { useState, useEffect, useCallback } from 'react';
import { fetchHistoricalPrices } from '../services/albionApi';
import { itemsIds, focusNewPercent, cityBonusMult, baseProductUnits, meatUnitsPerDay } from '../utils/constants';

export function usePrecios() {
  const [config, setConfig] = useState({
    region: 'americas',
    city: 'Martlock',
    premium: true,
    focus: false,
    cityBonus: false,
    plots: 16,
    estacion: 729
  });

  const [preciosManuales, setPreciosManuales] = useState(new Map());
  const [resultados, setResultados] = useState({ cria: [], carniceria: [], productos: [] });
  const [cargando, setCargando] = useState(true);
  const [timestamp, setTimestamp] = useState('');

  // Función de cálculo (sin llamada a API, solo con el mapa de precios actual)
  const calcularTodo = useCallback((priceMap, cfg) => {
    const { plots, premium, focus, cityBonus, estacion } = cfg;
    const tax = premium ? 6.5 : 10.5;
    const taxFactor = 1 - (tax / 100);
    const baseProdUnitsLocal = baseProductUnits(cityBonus);
    const stationFeePerDay = (81 * estacion / 100) * (plots * 9); // no se resta en cada ítem, solo en el resumen si se desea

    let cria = [];
    let carniceria = [];
    let productos = [];

    for (let tier of [3,4,5,6,7,8]) {
      const babyPrice = priceMap.get(itemsIds[tier].bebe) || 0;
      const adultPrice = priceMap.get(itemsIds[tier].adulto) || 0;
      const foodPrice = priceMap.get(itemsIds[tier].comida) || 0;
      const newPercent = focus ? focusNewPercent[tier].focus : focusNewPercent[tier].noFocus;
      const newCrias = (plots * 9) * (newPercent / 100);
      const revenueAdults = plots * 9 * adultPrice * taxFactor;
      const revenueNewCrias = babyPrice * newCrias;
      const costBuyInitial = babyPrice * 9 * plots;
      const costFood = 81 * foodPrice * plots;
      const profitWithFood = revenueAdults + revenueNewCrias - costBuyInitial - costFood;
      const profitWithoutFood = revenueAdults + revenueNewCrias - costBuyInitial;
      cria.push({ tier, babyPrice, adultPrice, foodPrice, newPercent, newCrias, profitWithFood, profitWithoutFood });

      // Carnicería
      const meatPrice = priceMap.get(itemsIds[tier].carne) || 0;
      const meatUnits = meatUnitsPerDay(plots, cityBonus);
      const meatRevenue = meatUnits * meatPrice * taxFactor;
      carniceria.push({ tier, meatPrice, meatUnits, meatRevenue });

      // Productos
      if (itemsIds[tier].producto) {
        const prodPrice = priceMap.get(itemsIds[tier].producto) || 0;
        const prodUnits = baseProdUnitsLocal * plots * 9;
        const prodRevenue = prodUnits * prodPrice * taxFactor;
        const prodCostFood = 81 * foodPrice * plots;
        productos.push({ tier, prodPrice, prodUnits, profitSinComida: prodRevenue, profitConComida: prodRevenue - prodCostFood });
      } else {
        productos.push({ tier, prodPrice: 0, profitSinComida: 0, profitConComida: 0 });
      }
    }
    return { cria, carniceria, productos, stationFeePerDay };
  }, []);

  // Refrescar desde API (resetea precios manuales)
  const refreshFromAPI = useCallback(async () => {
    setCargando(true);
    const { priceMap } = await fetchHistoricalPrices(config.region, config.city);
    // Guardar precios manuales = precios de API
    const nuevosManuales = new Map();
    for (let [k, v] of priceMap.entries()) nuevosManuales.set(k, v);
    setPreciosManuales(nuevosManuales);
    const { cria, carniceria, productos } = calcularTodo(priceMap, config);
    setResultados({ cria, carniceria, productos });
    setTimestamp(new Date().toLocaleTimeString());
    setCargando(false);
  }, [config, calcularTodo]);

  // Actualizar solo la configuración (sin llamar a API) y recalcular con los precios manuales actuales
  const updateConfig = useCallback((nuevaConfig) => {
    setConfig(prev => ({ ...prev, ...nuevaConfig }));
    // Recalcular con los precios manuales actuales
    const { cria, carniceria, productos } = calcularTodo(preciosManuales, { ...config, ...nuevaConfig });
    setResultados({ cria, carniceria, productos });
  }, [config, preciosManuales, calcularTodo]);

  // Actualizar un precio manual específico
  const updatePrecio = useCallback((itemId, nuevoValor) => {
    setPreciosManuales(prev => {
      const newMap = new Map(prev);
      newMap.set(itemId, nuevoValor);
      return newMap;
    });
    // Recalcular con los nuevos precios manuales
    const nuevosManuales = new Map(preciosManuales);
    nuevosManuales.set(itemId, nuevoValor);
    const { cria, carniceria, productos } = calcularTodo(nuevosManuales, config);
    setResultados({ cria, carniceria, productos });
  }, [preciosManuales, config, calcularTodo]);

  // Cuando cambia región o ciudad, se debe llamar a refreshFromAPI (se hace manualmente desde el componente)
  // Pero también podemos observar cambios en region/city y llamar automáticamente
  useEffect(() => {
    refreshFromAPI();
  }, [config.region, config.city]);

  return {
    config,
    resultados,
    cargando,
    timestamp,
    updateConfig,
    updatePrecio,
    refreshFromAPI
  };
}
