const regionesComunas = {
  "Región Metropolitana": ["Santiago", "Providencia", "Maipú", "La Florida", "Puente Alto"],
  "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"],
  "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Coronel", "Chiguayante"],
  "La Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Angol", "Pucón"],
  "Antofagasta": ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "Taltal"],
};

function obtenerMensajes() {
  return document.getElementById("mensajes");
}

function mostrarMensajes(errores) {
  const mensajes = obtenerMensajes();

  if (!mensajes) {
    return;
  }

  mensajes.innerHTML = errores
    .map((error) => '<div class="error">⚠️ ' + error + "</div>")
    .join("");
}

function mostrarExito(mensaje) {
  const mensajes = obtenerMensajes();

  if (!mensajes) {
    return;
  }

  mensajes.innerHTML = '<div class="exito">' + mensaje + "</div>";
}

function cargarRegionesYComunas() {
  const regionSelect = document.getElementById("region");
  const comunaSelect = document.getElementById("comuna");

  if (!regionSelect || !comunaSelect) {
    return;
  }

  Object.keys(regionesComunas).forEach((region) => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
  });

  regionSelect.addEventListener("change", () => {
    const comunas = regionesComunas[regionSelect.value] || [];

    comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';
    comunaSelect.disabled = comunas.length === 0;

    comunas.forEach((comuna) => {
      const option = document.createElement("option");
      option.value = comuna;
      option.textContent = comuna;
      comunaSelect.appendChild(option);
    });
  });
}

function validarLogin() {
  // Guardar los errores encontrados.
  const errores = [];

  // Obtener los valores de los campos
  const email = document.getElementById("email")?.value.trim() || "";
  const password = document.getElementById("password")?.value.trim() || "";

  // Validar que los campos no estén vacíos
  if (!email || !password) {
    errores.push("Por favor, completa todos los campos.");
  }

  const emailAdminRegex = /^admin@gmail\.com$/;
  if (emailAdminRegex.test(email) && password === "admin123") {
    return true;
  }
  // Validar longitud del correo
  if (email.length > 100) {
    errores.push("El correo no puede superar los 100 caracteres.");
  }

  // Validar formato y dominio del correo
  const emailRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  if (email !== "" && !emailRegex.test(email)) {
    errores.push(
      "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.",
    );
  }

  // Validar longitud de la contraseña
  if (password.length < 4 || password.length > 10) {
    errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
  }

  // Mostrar errores
  if (errores.length > 0) {
    mostrarMensajes(errores);
    return false;
  }

  mostrarExito("✅ Inicio de sesión válido. Bienvenido a Level-Up Gamer.");

  // Si no hay errores, permitir el inicio de sesión
  return false;
}

function registrarUsuario() {
  // Guardar los errores encontrados.
  const errores = [];

  // Obtener los valores de los campos del formulario
  const nombre = document.getElementById("nombre")?.value.trim() || "";
  const fechaNacimientoTexto = document.getElementById("fechaNacimiento")?.value || "";
  const email = document.getElementById("email")?.value.trim() || "";
  const password = document.getElementById("password")?.value.trim() || "";
  const confirmPassword = document.getElementById("confirmPassword")?.value.trim() || "";
  const telefono = document.getElementById("telefono")?.value.trim() || "";
  const region = document.getElementById("region")?.value || "";
  const comuna = document.getElementById("comuna")?.value || "";

  // Validar campos obligatorios
  if (
    !nombre ||
    !fechaNacimientoTexto ||
    !email ||
    !password ||
    !confirmPassword ||
    !region ||
    !comuna
  ) {
    errores.push("Por favor, completa todos los campos obligatorios.");
  }

  // 1. Validar nombre completo
  if (nombre === "") {
    errores.push("El nombre es obligatorio.");
  } else if (nombre.length > 100) {
    errores.push("El nombre no puede superar los 100 caracteres.");
  }

  // 2. Validar fecha de nacimiento
  if (fechaNacimientoTexto === "") {
    errores.push("La fecha de nacimiento es obligatoria.");
  } else {
    const fechaNacimiento = new Date(fechaNacimientoTexto);

    if (isNaN(fechaNacimiento.getTime())) {
      errores.push("La fecha de nacimiento no es válida.");
    } else {
      const hoy = new Date();

      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();

      const mes = hoy.getMonth() - fechaNacimiento.getMonth();

      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
      }

      if (edad < 18) {
        errores.push("Debes ser mayor de 18 años para registrarte.");
      }
    }
  }

  // 3. Validar correo
  const emailRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  if (email === "") {
    errores.push("El correo es obligatorio.");
  } else if (email.length > 100) {
    errores.push("El correo no puede superar los 100 caracteres.");
  } else if (!emailRegex.test(email)) {
    errores.push(
      "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.",
    );
  }

  // 4. Validar contraseñas
  if (password === "" || confirmPassword === "") {
    errores.push("La contraseña es obligatoria.");
  } else if (
    password.length < 4 ||
    password.length > 10 ||
    confirmPassword.length < 4 ||
    confirmPassword.length > 10
  ) {
    errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
  } else if (password !== confirmPassword) {
    errores.push("Las contraseñas no coinciden.");
  }

  // 5. Validar región
  if (region === "") {
    errores.push("Debes seleccionar una región.");
  }

  // 6. Validar comuna
  if (comuna === "") {
    errores.push("Debes seleccionar una comuna.");
  }

  // Mostrar errores
  if (errores.length > 0) {
    mostrarMensajes(errores);
    return false;
  }

  // Registro exitoso
  mostrarExito(
    "✅ Registro realizado correctamente.<br><br>" +
    "Nombre: " +
    nombre +
    "<br>" +
    "Correo: " +
    email +
    "<br>" +
    "Región: " +
    region +
    "<br>" +
    "Comuna: " +
    comuna +
    "<br>" +
    (telefono ? "Teléfono: " + telefono + "<br>" : "")
  );

  document.getElementById("formularioRegistro")?.reset();

  const comunaSelect = document.getElementById("comuna");
  if (comunaSelect) {
    comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';
    comunaSelect.disabled = true;
  }

  return false;
}

