import React from 'react';
import { formatNumber } from '../utils/formatters';

export const ResumenVertical = ({ resultados, selectedTier, selectedType }) => {
  // Buscar el ítem seleccionado
  let conDiario = 0, conMensual = 0, sinDiario = 0, sinMensual = 0, titulo = "Ninguno seleccionado";
  if (selectedType === 'cria') {
    const item = resultados.cria.find(r => r.tier === selectedTier);
    if (item) {
      conDiario = item.profitWithFood;
      conMensual = conDiario * 30;
      sinDiario = item.profitWithoutFood;
      sinMensual = sinDiario * 30;
      titulo = `🐣 Crianza Tier ${selectedTier}`;
    }
  } else if (selectedType === 'carne') {
    const item = resultados.carniceria.find(c => c.tier === selectedTier);
    if (item) {
      conDiario = item.meatRevenue;
      conMensual = conDiario * 30;
      sinDiario = '-';
      sinMensual = '-';
      titulo = `🥩 Carnicería Tier ${selectedTier}`;
    }
  } else if (selectedType === 'producto') {
    const item = resultados.productos.find(p => p.tier === selectedTier);
    if (item) {
      conDiario = item.profitConComida;
      conMensual = conDiario * 30;
      sinDiario = item.profitSinComida;
      sinMensual = sinDiario * 30;
      titulo = `🧺 Producto Tier ${selectedTier}`;
    }
  }

  return (
    <div className="section-card">
      <div className="section-title">📊 RESUMEN DE GANANCIAS</div>
      <div className="resumen-vertical">
        <div style={{ textAlign: 'center' }}>
          <span className="resumen-titulo">{titulo}</span>
        </div>
        <div className="resumen-item">
          <span className="resumen-label">💰 Profit diario (comprando comida)</span>
          <span className="resumen-value">{formatNumber(conDiario)}</span>
        </div>
        <div className="resumen-item">
          <span className="resumen-label">📆 Profit mensual (comprando comida)</span>
          <span className="resumen-value">{formatNumber(conMensual)}</span>
        </div>
        <div className="resumen-item">
          <span className="resumen-label">🌾 Profit diario (sin comprar comida)</span>
          <span className="resumen-value">{typeof sinDiario === 'number' ? formatNumber(sinDiario) : sinDiario}</span>
        </div>
        <div className="resumen-item">
          <span className="resumen-label">📆 Profit mensual (sin comprar comida)</span>
          <span className="resumen-value">{typeof sinMensual === 'number' ? formatNumber(sinMensual) : sinMensual}</span>
        </div>
      </div>
    </div>
  );
};
