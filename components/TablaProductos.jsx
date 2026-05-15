import React from 'react';
import { tierIconos, tierNombres, itemsIds } from '../utils/constants';
import { formatNumber } from '../utils/formatters';

export const TablaProductos = ({ resultados, onUpdatePrecio, selectedTier, onSelectTier }) => {
  // Solo mostrar tiers con producto (excluir tier 7 y los que no tengan producto)
  const productosFiltrados = resultados.productos.filter(p => p.tier !== 7 && p.prodPrice !== 0 && tierNombres[p.tier].producto !== null);

  return (
    <div className="section-card">
      <div className="section-title">🧺 PRODUCTOS</div>
      <table>
        <thead>
          <tr>
            <th className="selector-col"></th><th>Tier</th><th>Producto</th><th>Precio unidad</th><th>Unidades/día</th><th>Profit sin comida</th><th>Profit restando comida</th>
          </tr>
        </thead>
        <tbody>
          {productosFiltrados.map(p => (
            <tr key={p.tier}>
              <td className="selector-col">
                <input type="radio" name="selectorGlobal" value={`producto-${p.tier}`} checked={selectedTier === p.tier} onChange={() => onSelectTier(p.tier, 'producto')} />
              </td>
              <td>{p.tier}</td>
              <td>{tierIconos[p.tier].producto} {tierNombres[p.tier].producto}</td>
              <td><input type="number" className="price-input" value={p.prodPrice} onChange={(e) => onUpdatePrecio(itemsIds[p.tier].producto, parseFloat(e.target.value) || 0)} step="1" /></td>
              <td>{p.prodUnits.toFixed(0)}</td>
              <td className="profit-positive">{formatNumber(p.profitSinComida)}</td>
              <td className={p.profitConComida >= 0 ? 'profit-positive' : 'profit-negative'}>{formatNumber(p.profitConComida)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