const productos = [
  {
    id: "JM001",
    nombre: "Catan",
    categoria: "Juegos de Mesa",
    precio: 29990,
    imagen: "img/img-productos/img-juegos-de-mesa/CATAN-LEVEL-UP-GAMER.jpg",
    descripcion:
      "Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores y perfecto para noches de juego en familia o con amigos.",
  },

  {
    id: "JM002",
    nombre: "Carcassonne",
    categoria: "Juegos de Mesa",
    precio: 24990,
    imagen: "img/img-productos/img-juegos-de-mesa/CARCASSONNE-LEVEL-UP-GAMER.jpg",
    descripcion:
      "Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne. Ideal para 2-5 jugadores y fácil de aprender.",
  },

  {
    id: "AC001",
    nombre: "Controlador Inalámbrico Xbox Series X",
    categoria: "Accesorios",
    precio: 59990,
    imagen: "img/img-productos/img-accesorios/CONTROL-XBOX-LEVEL-UP-GAMER.jpg",
    descripcion:
      "Ofrece una experiencia de juego cómoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC.",
  },

  {
    id: "AC002",
    nombre: "Auriculares Gamer HyperX Cloud II",
    categoria: "Accesorios",
    precio: 79990,
    imagen: "img/img-productos/img-accesorios/AUR-HyperX-LEVEL-UP-GAMER.jpg",
    descripcion:
      "Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelástica para mayor comodidad durante largas sesiones de juego.",
  },

  {
    id: "CO001",
    nombre: "PlayStation 5",
    categoria: "Consolas",
    precio: 549990,
    imagen: "img/img-productos/img-consolas/PLAY-5-LEVEL-UP-GAMER.jpg",
    descripcion:
      "La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos para una experiencia de juego inmersiva.",
  },

  {
    id: "CG001",
    nombre: "PC Gamer ASUS ROG Strix",
    categoria: "Computadores Gamers",
    precio: 1299990,
    imagen: "img/img-productos/img-pc-gamer/PC-ASUS-ROG-LEVEL-UP-GAMER.png",
    descripcion:
      "Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional en cualquier juego.",
  },

  {
    id: "SG001",
    nombre: "Silla Gamer Secretlab Titan",
    categoria: "Sillas Gamers",
    precio: 349990,
    imagen: "img/img-productos/img-accesorios/SILLA-GAMER-Secretlab-TITAN-LEVEL-UP-GAMER.jpg",
    descripcion:
      "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
  },

  {
    id: "MS001",
    nombre: "Mouse Gamer Logitech G502 HERO",
    categoria: "Mouse",
    precio: 49990,
    imagen: "img/img-productos/img-accesorios/MOUSE-Logitech-G502-LEVEL-UP-GAMER.jpg",
    descripcion:
      "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.",
  },

  {
    id: "MP001",
    nombre: "Mousepad Razer Goliathus Extended Chroma",
    categoria: "Mousepad",
    precio: 29990,
    imagen: "img/img-productos/img-accesorios/MOUSEPAD-GAMER-Razer-Goliathus-LEVEL-UP-GAMER.png",
    descripcion:
      "Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave y uniforme para el movimiento del mouse.",
  },

  {
    id: "PP001",
    nombre: "Polera Gamer Personalizada 'Level-Up'",
    categoria: "Poleras Personalizadas",
    precio: 14990,
    imagen: "img/IMG-LEVEL-UP-GAMER.png",
    descripcion:
      "Una camiseta cómoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito.",
  },
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let descuentoAplicado = JSON.parse(localStorage.getItem("descuentoAplicado")) || null;

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartTotalFinal = document.getElementById("cart-total-final");
const codigoDescuento = document.getElementById("codigo-descuento");
const aplicarDescuentoBtn = document.getElementById("aplicar-descuento");
const mensajeDescuento = document.getElementById("mensaje-descuento");

function mostrarProductos() {
  if (!productList) {
    return;
  }

  productList.innerHTML = "";

  productos.forEach((producto) => {
    const div = document.createElement("div");

    div.className = "col-12 col-sm-6 col-lg-4";

    div.innerHTML = `
      <div class="card h-100">

        <img src="${producto.imagen}"
             class="card-img-top"
             alt="${producto.nombre}">

        <div class="card-body">

          <h5 class="card-title">
            ${producto.nombre}
          </h5>

          <p class="card-text">
            ${producto.categoria}
          </p>

          <p class="fw-bold">
            $${producto.precio.toLocaleString("es-CL")}
          </p>

          <button
            type="button"
            class="btn btn-outline-dark"
            onclick="agregarAlCarrito('${producto.id}')">
            Agregar al carrito
          </button>

        </div>

      </div>
    `;

    productList.appendChild(div);
  });
}

function agregarAlCarrito(id) {
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return;
  }

  const item = carrito.find((i) => i.id === id);

  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
  }

  sincronizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function calcularTotalCarrito() {
  return carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
}

