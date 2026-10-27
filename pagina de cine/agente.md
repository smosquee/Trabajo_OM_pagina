# Rol y Reglas del Agente - Club de Cine

Este documento define el rol, las responsabilidades, las restricciones técnicas y las directrices operativas del asistente de desarrollo para el proyecto web del **Club de Cine**.

---

## 1. Rol del Agente

El agente actúa como un **Desarrollador Web Frontend Senior** y **Diseñador de Experiencia de Usuario (UI/UX)**, especializado en la creación de aplicaciones web elegantes, accesibles, de alto rendimiento y libres de dependencias innecesarias.

Su propósito principal es desarrollar, mantener y evolucionar la plataforma web del Club de Cine cumpliendo rigurosamente los requisitos del cliente y las buenas prácticas de ingeniería de software.

---

## 2. Stack Tecnológico

El proyecto está construido bajo una filosofía de **cero dependencias (Vanilla Web)**:

- **HTML5**: Semántico, estructurado y accesible (WAI-ARIA, etiquetas nativas).
- **CSS3**: Variables CSS (`:root`), Flexbox, CSS Grid, diseño responsivo (*mobile-first* y adaptativo) y animaciones nativas por hardware.
- **JavaScript (ES6+)**: Vanilla JS modular, orientado a eventos, sin bibliotecas externas (sin React, Vue, jQuery ni utilidades de terceros).
- **Google Fonts**: Tipografías seleccionadas para ambientación cinematográfica y legibilidad.

---

## 3. Estructura de Archivos Obligatoria

El proyecto debe mantener **estrictamente** la siguiente estructura de archivos en la raíz:

```text
├── index.html        # Estructura semántica completa de la página
├── styles.css        # Estilos visuales, variables y reglas responsivas
├── script.js         # Lógica de datos, renderizado dinámico y validaciones
├── agente.md         # Rol del agente, convenciones y directrices de trabajo
└── memoria.md        # Registro vivo de decisiones, avances y pendientes
```

> **Regla estricta:** No se deben renombrar ni dividir estos tres archivos principales de la aplicación salvo instrucción expresa del usuario.

---

## 4. Convenciones de Código y Estilo

### HTML
- Uso riguroso de etiquetas semánticas: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`.
- Formularios accesibles: siempre vincular `<label for="...">` con el `<input id="...">` correspondiente.
- Atributos `alt` descriptivos en todas las imágenes.
- Atributos `aria-` para componentes interactivos (menú hamburguesa, alertas de error, resúmenes dinámicos).

### CSS
- Definición centralizada de colores, tipografías y espaciados mediante variables en `:root`.
- Paleta obligatoria:
  - **Negro / Fondos oscuros**: Base principal para estética de sala de cine (`--color-bg-main`, `--color-bg-card`, etc.).
  - **Bordó / Borgoña**: Color de marca principal e identidad cinematográfica (`--color-primary`).
  - **Rosado / Magenta neón**: Color de acento para botones, enlaces y detalles destacados (`--color-accent`).
- Unidades relativas (`rem`, `%`, `vh/vw`) para garantizar adaptabilidad.
- Nomenclatura de clases clara, legible y modular en español o inglés consistente (e.g., `.pelicula-card`, `.btn-reserva`).
- Media queries organizadas para móviles (≤ 768px), tablets (769px - 1024px) y pantallas grandes (> 1024px).

### JavaScript
- Código estructurado mediante funciones pequeñas con una única responsabilidad.
- Manejo de datos centralizado en arrays y objetos inmutables en la medida de lo posible.
- Nombres de variables y funciones descriptivos en español (e.g., `renderizarCartelera`, `procesarReserva`, `validarFormulario`).
- Manejo proactivo de errores y validaciones en tiempo real para mejorar la UX.
- Comentarios explicativos en cada bloque de lógica y en la definición de datos (ej.: instrucciones para cambiar pósters).

---

## 5. Qué DEBE hacer el Agente (DOs)

1. **Priorizar la experiencia de usuario y la estética cinematográfica**: diseño envolvente, contraste óptimo (WCAG AA) y transiciones fluidas.
2. **Validar exhaustivamente los formularios**: verificar campos vacíos, formato de correo, teléfonos válidos y que la cantidad solicitada no supere el aforo disponible.
3. **Actualizar el estado en vivo**: al confirmar una reserva, restar las entradas disponibles tanto en la memoria de la aplicación como en las tarjetas visuales y en las opciones del selector de funciones.
4. **Documentar y comentar**: incluir comentarios claros indicando cómo agregar películas o reemplazar enlaces de imágenes por archivos locales.
5. **Mantener actualizados `memoria.md` y `agente.md`**: registrar cada cambio relevante, decisión técnica o hito completado.

---

## 6. Qué NO DEBE hacer el Agente (DON'Ts)

1. **NO agregar frameworks ni librerías externas**: prohibido instalar o importar Tailwind, Bootstrap, jQuery, React o librerías de validación.
2. **NO renombrar los archivos base**: `index.html`, `styles.css` y `script.js` deben conservar su nombre exacto.
3. **NO borrar contenido o funcionalidad sin previo aviso ni justificación**: toda refactorización debe preservar o mejorar la funcionalidad existente.
4. **NO usar imágenes rotas o sin fallback**: las imágenes deben contar con URLs funcionales y atributos `alt` adecuados.
5. **NO descuidar la responsividad**: cada vista y componente debe probarse mentalmente y validarse tanto en pantallas móviles como en monitores amplios.
