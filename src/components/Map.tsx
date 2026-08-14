import React, { useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { Restaurante } from '../api/mockData';

// Fix Leaflet marker icons not loading correctly in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  restaurantes: Restaurante[];
  sortOrder: 'precioAsc' | 'precioDesc';
  onSelectRestaurante: (rest: Restaurante | null) => void;
}

// Componente para actualizar la vista del mapa si cambian las coordenadas
const ChangeView = ({ center, zoom }: { center: [number, number]; zoom: number }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

// Crear icono HTML personalizado basado en la calificación
const createCustomIcon = (calificacion: number) => {
  let color1, color2, textColor, starColor, emptyStarColor, borderColor, boxShadow;

  boxShadow = '0 4px 12px rgba(0,0,0,0.4)'; // Sombra por defecto

  if (calificacion === 5) {
    color1 = '#fbbf24'; // Color oro claro
    color2 = '#d97706'; // Color oro oscuro
    textColor = '#451a03'; // Texto oscuro
    starColor = '#451a03';
    emptyStarColor = 'rgba(69, 26, 3, 0.3)';
    borderColor = '#fef3c7';
    boxShadow = '0 0 16px 4px rgba(251, 191, 36, 0.7)'; // Resplandor dorado
  } else if (calificacion <= 2.5) {
    color1 = '#ef4444'; // Rojo
    color2 = '#b91c1c';
    textColor = 'white';
    starColor = '#fbbf24';
    emptyStarColor = 'rgba(255, 255, 255, 0.3)';
    borderColor = '#fca5a5';
  } else {
    // Escala Verde: más oscuro mientras mejor calificación
    const ratio = Math.max(0, Math.min(1, (calificacion - 2.5) / 2.4));
    const l = 65 - (ratio * 40); // 65% a 25% (más oscuro)
    color1 = `hsl(140, 80%, ${l}%)`;
    color2 = `hsl(140, 80%, ${Math.max(10, l - 10)}%)`;
    textColor = 'white';
    starColor = '#fbbf24';
    emptyStarColor = 'rgba(255, 255, 255, 0.3)';
    borderColor = `hsl(140, 80%, ${Math.min(90, l + 20)}%)`;
  }

  const roundedRating = Math.round(calificacion);
  
  // Generar partículas si es 4.6 o mayor
  const particlesHtml = calificacion >= 4.6 ? `
    <div class="sparkle-particle sparkle-1">✦</div>
    <div class="sparkle-particle sparkle-2">✦</div>
    <div class="sparkle-particle sparkle-3">✦</div>
  ` : '';

  const html = `
    <div style="
      width: 54px; 
      height: 54px;
      border-radius: 50%;
      background: linear-gradient(135deg, ${color1}, ${color2});
      box-shadow: ${boxShadow};
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      border: 2px solid ${borderColor};
      transition: transform 0.2s;
    ">
      ${particlesHtml}
      <span style="color: ${textColor}; font-weight: bold; font-size: 15px; margin-top: 8px;">
        ${calificacion.toFixed(1)}
      </span>
      <svg width="54" height="54" style="position: absolute; top: -2px; left: -2px; pointer-events: none;">
        ${[0,1,2,3,4].map(i => {
          const angle = -45 + (i * 22.5); // Distribuir estrellas en el arco superior
          const isFilled = i < roundedRating;
          const fill = isFilled ? starColor : emptyStarColor;
          return `<g transform="rotate(${angle}, 27, 27) translate(27, 8) scale(0.95)">
            <polygon points="0,-4 1.17,-1.6 3.8,-1.2 1.9,0.65 2.35,3.2 0,1.9 -2.35,3.2 -1.9,0.65 -3.8,-1.2 -1.17,-1.6" fill="${fill}" />
          </g>`;
        }).join('')}
      </svg>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'custom-leaflet-icon',
    iconSize: [58, 58],
    iconAnchor: [29, 29],
    popupAnchor: [0, -29]
  });
};

const Map: React.FC<MapProps> = ({ restaurantes, sortOrder, onSelectRestaurante }) => {
  // Centro aproximado de Cajamarca, Perú
  const center: [number, number] = [-7.1617, -78.5128];

  const sortedRestaurantes = useMemo(() => {
    return [...restaurantes].sort((a, b) => {
      if (sortOrder === 'precioAsc') return a.precio_desde - b.precio_desde;
      return b.precio_desde - a.precio_desde;
    });
  }, [restaurantes, sortOrder]);

  return (
    <div className="map-wrapper">
      <MapContainer 
        center={center} 
        zoom={14} 
        scrollWheelZoom={true} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
      >
        <ChangeView center={center} zoom={14} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {sortedRestaurantes.map((rest, index) => (
          <Marker 
            key={rest.id} 
            position={[rest.latitud, rest.longitud]}
            icon={createCustomIcon(rest.calificacion)}
            eventHandlers={{
              click: () => onSelectRestaurante(rest),
            }}
          >
            <Popup>
              <div className="popup-card">
                <img src={rest.foto} alt={rest.nombre} className="popup-image" />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', gap: '8px'}}>
                  <h3 className="popup-title" style={{margin: 0}}>{rest.nombre}</h3>
                  <div style={{
                    color: rest.calificacion === 5 ? '#fbbf24' : '#eab308', 
                    fontWeight: 'bold', 
                    fontSize: '11px',
                    backgroundColor: rest.calificacion === 5 ? '#fffbeb' : '#fefce8',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    whiteSpace: 'nowrap'
                  }}>
                    {'★'.repeat(Math.round(rest.calificacion))}{'☆'.repeat(5 - Math.round(rest.calificacion))}
                  </div>
                </div>
                <p className="popup-price">S/ {rest.precio_desde.toFixed(2)}</p>
                <div className="popup-tags">
                  {rest.categorias.map(cat => (
                    <span key={cat} className="tag">{cat}</span>
                  ))}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