function calcularTotalConDescuento() {
  const total = calcularTotalCarrito();

  if (!descuentoAplicado) {
    return total;
  }

  return Math.round(total * (1 - descuentoAplicado.porcentaje));
}

function actualizarContadorCarrito() {
  if (!cartCount) {
    return;
  }

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  cartCount.textContent = cantidadTotal;
}

function actualizarResumenCompra() {
  const total = calcularTotalCarrito();
  const totalFinal = calcularTotalConDescuento();

  if (cartTotal) {
    cartTotal.textContent = `$${total.toLocaleString("es-CL")}`;
  }

  if (cartTotalFinal) {
    cartTotalFinal.textContent = `$${totalFinal.toLocaleString("es-CL")}`;
  }

  if (descuentoAplicado && aplicarDescuentoBtn) {
    aplicarDescuentoBtn.disabled = true;
  }

  if (descuentoAplicado && codigoDescuento) {
    codigoDescuento.value = descuentoAplicado.codigo;
    codigoDescuento.disabled = true;
  }

  if (descuentoAplicado && mensajeDescuento) {
    mensajeDescuento.textContent = `Cupón ${descuentoAplicado.codigo} aplicado: ${descuentoAplicado.etiqueta}.`;
    mensajeDescuento.className = "form-text text-success";
  }
}

function sincronizarCarrito() {
  guardarCarrito();
  mostrarCarrito();
  actualizarContadorCarrito();
  actualizarResumenCompra();
}

function mostrarCarrito() {
  if (!cartList) {
    actualizarContadorCarrito();
    actualizarResumenCompra();
    return;
  }

  cartList.innerHTML = "";

  if (carrito.length === 0) {
    cartList.innerHTML = '<p class="text-muted mb-0">El carrito está vacío.</p>';
    actualizarContadorCarrito();
    actualizarResumenCompra();
    return;
  }

  if (cartList.dataset.cartView === "page") {
    mostrarCarritoDetallado();
    actualizarContadorCarrito();
    actualizarResumenCompra();
    return;
  }

  mostrarResumenCarrito();
  actualizarContadorCarrito();
  actualizarResumenCompra();
}

function mostrarResumenCarrito() {
  carrito.forEach((item) => {
    const div = document.createElement("div");

    div.className = "cart-item border-bottom pb-3 mb-3";

    div.innerHTML = `
      <strong class="d-block mb-1">${item.nombre}</strong>

      <small class="text-muted d-block mb-2">
        Precio: $${item.precio.toLocaleString("es-CL")}
      </small>

      <div class="d-flex align-items-center justify-content-between gap-2">

        <div class="btn-group btn-group-sm" role="group" aria-label="Modificar cantidad">

          <button type="button"
                  class="btn btn-outline-secondary"
                  onclick="disminuirCantidad('${item.id}')">
            -
          </button>

          <span class="btn btn-outline-secondary disabled">
            ${item.cantidad}
          </span>

          <button type="button"
                  class="btn btn-outline-secondary"
                  onclick="agregarAlCarrito('${item.id}')">
            +
          </button>

        </div>

        <button type="button"
                class="btn btn-sm btn-outline-danger"
                onclick="eliminarDelCarrito('${item.id}')">
          Eliminar
        </button>

      </div>

      <p class="fw-bold mb-0 mt-2">
        Subtotal: $${(item.precio * item.cantidad).toLocaleString("es-CL")}
      </p>
    `;

    cartList.appendChild(div);
  });

  const total = calcularTotalCarrito();

  cartList.innerHTML += `
    <h3 class="h5 text-end mb-0">
      Total: $${total.toLocaleString("es-CL")}
    </h3>
  `;
}

