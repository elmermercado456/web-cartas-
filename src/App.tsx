import { useState, useEffect } from 'react';
import Map from './components/Map';
import { fetchRestaurantes, CATEGORIAS_PRINCIPALES } from './api/mockData';
import type { Restaurante } from './api/mockData';
import { Loader2, UtensilsCrossed, X, ChevronLeft, Map as MapIcon, MessageSquare, Search } from 'lucide-react';
import './index.css';

interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

function App() {
  const [view, setView] = useState<'home' | 'map'>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRest, setSelectedRest] = useState<Restaurante | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState("");
  
  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);

  // Cargar restaurantes cuando la vista es 'map' y la categoría cambia
  useEffect(() => {
    if (view === 'map' && selectedCategory) {
      setLoading(true);
      fetchRestaurantes(selectedCategory).then(data => {
        setRestaurantes(data);
        setLoading(false);
        setSelectedRest(null); // Reset selection
      });
    }
  }, [view, selectedCategory]);

  useEffect(() => {
    if (selectedRest) {
      // Mock de comentarios iniciales basados en la calificación
      const mocks: Review[] = [
        { id: '1', user: 'María Gómez', rating: Math.min(5, Math.ceil(selectedRest.calificacion)), comment: 'Lo bueno: Excelente sabor y buena presentación. Muy recomendado.', date: 'Hace 2 días' },
        { id: '2', user: 'Carlos Ruiz', rating: Math.max(1, Math.floor(selectedRest.calificacion - 1)), comment: 'Lo malo: El tiempo de espera fue un poco largo, pero la comida salvó la noche.', date: 'Hace 1 semana' }
      ];
      setReviews(mocks);
    }
  }, [selectedRest]);



  const handleCategorySelect = (categoria: string) => {
    setSelectedCategory(categoria);
    setView('map');
  };

  const handleVolver = () => {
    setView('home');
    setSelectedCategory(null);
  };

  if (view === 'home') {
    return (
      <div className="home-container">
        <header className="home-header">
          <div className="logo-area">
            <div style={{ backgroundColor: 'var(--primary)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)' }}>
              <UtensilsCrossed size={36} color="white" />
            </div>
            <h1>BúscaloPe</h1>
          </div>
          <p className="subtitle-chicha">¡Encuentra tu point bravazo en la ciudad!</p>

          <div className="search-container">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Buscar cevichería, pollo a la brasa, chifa..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn-search">
              <Search size={20} />
              Buscar
            </button>
          </div>
        </header>

        <main className="categories-grid">
          {CATEGORIAS_PRINCIPALES.map(cat => (
            <div 
              key={cat.nombre} 
              className="category-card"
              onClick={() => handleCategorySelect(cat.nombre)}
            >
              <img src={cat.foto} alt={cat.nombre} />
              <div className="category-overlay">
                <h3>{cat.nombre}</h3>
                <span className="badge">{cat.count} locales</span>
              </div>
            </div>
          ))}
        </main>
      </div>
    );
  }

  // Filtrar restaurantes por búsqueda
  const filteredRestaurantes = restaurantes.filter(r => 
    r.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.categorias.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Map View
  return (
    <div className="app-container">
      {/* Sidebar UI (Glassmorphism Overlay) */}
      <aside className="sidebar">
        <button className="btn-back" onClick={handleVolver}>
          <ChevronLeft size={20} />
          Volver al Catálogo
        </button>

        <div className="sidebar-header" style={{ marginTop: '1rem' }}>
          <MapIcon className="logo-icon" size={28} />
          <h2 style={{ fontSize: '1.2rem' }}>{selectedCategory}</h2>
        </div>
        
        {loading && (
          <div className="loading-mini">
            <Loader2 className="spinner" size={24} />
            <span>Cargando locales...</span>
          </div>
        )}

        {!loading && (
          <div style={{color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px'}}>
            {filteredRestaurantes.length} locales encontrados. Selecciona un pin en el mapa para ver más detalles.
          </div>
        )}
      </aside>

      {/* Menu Modal Overlay */}
      {isMenuOpen && selectedRest && (
        <div className="menu-modal-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="menu-modal animate-slide-up" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsMenuOpen(false)}>
              <X size={24} />
            </button>
            <div className="menu-modal-header" style={{ height: '200px', position: 'relative' }}>
              <img src={selectedRest.foto} alt={selectedRest.nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(44,45,46,0.6), transparent)' }}></div>
            </div>
            
            <div style={{ padding: '0 20px', marginTop: '-40px', position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--bg-color)', border: '4px solid var(--card-adobe)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-lg)' }}>
                 <UtensilsCrossed size={40} color="var(--primary)" />
              </div>
              <h2 style={{ color: 'var(--title-purple)', margin: '10px 0 5px 0', fontSize: '1.6rem', textAlign: 'center', fontWeight: 'bold' }}>{selectedRest.nombre}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--green-huacatay)', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '10px' }}>
                <span style={{ letterSpacing: '2px' }}>
                  {'★'.repeat(Math.round(selectedRest.calificacion))}{'☆'.repeat(5 - Math.round(selectedRest.calificacion))}
                </span>
                <span>{selectedRest.calificacion.toFixed(1)}</span>
              </div>
            </div>
            
            <div className="menu-tabs">
              {['Entradas', 'Platos Fuertes', 'Bebidas', 'Postres', 'Calificaciones'].map(seccion => {
                if (seccion !== 'Calificaciones') {
                  const hasItems = selectedRest.menu.some(p => p.seccion === seccion);
                  if (!hasItems) return null;
                }
                return (
                  <button 
                    key={seccion} 
                    className={`menu-tab ${activeTab === seccion ? 'active' : ''}`}
                    onClick={() => setActiveTab(seccion)}
                  >
                    {seccion === 'Calificaciones' ? <span style={{display: 'flex', alignItems: 'center', gap: '4px'}}><MessageSquare size={16}/> Reseñas</span> : seccion}
                  </button>
                );
              })}
            </div>

            <div className="menu-items-list">
              {activeTab === 'Calificaciones' ? (
                <div className="reviews-container animate-slide-up">
                  <div className="add-review-box" style={{textAlign: 'center'}}>
                    <h4>¿Quieres dejar una reseña?</h4>
                    <p style={{color: 'var(--text-muted)', fontSize: '0.9rem', margin: '0.5rem 0 1rem'}}>
                      Para mantener la calidad de las opiniones, envíanos tu comentario y nosotros lo subiremos.
                    </p>
                    <div style={{display: 'flex', gap: '10px', justifyContent: 'center'}}>
                      <a 
                        href={`https://wa.me/51965173400?text=Hola,%20quiero%20dejar%20una%20reseña%20para%20el%20restaurante%20${encodeURIComponent(selectedRest.nombre)}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="btn-primary btn-small"
                        style={{backgroundColor: '#25D366', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: 'white'}}
                      >
                        WhatsApp
                      </a>
                      <a 
                        href={`mailto:contacto@gastrofinder.com?subject=Reseña para ${encodeURIComponent(selectedRest.nombre)}`} 
                        className="btn-primary btn-small"
                        style={{backgroundColor: '#3b82f6', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', color: 'white'}}
                      >
                        Correo
                      </a>
                    </div>
                  </div>

                  <div className="reviews-list-render">
                    {reviews.map(r => (
                      <div key={r.id} className="review-card">
                        <div className="review-header">
                          <span className="reviewer-name">{r.user}</span>
                          <span className="reviewer-stars">
                            {'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}
                          </span>
                        </div>
                        <p className="review-text">{r.comment}</p>
                        <span className="review-date">{r.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="menu-grid">
                  {selectedRest.menu
                    .filter(plato => plato.seccion === activeTab)
                    .map(plato => (
                      <div key={plato.id} className="menu-item-card animate-slide-up">
                        <div className="menu-item-card-content">
                          <h4>{plato.nombre}</h4>
                          <p>{plato.descripcion}</p>
                        </div>
                        <div className="menu-item-card-price">
                          S/ {plato.precio.toFixed(2)}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Map Area */}
      <main className="map-area">
        <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 1000, width: '300px', maxWidth: 'calc(100vw - 80px)' }}>
          <div className="search-container" style={{ margin: 0, boxShadow: 'var(--shadow-lg)' }}>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Buscar platos o locales..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn-search" style={{ padding: '0 16px' }}>
              <Search size={18} />
            </button>
          </div>
        </div>
        <Map 
          restaurantes={filteredRestaurantes} 
          sortOrder={'precioAsc'} 
          onSelectRestaurante={(rest) => {
            if (rest) {
              setSelectedRest(rest);
              setIsMenuOpen(true);
              const firstSection = ['Entradas', 'Platos Fuertes', 'Postres', 'Bebidas'].find(
                sec => rest.menu.some(p => p.seccion === sec)
              );
              setActiveTab(firstSection || '');
            } else {
              setSelectedRest(null);
            }
          }}
        />
      </main>
    </div>
  );
}

export default App;
