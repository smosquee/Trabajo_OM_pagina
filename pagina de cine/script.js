/**
 * ==============================================================================
 * CINECLUB LUMIÈRE - SCRIPT PRINCIPAL
 * ==============================================================================
 * Stack: JavaScript Puro (ES6+) sin frameworks ni librerías externas.
 * 
 * Contenido:
 * 1. Array de películas (datos de funciones y entradas disponibles).
 * 2. Renderizado dinámico de tarjetas de cartelera y selector de funciones.
 * 3. Preselección de función y desplazamiento suave desde tarjetas.
 * 4. Validación de campos en tiempo real y al enviar formulario.
 * 5. Procesamiento de reserva, descuento de entradas y comprobante tipo ticket.
 * 6. Menú responsivo (hamburguesa) y efectos de navegación.
 * ==============================================================================
 */

// Se ejecuta una vez que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. ARRAY DE DATOS: FUNCIONES Y PELÍCULAS DEL CLUB
     ========================================================================== */
  /**
   * INSTRUCCIONES PARA AGREGAR O MODIFICAR PELÍCULAS:
   * - Para añadir una película, copia un objeto del array y asígnale un `id` único.
   * - Para reemplazar la imagen por una local, guarda tu archivo en una carpeta
   *   (ej: "imagenes/mi-pelicula.jpg") y cambia el valor de la propiedad `imagen`.
   * - `entradasDisponibles` controla el aforo máximo de la sala para esa función.
   */
  const peliculas = [
    {
      id: 1,
      titulo: "Cinema Paradiso",
      genero: "Drama / Clásico",
      fecha: "Jueves 12 de Noviembre",
      horario: "20:00 hs",
      descripcion: "Una inolvidable oda de Giuseppe Tornatore al amor por las salas de cine, la nostalgia de la infancia y la entrañable amistad entre el pequeño Totò y el proyeccionista Alfredo.",
      // REEMPLAZAR AQUÍ POR RUTA LOCAL O PÓSTER PROPIO: ej. 'img/cinema-paradiso.jpg'
      imagen: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=900&q=80",
      entradasDisponibles: 18
    },
    {
      id: 2,
      titulo: "Blade Runner 2049",
      genero: "Ciencia Ficción / Neo-Noir",
      fecha: "Viernes 13 de Noviembre",
      horario: "22:30 hs",
      descripcion: "Denis Villeneuve expande el universo distópico con una prodigiosa fotografía de Roger Deakins y una reflexión profunda sobre la memoria, la identidad humana y la soledad.",
      // REEMPLAZAR AQUÍ POR RUTA LOCAL O PÓSTER PROPIO: ej. 'img/blade-runner-2049.jpg'
      imagen: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80",
      entradasDisponibles: 8
    },
    {
      id: 3,
      titulo: "El Viaje de Chihiro",
      genero: "Animación / Fantasía",
      fecha: "Sábado 14 de Noviembre",
      horario: "18:00 hs",
      descripcion: "La obra maestra de Hayao Miyazaki y Studio Ghibli. Una aventura poética y visualmente asombrosa sobre la valentía, el crecimiento personal y el folklore espiritual japonés.",
      // REEMPLAZAR AQUÍ POR RUTA LOCAL O PÓSTER PROPIO: ej. 'img/chihiro.jpg'
      imagen: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=900&q=80",
      entradasDisponibles: 24
    },
    {
      id: 4,
      titulo: "Pulp Fiction",
      genero: "Crimen / Cine de Culto",
      fecha: "Sábado 14 de Noviembre",
      horario: "21:30 hs",
      descripcion: "El clásico que redefinió los años 90 de la mano de Quentin Tarantino. Narrativa no lineal, diálogos legendarios y una banda sonora icónica en una función especial de medianoche.",
      // REEMPLAZAR AQUÍ POR RUTA LOCAL O PÓSTER PROPIO: ej. 'img/pulp-fiction.jpg'
      imagen: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
      entradasDisponibles: 12
    },
    {
      id: 5,
      titulo: "Amélie",
      genero: "Comedia Romántica / Cine Francés",
      fecha: "Domingo 15 de Noviembre",
      horario: "19:00 hs",
      descripcion: "Jean-Pierre Jeunet nos sumerge en un París mágico y lleno de pequeños placeres cotidianos a través de los ojos de una joven soñadora decidida a cambiar la vida de quienes la rodean.",
      // REEMPLAZAR AQUÍ POR RUTA LOCAL O PÓSTER PROPIO: ej. 'img/amelie.jpg'
      imagen: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=900&q=80",
      entradasDisponibles: 5
    },
    {
      id: 6,
      titulo: "Interstellar",
      genero: "Ciencia Ficción / Aventura",
      fecha: "Domingo 15 de Noviembre",
      horario: "21:45 hs",
      descripcion: "Christopher Nolan viaja más allá de los confines de la galaxia en busca de un nuevo hogar para la humanidad, acompañado por la monumental banda sonora compuesta por Hans Zimmer.",
      // REEMPLAZAR AQUÍ POR RUTA LOCAL O PÓSTER PROPIO: ej. 'img/interstellar.jpg'
      imagen: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
      entradasDisponibles: 15
    }
  ];

  /* ==========================================================================
     2. REFERENCIAS A ELEMENTOS DEL DOM
     ========================================================================== */
  // Navegación
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Cartelera
  const peliculasGrid = document.getElementById('peliculas-grid');

  // Formulario de reserva
  const formReserva = document.getElementById('form-reserva');
  const selectFuncion = document.getElementById('select-funcion');
  const inputCantidad = document.getElementById('input-cantidad');
  const btnDecrementar = document.getElementById('btn-decrementar');
  const btnIncrementar = document.getElementById('btn-incrementar');
  const inputNombre = document.getElementById('input-nombre');
  const inputEmail = document.getElementById('input-email');
  const inputTelefono = document.getElementById('input-telefono');
  const stockInfo = document.getElementById('stock-info');
  const reservaCard = document.querySelector('.reserva-card');

  // Mensajes de error
  const errorFuncion = document.getElementById('error-funcion');
  const errorCantidad = document.getElementById('error-cantidad');
  const errorNombre = document.getElementById('error-nombre');
  const errorEmail = document.getElementById('error-email');
  const errorTelefono = document.getElementById('error-telefono');

  // Panel lateral y ticket resumen
  const reservaInfoCard = document.getElementById('reserva-info-card');
  const ticketConfirmado = document.getElementById('ticket-confirmado');
  const resumenCodigo = document.getElementById('resumen-codigo');
  const resumenPelicula = document.getElementById('resumen-pelicula');
  const resumenFechaHora = document.getElementById('resumen-fecha-hora');
  const resumenCantidad = document.getElementById('resumen-cantidad');
  const resumenTitular = document.getElementById('resumen-titular');
  const resumenEmail = document.getElementById('resumen-email');
  const resumenTelefono = document.getElementById('resumen-telefono');
  const btnNuevaReserva = document.getElementById('btn-nueva-reserva');


  /* ==========================================================================
     3. RENDERIZADO DINÁMICO DE PELÍCULAS Y SELECTOR
     ========================================================================== */

  /**
   * Genera el HTML de las tarjetas de películas en la cartelera
   */
  function renderizarCartelera() {
    peliculasGrid.innerHTML = '';

    peliculas.forEach(pelicula => {
      // Estado de stock para badge
      let stockClase = 'disponible';
      let stockTexto = `${pelicula.entradasDisponibles} entradas`;

      if (pelicula.entradasDisponibles === 0) {
        stockClase = 'agotado';
        stockTexto = 'Agotado';
      } else if (pelicula.entradasDisponibles <= 5) {
        stockClase = 'pocos';
        stockTexto = `¡Últimas ${pelicula.entradasDisponibles}!`;
      }

      // Creación del elemento tarjeta
      const card = document.createElement('article');
      card.className = 'pelicula-card';
      card.setAttribute('data-id', pelicula.id);

      card.innerHTML = `
        <div class="pelicula-poster-wrapper">
          <img 
            src="${pelicula.imagen}" 
            alt="Póster oficial de la película ${pelicula.titulo}" 
            class="pelicula-poster" 
            loading="lazy"
            onerror="this.onerror=null; this.src='data:image/svg+xml;charset=UTF-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22600%22 height=%22375%22 viewBox=%220 0 600 375%22%3E%3Crect fill=%22%23181822%22 width=%22600%22 height=%22375%22/%3E%3Ctext fill=%22%23ff3377%22 font-family=%22sans-serif%22 font-size=%2222%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3E🎬 ${encodeURIComponent(pelicula.titulo)}%3C/text%3E%3C/svg%3E';"
          >
          <div class="pelicula-poster-overlay"></div>
          <span class="pelicula-badge-genero">${pelicula.genero}</span>
          <span class="pelicula-stock-tag ${stockClase}" id="card-stock-${pelicula.id}">${stockTexto}</span>
        </div>
        <div class="pelicula-body">
          <h3 class="pelicula-title">${pelicula.titulo}</h3>
          <div class="pelicula-meta">
            <span class="meta-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
              </svg>
              ${pelicula.fecha}
            </span>
            <span class="meta-item">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
              ${pelicula.horario}
            </span>
          </div>
          <p class="pelicula-desc">${pelicula.descripcion}</p>
          <div class="pelicula-footer">
            <button 
              type="button" 
              class="btn btn-primary btn-block btn-sacar-entradas" 
              data-id="${pelicula.id}"
              ${pelicula.entradasDisponibles === 0 ? 'disabled' : ''}
              aria-label="Sacar entradas para ${pelicula.titulo}"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M22 10V6c0-1.11-.9-2-2-2H4c-1.1 0-1.99.89-1.99 2v4c1.1 0 1.99.9 1.99 2s-.89 2-2 2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-4c-1.1 0-2-.9-2-2s.9-2 2-2zm-2-1.5c-1.25.78-2 2.17-2 3.5s.75 2.72 2 3.5V18H4v-2.5c1.25-.78 2-2.17 2-3.5s-.75-2.72-2-3.5V6h16v2.5z"/>
              </svg>
              <span>${pelicula.entradasDisponibles === 0 ? 'Función Agotada' : 'Sacar entradas'}</span>
            </button>
          </div>
        </div>
      `;

      peliculasGrid.appendChild(card);
    });

    // Conectar eventos de los botones "Sacar entradas" de las tarjetas
    const botonesSacarEntradas = document.querySelectorAll('.btn-sacar-entradas');
    botonesSacarEntradas.forEach(boton => {
      boton.addEventListener('click', (e) => {
        const idSeleccionado = parseInt(e.currentTarget.getAttribute('data-id'), 10);
        seleccionarPeliculaEnFormulario(idSeleccionado);
      });
    });
  }

  /**
   * Llena las opciones del menú desplegable (<select>) del formulario
   * @param {number|null} idSeleccionar - ID de película a dejar preseleccionada
   */
  function poblarSelectFunciones(idSeleccionar = null) {
    selectFuncion.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.disabled = true;
    defaultOption.selected = !idSeleccionar;
    defaultOption.textContent = '— Elegí una película disponible —';
    selectFuncion.appendChild(defaultOption);

    peliculas.forEach(pelicula => {
      const option = document.createElement('option');
      option.value = pelicula.id;

      if (pelicula.entradasDisponibles === 0) {
        option.textContent = `${pelicula.titulo} — (${pelicula.fecha} ${pelicula.horario}) [AGOTADO]`;
        option.disabled = true;
      } else {
        option.textContent = `${pelicula.titulo} — (${pelicula.fecha} ${pelicula.horario}) [${pelicula.entradasDisponibles} disp.]`;
      }

      if (idSeleccionar && pelicula.id === idSeleccionar) {
        option.selected = true;
      }

      selectFuncion.appendChild(option);
    });
  }

  /**
   * Preselecciona una película en el formulario y realiza scroll suave hacia la sección
   * @param {number} peliculaId - ID de la película elegida
   */
  function seleccionarPeliculaEnFormulario(peliculaId) {
    const pelicula = peliculas.find(p => p.id === peliculaId);
    if (!pelicula || pelicula.entradasDisponibles === 0) return;

    // Preseleccionar en el dropdown
    selectFuncion.value = peliculaId;
    actualizarInfoStock();
    limpiarError(errorFuncion, selectFuncion);

    // Ajustar max del input cantidad según aforo
    inputCantidad.max = pelicula.entradasDisponibles;
    if (parseInt(inputCantidad.value, 10) > pelicula.entradasDisponibles) {
      inputCantidad.value = pelicula.entradasDisponibles;
    }

    // Scroll suave hacia la sección de reserva
    const seccionEntradas = document.getElementById('entradas');
    if (seccionEntradas) {
      seccionEntradas.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Resaltar visualmente el formulario para llamar la atención del usuario
    if (reservaCard) {
      reservaCard.classList.add('highlight-focus');
      setTimeout(() => {
        reservaCard.classList.remove('highlight-focus');
      }, 1600);
    }
  }

  /**
   * Actualiza el texto con la disponibilidad de butacas según la función seleccionada
   */
  function actualizarInfoStock() {
    const peliculaId = parseInt(selectFuncion.value, 10);
    const pelicula = peliculas.find(p => p.id === peliculaId);

    if (!pelicula) {
      stockInfo.textContent = '';
      stockInfo.className = 'stock-info';
      return;
    }

    inputCantidad.max = pelicula.entradasDisponibles;

    if (pelicula.entradasDisponibles === 0) {
      stockInfo.textContent = '❌ Función completamente agotada para esta fecha.';
      stockInfo.className = 'stock-info danger';
      inputCantidad.value = 0;
      inputCantidad.disabled = true;
    } else if (pelicula.entradasDisponibles <= 5) {
      stockInfo.textContent = `⚠️ ¡Atención! Solo quedan ${pelicula.entradasDisponibles} butacas disponibles para esta función.`;
      stockInfo.className = 'stock-info warning';
      inputCantidad.disabled = false;
      if (parseInt(inputCantidad.value, 10) < 1) inputCantidad.value = 1;
    } else {
      stockInfo.textContent = `✓ Hay ${pelicula.entradasDisponibles} butacas disponibles. ¡Elegí la cantidad que desees!`;
      stockInfo.className = 'stock-info success';
      inputCantidad.disabled = false;
      if (parseInt(inputCantidad.value, 10) < 1) inputCantidad.value = 1;
    }
  }

  // Evento al cambiar manualmente la película en el selector
  selectFuncion.addEventListener('change', () => {
    actualizarInfoStock();
    limpiarError(errorFuncion, selectFuncion);
  });


  /* ==========================================================================
     4. CONTROLADORES DEL CAMPO DE CANTIDAD (+ / -)
     ========================================================================== */
  btnDecrementar.addEventListener('click', () => {
    let valorActual = parseInt(inputCantidad.value, 10) || 1;
    if (valorActual > 1) {
      inputCantidad.value = valorActual - 1;
      limpiarError(errorCantidad, inputCantidad);
    }
  });

  btnIncrementar.addEventListener('click', () => {
    let valorActual = parseInt(inputCantidad.value, 10) || 0;
    const maxPermitido = parseInt(inputCantidad.max, 10) || 10;
    if (valorActual < maxPermitido) {
      inputCantidad.value = valorActual + 1;
      limpiarError(errorCantidad, inputCantidad);
    }
  });

  inputCantidad.addEventListener('input', () => {
    limpiarError(errorCantidad, inputCantidad);
  });


  /* ==========================================================================
     5. VALIDACIÓN DEL FORMULARIO DE RESERVA
     ========================================================================== */

  /**
   * Muestra un mensaje de error y resalta el campo afectado
   */
  function mostrarError(elementoError, elementoInput, mensaje) {
    elementoError.textContent = mensaje;
    elementoError.classList.add('active');
    elementoInput.classList.add('input-error');
  }

  /**
   * Limpia el mensaje de error y remueve el estado de error del campo
   */
  function limpiarError(elementoError, elementoInput) {
    elementoError.textContent = '';
    elementoError.classList.remove('active');
    elementoInput.classList.remove('input-error');
  }

  // Limpiar errores en tiempo real al escribir
  inputNombre.addEventListener('input', () => limpiarError(errorNombre, inputNombre));
  inputEmail.addEventListener('input', () => limpiarError(errorEmail, inputEmail));
  inputTelefono.addEventListener('input', () => limpiarError(errorTelefono, inputTelefono));

  /**
   * Valida exhaustivamente cada campo del formulario
   * @returns {boolean} true si todos los campos son válidos, false si hay errores
   */
  function validarFormulario() {
    let esValido = true;

    // 1. Validar selección de película
    const peliculaId = parseInt(selectFuncion.value, 10);
    const pelicula = peliculas.find(p => p.id === peliculaId);

    if (!selectFuncion.value || isNaN(peliculaId) || !pelicula) {
      mostrarError(errorFuncion, selectFuncion, 'Por favor, selecciona una película y función.');
      esValido = false;
    } else if (pelicula.entradasDisponibles <= 0) {
      mostrarError(errorFuncion, selectFuncion, 'Esta función está agotada. Elige otra película.');
      esValido = false;
    } else {
      limpiarError(errorFuncion, selectFuncion);
    }

    // 2. Validar cantidad de entradas
    const cantidad = parseInt(inputCantidad.value, 10);
    if (isNaN(cantidad) || cantidad < 1) {
      mostrarError(errorCantidad, inputCantidad, 'La cantidad mínima de entradas es 1.');
      esValido = false;
    } else if (pelicula && cantidad > pelicula.entradasDisponibles) {
      mostrarError(
        errorCantidad, 
        inputCantidad, 
        `No puedes solicitar más de ${pelicula.entradasDisponibles} entradas disponibles para esta función.`
      );
      esValido = false;
    } else {
      limpiarError(errorCantidad, inputCantidad);
    }

    // 3. Validar Nombre y Apellido
    const nombreValor = inputNombre.value.trim();
    if (!nombreValor) {
      mostrarError(errorNombre, inputNombre, 'Ingresa tu nombre y apellido.');
      esValido = false;
    } else if (nombreValor.length < 3) {
      mostrarError(errorNombre, inputNombre, 'El nombre debe tener al menos 3 caracteres.');
      esValido = false;
    } else {
      limpiarError(errorNombre, inputNombre);
    }

    // 4. Validar Correo Electrónico con expresión regular
    const emailValor = inputEmail.value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailValor) {
      mostrarError(errorEmail, inputEmail, 'Ingresa tu correo electrónico.');
      esValido = false;
    } else if (!regexEmail.test(emailValor)) {
      mostrarError(errorEmail, inputEmail, 'Ingresa un correo electrónico con formato válido (ej: usuario@correo.com).');
      esValido = false;
    } else {
      limpiarError(errorEmail, inputEmail);
    }

    // 5. Validar Teléfono de contacto
    const telefonoValor = inputTelefono.value.trim();
    // Permite formato internacional, paréntesis, guiones y espacios, exigiendo al menos 7 dígitos numéricos
    const soloDigitos = telefonoValor.replace(/\D/g, '');
    if (!telefonoValor) {
      mostrarError(errorTelefono, inputTelefono, 'Ingresa un teléfono de contacto.');
      esValido = false;
    } else if (soloDigitos.length < 7 || soloDigitos.length > 15) {
      mostrarError(errorTelefono, inputTelefono, 'Ingresa un número telefónico válido (entre 7 y 15 dígitos).');
      esValido = false;
    } else {
      limpiarError(errorTelefono, inputTelefono);
    }

    return esValido;
  }


  /* ==========================================================================
     6. PROCESAMIENTO Y CONFIRMACIÓN DE RESERVA
     ========================================================================== */

  /**
   * Genera un código de reserva aleatorio con formato cinéfilo
   */
  function generarCodigoReserva() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `#LUM-${randomNum}`;
  }

  // Manejo del evento de envío del formulario
  formReserva.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validar formulario completo
    if (!validarFormulario()) {
      return;
    }

    // Obtener datos
    const peliculaId = parseInt(selectFuncion.value, 10);
    const cantidadSolicitada = parseInt(inputCantidad.value, 10);
    const nombre = inputNombre.value.trim();
    const email = inputEmail.value.trim();
    const telefono = inputTelefono.value.trim();

    // Buscar película y descontar entradas
    const pelicula = peliculas.find(p => p.id === peliculaId);
    if (!pelicula) return;

    pelicula.entradasDisponibles -= cantidadSolicitada;

    // Actualizar la vista de cartelera y selector con el nuevo aforo
    renderizarCartelera();
    poblarSelectFunciones(pelicula.id);
    actualizarInfoStock();

    // Llenar el comprobante tipo ticket con el resumen de la reserva
    const codigoGenerado = generarCodigoReserva();
    resumenCodigo.textContent = codigoGenerado;
    resumenPelicula.textContent = pelicula.titulo;
    resumenFechaHora.textContent = `${pelicula.fecha} a las ${pelicula.horario}`;
    resumenCantidad.textContent = `${cantidadSolicitada} ${cantidadSolicitada === 1 ? 'butaca' : 'butacas'}`;
    resumenTitular.textContent = nombre;
    resumenEmail.textContent = email;
    resumenTelefono.textContent = telefono;

    // Alternar visibilidad de paneles (ocultar info informativa y mostrar ticket)
    reservaInfoCard.style.display = 'none';
    ticketConfirmado.style.display = 'block';

    // Desplazar suavemente hacia el ticket de confirmación para que el usuario lo vea de inmediato
    ticketConfirmado.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Limpiar el formulario
    formReserva.reset();
    inputCantidad.value = 1;
    selectFuncion.value = '';
    stockInfo.textContent = '';
  });

  // Botón "Sacar otra entrada" dentro del ticket de confirmación
  btnNuevaReserva.addEventListener('click', () => {
    ticketConfirmado.style.display = 'none';
    reservaInfoCard.style.display = 'block';
    
    // Enfocar nuevamente el formulario
    selectFuncion.focus();
    selectFuncion.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });


  /* ==========================================================================
     7. MENÚ RESPONSIVO (HAMBURGUESA) Y NAVEGACIÓN
     ========================================================================== */

  // Abrir / Cerrar menú en móviles
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  // Cerrar menú móvil al hacer clic en cualquier enlace
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Cerrar menú móvil si se hace clic fuera de él
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // Cerrar menú con tecla Escape para accesibilidad
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.focus();
    }
  });

  // Sombra y opacidad en barra de navegación al hacer scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });


  /* ==========================================================================
     8. INICIALIZACIÓN DE LA APLICACIÓN
     ========================================================================== */
  renderizarCartelera();
  poblarSelectFunciones();

});