function mostrarCarritoDetallado() {
  carrito.forEach((item) => {
    const div = document.createElement("div");

    div.className = "card mb-3";

    div.innerHTML = `
      <div class="row g-0 align-items-center">

        <div class="col-md-3">
          <img src="${item.imagen}"
               class="img-fluid rounded-start"
               alt="${item.nombre}">
        </div>

        <div class="col-md-5">
          <div class="card-body">

            <h2 class="h5 card-title">
              ${item.nombre}
            </h2>

            <p class="card-text text-muted mb-0">
              ${item.descripcion}
            </p>

          </div>
        </div>

        <div class="col-md-4">
          <div class="card-body text-md-end">

            <p class="fw-bold mb-2">
              $${item.precio.toLocaleString("es-CL")}
            </p>

            <div class="btn-group btn-group-sm mb-2" role="group" aria-label="Modificar cantidad">

              <button type="button"
                      class="btn btn-outline-secondary"
                      onclick="disminuirCantidad('${item.id}')">
                -
              </button>

              <span class="btn btn-outline-secondary disabled">
                ${item.cantidad}
              </span>

              <button type="button"
                      class="btn btn-outline-secondary"
                      onclick="agregarAlCarrito('${item.id}')">
                +
              </button>

            </div>

            <p class="fw-bold mb-2">
              Subtotal: $${(item.precio * item.cantidad).toLocaleString("es-CL")}
            </p>

            <button type="button"
                    class="btn btn-sm btn-outline-danger"
                    onclick="eliminarDelCarrito('${item.id}')">
              Eliminar
            </button>

          </div>
        </div>

      </div>
    `;

    cartList.appendChild(div);
  });
}

function disminuirCantidad(id) {
  const item = carrito.find((i) => i.id === id);

  if (item) {
    item.cantidad -= 1;

    if (item.cantidad <= 0) {
      carrito = carrito.filter((i) => i.id !== id);
    }

    sincronizarCarrito();
  }
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);

  sincronizarCarrito();
}

function reiniciarDescuento() {
  descuentoAplicado = null;
  localStorage.removeItem("descuentoAplicado");

  if (codigoDescuento) {
    codigoDescuento.value = "";
    codigoDescuento.disabled = false;
  }

  if (aplicarDescuentoBtn) {
    aplicarDescuentoBtn.disabled = false;
  }

  if (mensajeDescuento) {
    mensajeDescuento.textContent = "Códigos disponibles: LEVELUP10, DUOC20 o GAMER5.";
    mensajeDescuento.className = "form-text";
  }
}

function vaciarCarrito() {
  carrito = [];
  reiniciarDescuento();
  sincronizarCarrito();
}

function aplicarDescuento() {
  if (!codigoDescuento || !mensajeDescuento || !aplicarDescuentoBtn) {
    return;
  }

  if (descuentoAplicado) {
    mensajeDescuento.textContent = "Ya aplicaste un cupón de descuento en esta compra.";
    mensajeDescuento.className = "form-text text-warning";
    aplicarDescuentoBtn.disabled = true;
    return;
  }

  if (carrito.length === 0) {
    mensajeDescuento.textContent = "Agrega productos al carrito antes de aplicar un cupón.";
    mensajeDescuento.className = "form-text text-danger";
    return;
  }

  const codigo = codigoDescuento.value.trim().toUpperCase();
  const cupones = {
    LEVELUP10: {
      porcentaje: 0.1,
      etiqueta: "10% de descuento",
    },
    DUOC20: {
      porcentaje: 0.2,
      etiqueta: "20% de descuento",
    },
    GAMER5: {
      porcentaje: 0.05,
      etiqueta: "5% de descuento",
    },
  };

  if (!cupones[codigo]) {
    mensajeDescuento.textContent = "El código ingresado no es válido.";
    mensajeDescuento.className = "form-text text-danger";
    return;
  }

  descuentoAplicado = {
    codigo,
    ...cupones[codigo],
  };

  localStorage.setItem("descuentoAplicado", JSON.stringify(descuentoAplicado));
  aplicarDescuentoBtn.disabled = true;
  codigoDescuento.disabled = true;

  actualizarResumenCompra();
}

function pagarCarrito() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de pagar.");
    return;
  }

  const totalFinal = calcularTotalConDescuento();

  alert(`Compra simulada por $${totalFinal.toLocaleString("es-CL")}.`);
}

mostrarProductos();
mostrarCarrito();
actualizarContadorCarrito();
actualizarResumenCompra();
cargarRegionesYComunas();
