import React from 'react';
import { tierIconos, tierNombres, itemsIds } from '../utils/constants';
import { formatNumber } from '../utils/formatters';

export const TablaCrianza = ({ resultados, onUpdatePrecio, selectedTier, onSelectTier }) => {
  return (
    <div className="section-card">
      <div className="section-title">🐣 CRIANZA</div>
      <table>
        <thead>
          <tr>
            <th className="selector-col"></th><th>Tier</th><th>Animal (cría/adulto)</th><th>Precio cría</th><th>Precio adulto</th><th>Comida favorita</th><th>Precio comida</th><th>% Nuevas</th><th>Nuevas/día</th><th>Profit con comida</th><th>Profit sin comida</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map(r => (
            <tr key={r.tier}>
              <td className="selector-col">
                <input type="radio" name="selectorGlobal" value={`cria-${r.tier}`} checked={selectedTier === r.tier} onChange={() => onSelectTier(r.tier, 'cria')} />
              </td>
              <td>{r.tier}</td>
              <td>{tierIconos[r.tier].bebe} {tierNombres[r.tier].bebe} / {tierIconos[r.tier].adulto} {tierNombres[r.tier].adulto}</td>
              <td><input type="number" className="price-input" value={r.babyPrice} onChange={(e) => onUpdatePrecio(itemsIds[r.tier].bebe, parseFloat(e.target.value) || 0)} step="1" /></td>
              <td><input type="number" className="price-input" value={r.adultPrice} onChange={(e) => onUpdatePrecio(itemsIds[r.tier].adulto, parseFloat(e.target.value) || 0)} step="1" /></td>
              <td>{tierIconos[r.tier].comida} {tierNombres[r.tier].comida}</td>
              <td><input type="number" className="price-input" value={r.foodPrice} onChange={(e) => onUpdatePrecio(itemsIds[r.tier].comida, parseFloat(e.target.value) || 0)} step="1" /></td>
              <td>{r.newPercent}%</td>
              <td>{r.newCrias.toFixed(1)}</td>
              <td className={r.profitWithFood >= 0 ? 'profit-positive' : 'profit-negative'}>{formatNumber(r.profitWithFood)}</td>
              <td className={r.profitWithoutFood >= 0 ? 'profit-positive' : 'profit-negative'}>{formatNumber(r.profitWithoutFood)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
