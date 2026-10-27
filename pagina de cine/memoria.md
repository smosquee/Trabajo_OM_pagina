# Memoria del Proyecto - Club de Cine

Este documento es el registro vivo del desarrollo del sitio web para el Club de Cine. Documenta las decisiones arquitectónicas, las tareas completadas, las pendientes y notas clave para el mantenimiento del proyecto.

---

## 1. Decisiones Tomadas

- **Nombre y Concepto**: Se define el nombre del club como **"CineClub Lumière"**, con el lema *"El refugio del buen cine"*, evocando la pasión por los clásicos, el cine de autor y el cine de culto contemporáneo.
- **Stack Tecnológico**: Se adopta estrictamente **HTML5 semántico, CSS3 moderno y Vanilla JavaScript (ES6+)**, sin frameworks ni librerías externas de JS o CSS, garantizando velocidad de carga y total control del código.
- **Paleta de Colores en `:root`**:
  - Base oscura: Negro profundo (`#0b0b0e`) y tonalidades de grafito (`#15151e`, `#1e1e29`) que simulan la atmósfera de una sala de cine a oscuras.
  - Color principal: Bordó / Borgoña (`#7a0c24`, `#9b1b36`) aportando calidez, elegancia y teatralidad clásica de butacas y cortinados de cine.
  - Color de acento: Rosado brillante / Fucsia neón (`#ff3377`, `#ff6699`) para botones, llamadas a la acción (CTA), estados activos y resaltados de navegación.
  - Colores de soporte: Blanco puro (`#ffffff`) y gris suave (`#e2e2ec`) para tipografía con contraste accesible (WCAG AA).
- **Tipografías (Google Fonts)**:
  - Títulos: **`Playfair Display`** o **`Cinzel`**, transmitiendo distinción editorial y póster clásico de cine.
  - Textos y UI: **`Inter`** o **`Plus Jakarta Sans`**, garantizando máxima legibilidad en descripciones y formularios.
- **Estructura de Datos**: Las funciones se modelan como un array de objetos en `script.js` con las propiedades: `id`, `titulo`, `genero`, `fecha`, `horario`, `descripcion`, `imagen` y `entradasDisponibles`. Esto permite renderizar dinámicamente las tarjetas de la cartelera y el menú desplegable del formulario de compra.
- **Gestión de Entradas y Stock**: Cada reserva confirmada descuenta inmediatamente las entradas del array en memoria y actualiza tanto la tarjeta de la película como la opción correspondiente en el `<select>` y el contador de stock.
- **Accesibilidad e Iconografía**: Los íconos de redes sociales y símbolos de cine se implementan mediante **SVG inline limpios y optimizados**, evitando dependencias de icon-fonts externas que puedan fallar sin conexión a internet y asegurando control total sobre el color y tamaño.

---

## 2. Tareas Hechas

- [x] Configuración inicial y análisis de requerimientos del proyecto.
- [x] Creación del archivo `agente.md` con roles, directrices y convenciones.
- [x] Creación del archivo `memoria.md` como bitácora viva del proyecto.
- [x] Diseño y estructura semántica de `index.html` (Hero, Cartelera dinámica, Formulario de reservas, Contacto y Redes, Footer, Menú responsive accesible).
- [x] Elaboración de la hoja de estilos `styles.css` con variables CSS en `:root`, sistema de grilla/flexbox, paleta negro/bordó/rosado, efectos hover y diseño adaptativo (*mobile-first* y escritorio).
- [x] Implementación de `script.js` con array de 6 películas de ejemplo, renderizado dinámico de tarjetas, selector sincronizado, navegación fluida, validación campo por campo y generación de comprobante de reserva con descuento de entradas.

---

## 3. Tareas Pendientes

- [ ] (Opcional futuro) Integración con almacenamiento persistente local (`localStorage`) para que el stock de entradas se conserve entre recargas de la página.
- [ ] (Opcional futuro) Filtro de películas por género o por fecha en la sección de cartelera.
- [ ] (Opcional futuro) Función para descargar o imprimir el comprobante de la reserva en formato ticket o PDF.
- [ ] (Opcional futuro) Selector gráfico interactivo de butacas de la sala.

---

## 4. Notas Importantes

- **Reemplazo de Imágenes**: Las imágenes de las películas utilizan fotografías cinematográficas curadas de Unsplash con proporciones verticales de póster. En `script.js` se incluyen comentarios detallados señalando la propiedad `imagen:` de cada película para que puedan ser reemplazadas por archivos locales (ej. `img/cinema-paradiso.jpg`) o URLs propias.
- **Reglas de Validación**:
  - Nombre: mínimo 3 caracteres, sólo letras y espacios.
  - Correo electrónico: validación mediante expresión regular estándar (`user@domain.ext`).
  - Teléfono: mínimo 8 dígitos, permite prefijo internacional `+`, guiones y espacios.
  - Cantidad: número entero mayor a 0 y menor o igual a las entradas disponibles para la función seleccionada. Si una película agota sus entradas (`entradasDisponibles === 0`), el botón de la tarjeta se deshabilita y se indica visualmente "Agotado".
