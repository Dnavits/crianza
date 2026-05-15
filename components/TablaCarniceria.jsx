import React from 'react';
import { tierIconos, tierNombres, itemsIds } from '../utils/constants';
import { formatNumber } from '../utils/formatters';

export const TablaCarniceria = ({ resultados, onUpdatePrecio, selectedTier, onSelectTier }) => {
  return (
    <div className="section-card">
      <div className="section-title">🥩 CARNICERÍA</div>
      <table>
        <thead>
          <tr>
            <th className="selector-col"></th><th>Tier</th><th>Carne</th><th>Precio unidad</th><th>Unidades/día</th><th>Ingreso neto diario</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map(m => (
            <tr key={m.tier}>
              <td className="selector-col">
                <input type="radio" name="selectorGlobal" value={`carne-${m.tier}`} checked={selectedTier === m.tier} onChange={() => onSelectTier(m.tier, 'carne')} />
              </td>
              <td>{m.tier}</td>
              <td>{tierIconos[m.tier].carne} {tierNombres[m.tier].carne}</td>
              <td><input type="number" className="price-input" value={m.meatPrice} onChange={(e) => onUpdatePrecio(itemsIds[m.tier].carne, parseFloat(e.target.value) || 0)} step="1" /></td>
              <td>{m.meatUnits.toFixed(0)}</td>
              <td className={m.meatRevenue >= 0 ? 'profit-positive' : 'profit-negative'}>{formatNumber(m.meatRevenue)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
