import React from 'react';

export const ConfigPanel = ({ config, onUpdateConfig, onRefresh }) => {
  const handleChange = (field, value) => {
    onUpdateConfig({ [field]: value });
  };

  return (
    <div className="glass-panel">
      <div className="config-grid">
        <div className="config-item">
          <label>🌍 REGIÓN</label>
          <select value={config.region} onChange={(e) => handleChange('region', e.target.value)}>
            <option value="americas">Américas</option>
            <option value="europe">Europa</option>
            <option value="asia">Asia</option>
          </select>
        </div>
        <div className="config-item">
          <label>🏙️ CIUDAD</label>
          <select value={config.city} onChange={(e) => handleChange('city', e.target.value)}>
            {['Martlock','Thetford','Fort Sterling','Lymhurst','Bridgewatch','Caerleon'].map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div className="config-item">
          <label>⭐ PREMIUM</label>
          <select value={config.premium} onChange={(e) => handleChange('premium', e.target.value === 'true')}>
            <option value="true">Sí</option>
            <option value="false">No</option>
          </select>
        </div>
        <div className="config-item">
          <label>✨ USO DE FOCO</label>
          <select value={config.focus} onChange={(e) => handleChange('focus', e.target.value === 'true')}>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>
        <div className="config-item">
          <label>🏅 BONIF. CIUDAD</label>
          <select value={config.cityBonus} onChange={(e) => handleChange('cityBonus', e.target.value === 'true')}>
            <option value="false">No</option>
            <option value="true">Sí</option>
          </select>
        </div>
        <div className="config-item">
          <label>📦 PARCELAS</label>
          <input type="number" value={config.plots} onChange={(e) => handleChange('plots', parseInt(e.target.value) || 16)} min="1" step="1" />
        </div>
        <div className="config-item">
          <label>⚡ ESTACIÓN (fee)</label>
          <input type="number" value={config.estacion} onChange={(e) => handleChange('estacion', parseInt(e.target.value) || 729)} step="1" />
        </div>
        <div className="config-item">
          <button onClick={onRefresh}>⟳ ACTUALIZAR DATOS (API)</button>
        </div>
      </div>
    </div>
  );
};
