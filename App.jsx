import React, { useState } from 'react';
import { ConfigPanel } from './components/ConfigPanel';
import { ResumenVertical } from './components/ResumenVertical';
import { TablaCrianza } from './components/TablaCrianza';
import { TablaCarniceria } from './components/TablaCarniceria';
import { TablaProductos } from './components/TablaProductos';
import { usePrecios } from './hooks/usePrecios';
import './index.css';

function App() {
  const { config, resultados, cargando, timestamp, updateConfig, updatePrecio, refreshFromAPI } = usePrecios();
  const [selectedTier, setSelectedTier] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const handleSelect = (tier, type) => {
    setSelectedTier(tier);
    setSelectedType(type);
  };

  if (cargando) return <div className="loading">🔄 Cargando datos del mercado...</div>;

  return (
    <div className="container">
      <ConfigPanel config={config} onUpdateConfig={updateConfig} onRefresh={refreshFromAPI} />
      <ResumenVertical resultados={resultados} selectedTier={selectedTier} selectedType={selectedType} />
      <TablaCrianza resultados={resultados.cria} onUpdatePrecio={updatePrecio} selectedTier={selectedTier} onSelectTier={handleSelect} />
      <TablaCarniceria resultados={resultados.carniceria} onUpdatePrecio={updatePrecio} selectedTier={selectedTier} onSelectTier={handleSelect} />
      <TablaProductos resultados={resultados} onUpdatePrecio={updatePrecio} selectedTier={selectedTier} onSelectTier={handleSelect} />
      <div className="timestamp">Última actualización API: {timestamp}</div>
    </div>
  );
}

export default App;
