export interface Plato {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  seccion: 'Entradas' | 'Platos Fuertes' | 'Bebidas' | 'Postres';
}

export interface Restaurante {
  id: string;
  nombre: string;
  latitud: number;
  longitud: number;
  precio_desde: number;
  foto: string;
  categorias: string[]; 
  categoriaPrincipal: 'Cevicherías y Mariscos' | 'Pollerías' | 'Cafeterías' | 'Pizzas y Pastas' | 'Carnes y Parrillas';
  menu: Plato[];
  calificacion: number;
}

export const CATEGORIAS_PRINCIPALES = [
  { nombre: 'Cevicherías y Mariscos', foto: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', count: 5 },
  { nombre: 'Pollerías', foto: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=600&q=80', count: 4 },
  { nombre: 'Cafeterías', foto: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', count: 4 },
  { nombre: 'Pizzas y Pastas', foto: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80', count: 4 },
  { nombre: 'Carnes y Parrillas', foto: 'https://images.unsplash.com/photo-1544025162-8314520f8c37?auto=format&fit=crop&w=600&q=80', count: 3 }
] as const;

export const mockRestaurantes: Restaurante[] = [
  // Cevicherías
  { 
    id: '1', nombre: 'Cevichería El Norteño', latitud: -7.1620, longitud: -78.5130, precio_desde: 15.00, foto: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80', categorias: ['Ceviche', 'Mariscos'], categoriaPrincipal: 'Cevicherías y Mariscos', 
    calificacion: 1.8, menu: [
      {id: 'm1_1', nombre: 'Tequeños de Pulpa de Cangrejo', descripcion: 'Masa crujiente rellena con cangrejo y salsa golf', precio: 18.00, seccion: 'Entradas'},
      {id: 'm1_2', nombre: 'Leche de Tigre', descripcion: 'Clásica con chicharrón de pota', precio: 15.00, seccion: 'Entradas'},
      {id: 'm1_3', nombre: 'Ceviche Clásico', descripcion: 'Pescado fresco del día con limón y ají limo', precio: 28.00, seccion: 'Platos Fuertes'},
      {id: 'm1_4', nombre: 'Arroz con Mariscos', descripcion: 'Arroz norteño con mixtura de mariscos y parmesano', precio: 32.00, seccion: 'Platos Fuertes'},
      {id: 'm1_5', nombre: 'Chicha Morada Jarrita', descripcion: 'Chicha natural elaborada con maíz morado', precio: 12.00, seccion: 'Bebidas'}
    ] 
  },
  { 
    id: '2', nombre: 'Mariscos del Rey', latitud: -7.1590, longitud: -78.5110, precio_desde: 20.00, foto: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80', categorias: ['Pescados', 'Ceviche'], categoriaPrincipal: 'Cevicherías y Mariscos', 
    calificacion: 4.4, menu: [
      {id: 'm2_1', nombre: 'Chicharrón de Calamar', descripcion: 'Aros crujientes con tártara', precio: 20.00, seccion: 'Entradas'},
      {id: 'm2_2', nombre: 'Ceviche Mixto', descripcion: 'Pescado, pulpo y langostinos', precio: 35.00, seccion: 'Platos Fuertes'},
      {id: 'm2_3', nombre: 'Jalea Real', descripcion: 'Mixtura frita de mariscos y pescado', precio: 45.00, seccion: 'Platos Fuertes'},
      {id: 'm2_4', nombre: 'Limonada Frozen', descripcion: 'Con hierbabuena', precio: 10.00, seccion: 'Bebidas'}
    ] 
  },
  { id: '3', nombre: 'El Muelle 21', latitud: -7.1610, longitud: -78.5080, precio_desde: 18.00, foto: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=300&q=80', categorias: ['Tiraditos', 'Mariscos'], categoriaPrincipal: 'Cevicherías y Mariscos', calificacion: 4.3, menu: [{id: 'm5', nombre: 'Causa Limeña', descripcion: 'Rellena de pulpa de cangrejo', precio: 18.00, seccion: 'Entradas'}, {id: 'm6', nombre: 'Tiradito Tricolor', descripcion: 'Crema de rocoto, ají amarillo y natural', precio: 38.00, seccion: 'Platos Fuertes'}, {id: 'm7', nombre: 'Pisco Sour', descripcion: 'Clásico peruano', precio: 22.00, seccion: 'Bebidas'}] },
  { id: '4', nombre: 'Punto Marino', latitud: -7.1635, longitud: -78.5150, precio_desde: 12.00, foto: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80', categorias: ['Mariscos', 'Sopas'], categoriaPrincipal: 'Cevicherías y Mariscos', calificacion: 1.7, menu: [{id: 'm7', nombre: 'Choritos a la Chalaca', descripcion: 'Docena de choritos frescos', precio: 12.00, seccion: 'Entradas'}, {id: 'm8', nombre: 'Chupe de Pescado', descripcion: 'Sopa concentrada con leche y huevo', precio: 28.00, seccion: 'Platos Fuertes'}] },
  { id: '5', nombre: 'Ceviche y Mar', latitud: -7.1650, longitud: -78.5130, precio_desde: 22.00, foto: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80', categorias: ['Ceviche', 'Premium'], categoriaPrincipal: 'Cevicherías y Mariscos', calificacion: 4.3, menu: [{id: 'm8', nombre: 'Pulpo al Olivo', descripcion: 'Láminas de pulpo bañadas en crema de aceituna', precio: 28.00, seccion: 'Entradas'}, {id: 'm9', nombre: 'Ronda Marina', descripcion: 'Ceviche, arroz con mariscos y chicharrón', precio: 55.00, seccion: 'Platos Fuertes'}] },

  // Pollerías
  { 
    id: '6', nombre: 'Pollería El Gordo', latitud: -7.1625, longitud: -78.5090, precio_desde: 16.00, foto: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=300&q=80', categorias: ['Pollo a la Brasa'], categoriaPrincipal: 'Pollerías', 
    calificacion: 2.2, menu: [
      {id: 'p1_1', nombre: 'Tequeños con Queso', descripcion: 'Porción de 8 con guacamole', precio: 12.00, seccion: 'Entradas'},
      {id: 'p1_2', nombre: '1/4 de Pollo a la Brasa', descripcion: 'Incluye papas fritas y ensalada fresca', precio: 18.00, seccion: 'Platos Fuertes'},
      {id: 'p1_3', nombre: 'Pollo Entero', descripcion: 'Pollo grande, papas familiares y ensalada', precio: 62.00, seccion: 'Platos Fuertes'},
      {id: 'p1_4', nombre: 'Gaseosa 1.5L', descripcion: 'Inca Kola o Coca Cola', precio: 10.00, seccion: 'Bebidas'},
      {id: 'p1_5', nombre: 'Crema Volteada', descripcion: 'Postre de la casa', precio: 8.00, seccion: 'Postres'}
    ] 
  },
  { id: '7', nombre: 'Rokys Cajamarca', latitud: -7.1605, longitud: -78.5140, precio_desde: 18.00, foto: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=300&q=80', categorias: ['Pollo a la Brasa', 'Parrilla'], categoriaPrincipal: 'Pollerías', calificacion: 3.4, menu: [{id: 'm21', nombre: 'Ensalada Mixta', descripcion: 'Lechuga, tomate, palta y pepino', precio: 12.00, seccion: 'Entradas'}, {id: 'm22', nombre: '1/2 Pollo a la Brasa', descripcion: 'Para compartir entre 2', precio: 34.00, seccion: 'Platos Fuertes'}] },
  { id: '8', nombre: 'Pollo Loco', latitud: -7.1645, longitud: -78.5110, precio_desde: 14.00, foto: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80', categorias: ['Broaster', 'Brasa'], categoriaPrincipal: 'Pollerías', calificacion: 3.2, menu: [{id: 'm23', nombre: 'Porción de Salchipapas', descripcion: 'Papas nativas con hot dog', precio: 14.00, seccion: 'Entradas'}, {id: 'm24', nombre: 'Mostrito', descripcion: 'Pollo broaster con arroz chaufa y papas', precio: 22.00, seccion: 'Platos Fuertes'}] },
  { id: '9', nombre: 'Brasas y Leña', latitud: -7.1585, longitud: -78.5125, precio_desde: 20.00, foto: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=300&q=80', categorias: ['Brasa', 'Premium'], categoriaPrincipal: 'Pollerías', calificacion: 4.7, menu: [{id: 'm24', nombre: 'Anticuchos de Corazón', descripcion: '2 palitos con papa dorada', precio: 20.00, seccion: 'Entradas'}, {id: 'm25', nombre: 'Pollo a la Leña', descripcion: 'Cocción lenta con leña de eucalipto', precio: 68.00, seccion: 'Platos Fuertes'}] },

  // Cafeterías
  { 
    id: '10', nombre: 'Café Baños del Inca', latitud: -7.1630, longitud: -78.5160, precio_desde: 8.00, foto: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=300&q=80', categorias: ['Cafetería', 'Postres'], categoriaPrincipal: 'Cafeterías', 
    calificacion: 3.4, menu: [
      {id: 'c1_1', nombre: 'Humitas de Queso', descripcion: 'Tradicional de Cajamarca', precio: 6.00, seccion: 'Entradas'},
      {id: 'c1_2', nombre: 'Sandwich de Chicharrón', descripcion: 'Pan francés, camote frito y sarza criolla', precio: 15.00, seccion: 'Platos Fuertes'},
      {id: 'c1_3', nombre: 'Café Americano', descripcion: 'Grano orgánico de San Ignacio', precio: 8.00, seccion: 'Bebidas'},
      {id: 'c1_4', nombre: 'Torta de Chocolate', descripcion: 'Bizcocho húmedo', precio: 12.00, seccion: 'Postres'}
    ] 
  },
  { id: '11', nombre: 'La Casa del Alfajor', latitud: -7.1615, longitud: -78.5105, precio_desde: 4.50, foto: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80', categorias: ['Postres', 'Café'], categoriaPrincipal: 'Cafeterías', calificacion: 1.3, menu: [{id: 'm25', nombre: 'Alfajor Cajamarquino', descripcion: 'Con manjar blanco', precio: 4.50, seccion: 'Postres'}, {id: 'm26', nombre: 'Empanada de Carne', descripcion: 'Masa hojaldre', precio: 7.00, seccion: 'Entradas'}] },
  { id: '12', nombre: 'Café Plaza', latitud: -7.1600, longitud: -78.5135, precio_desde: 10.00, foto: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80', categorias: ['Café Especial', 'Desayunos'], categoriaPrincipal: 'Cafeterías', calificacion: 2.7, menu: [{id: 'm26', nombre: 'Desayuno Plaza', descripcion: 'Jugo, café, huevos revueltos', precio: 18.00, seccion: 'Platos Fuertes'}, {id: 'm27', nombre: 'Cappuccino', descripcion: 'Clásico italiano', precio: 10.00, seccion: 'Bebidas'}] },
  { id: '13', nombre: 'Churros y Chocolate', latitud: -7.1655, longitud: -78.5145, precio_desde: 6.00, foto: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=300&q=80', categorias: ['Churros', 'Chocolate'], categoriaPrincipal: 'Cafeterías', calificacion: 2.1, menu: [{id: 'm28', nombre: 'Porción Churros (4)', descripcion: 'Rellenos de manjar', precio: 12.00, seccion: 'Postres'}, {id: 'm29', nombre: 'Chocolate Caliente', descripcion: 'Con cacao orgánico', precio: 8.00, seccion: 'Bebidas'}] },

  // Pizzas y Pastas
  { 
    id: '14', nombre: 'Pizzería Los Andes', latitud: -7.1640, longitud: -78.5180, precio_desde: 25.00, foto: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80', categorias: ['Italiana', 'Pizza'], categoriaPrincipal: 'Pizzas y Pastas', 
    calificacion: 4.5, menu: [
      {id: 'pi1_1', nombre: 'Pan al Ajo Especial', descripcion: 'Con queso derretido', precio: 14.00, seccion: 'Entradas'},
      {id: 'pi1_2', nombre: 'Pizza Cajamarquina Familiar', descripcion: 'Cecina, queso andino y aceitunas', precio: 45.00, seccion: 'Platos Fuertes'},
      {id: 'pi1_3', nombre: 'Raviolis de Carne', descripcion: 'Bañados en salsa boloñesa', precio: 28.00, seccion: 'Platos Fuertes'},
      {id: 'pi1_4', nombre: 'Vino Tinto Copa', descripcion: 'Malbec Reserva', precio: 18.00, seccion: 'Bebidas'},
      {id: 'pi1_5', nombre: 'Tiramisú', descripcion: 'Receta casera', precio: 15.00, seccion: 'Postres'}
    ] 
  },
  { id: '15', nombre: 'Luigis Pasta', latitud: -7.1622, longitud: -78.5122, precio_desde: 20.00, foto: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=300&q=80', categorias: ['Pastas', 'Lasagna'], categoriaPrincipal: 'Pizzas y Pastas', calificacion: 3.8, menu: [{id: 'm29', nombre: 'Fettuccine Alfredo', descripcion: 'Con jamón y champiñones', precio: 25.00, seccion: 'Platos Fuertes'}, {id: 'm30', nombre: 'Bruschettas', descripcion: 'Tomate y albahaca fresca', precio: 16.00, seccion: 'Entradas'}] },
  { id: '16', nombre: 'La Romana', latitud: -7.1670, longitud: -78.5155, precio_desde: 30.00, foto: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=300&q=80', categorias: ['Pizza a la leña'], categoriaPrincipal: 'Pizzas y Pastas', calificacion: 4.0, menu: [{id: 'm31', nombre: 'Pizza Hawaiana Familiar', descripcion: 'A la leña', precio: 42.00, seccion: 'Platos Fuertes'}] },
  { id: '17', nombre: 'Rincon del Queso', latitud: -7.1602, longitud: -78.5165, precio_desde: 18.00, foto: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=300&q=80', categorias: ['Pastas', 'Quesos'], categoriaPrincipal: 'Pizzas y Pastas', calificacion: 2.0, menu: [{id: 'm32', nombre: 'Mac & Cheese', descripcion: 'Mixtura de quesos', precio: 22.00, seccion: 'Platos Fuertes'}, {id: 'm33', nombre: 'Tequeños 4 Quesos', descripcion: 'Con salsa de ajo', precio: 18.00, seccion: 'Entradas'}] },

  // Carnes y Parrillas
  { 
    id: '18', nombre: 'Parrilladas El Rancho', latitud: -7.1600, longitud: -78.5080, precio_desde: 45.00, foto: 'https://images.unsplash.com/photo-1544025162-8314520f8c37?auto=format&fit=crop&w=300&q=80', categorias: ['Parrilla', 'Carnes'], categoriaPrincipal: 'Carnes y Parrillas', 
    calificacion: 3.7, menu: [
      {id: 'ca1_1', nombre: 'Chorizo Parrillero (2)', descripcion: 'Acompañado de papa sancochada', precio: 16.00, seccion: 'Entradas'},
      {id: 'ca1_2', nombre: 'Bife Ancho', descripcion: 'Corte premium de res (350g) término medio', precio: 55.00, seccion: 'Platos Fuertes'},
      {id: 'ca1_3', nombre: 'Parrilla Mixta 2 personas', descripcion: 'Res, pollo, cerdo, chorizos', precio: 95.00, seccion: 'Platos Fuertes'},
      {id: 'ca1_4', nombre: 'Limonada de Hierba Luisa', descripcion: 'Jarra de litro', precio: 15.00, seccion: 'Bebidas'}
    ] 
  },
  { id: '19', nombre: 'Asador Cajamarquino', latitud: -7.1642, longitud: -78.5115, precio_desde: 35.00, foto: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80', categorias: ['Cuy', 'Carnes'], categoriaPrincipal: 'Carnes y Parrillas', calificacion: 1.2, menu: [{id: 'm33', nombre: 'Cuy Frito', descripcion: 'Con picante de papa', precio: 38.00, seccion: 'Platos Fuertes'}, {id: 'm34', nombre: 'Chicharrón de Cerdo', descripcion: 'Con mote y zarza', precio: 32.00, seccion: 'Platos Fuertes'}] },
  { id: '20', nombre: 'Steak House', latitud: -7.1595, longitud: -78.5095, precio_desde: 50.00, foto: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=300&q=80', categorias: ['Carnes Premium'], categoriaPrincipal: 'Carnes y Parrillas', calificacion: 4.7, menu: [{id: 'm34', nombre: 'Picaña Angus', descripcion: 'Corte de 400g', precio: 75.00, seccion: 'Platos Fuertes'}, {id: 'm35', nombre: 'Provoleta', descripcion: 'Queso provolone fundido con chimichurri', precio: 25.00, seccion: 'Entradas'}] }
];

export const fetchRestaurantes = async (categoria?: string): Promise<Restaurante[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = mockRestaurantes;
      if (categoria) {
        results = results.filter(r => r.categoriaPrincipal === categoria);
      }
      resolve(results);
    }, 400);
  });
};
