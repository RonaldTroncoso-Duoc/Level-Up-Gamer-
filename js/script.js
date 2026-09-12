function validarLogin() {
  // Guardar los errores encontrados.
  const errores = [];

  // Obtener los valores de los campos
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

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
    let html = "";

    for (let error of errores) {
      html += '<div class="error">⚠️ ' + error + "</div>";
    }

    mensajes.innerHTML = html;

    return false;
  }

  // Si no hay errores, permitir el inicio de sesión
  return true;
}

function registrarUsuario() {
  // Guardar los errores encontrados.
  const errores = [];

  // Obtener los valores de los campos del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const fechaNacimientoTexto = document.getElementById("fechaNacimiento").value;
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const region = document.getElementById("region").value;
  const comuna = document.getElementById("comuna").value;

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
    let html = "";

    for (let error of errores) {
      html += '<div class="error">⚠️ ' + error + "</div>";
    }

    mensajes.innerHTML = html;

    return false;
  }

  // Registro exitoso
  mensajes.innerHTML =
    '<div class="exito">' +
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
    "</div>";

  document.getElementById("formularioRegistro").reset();

  return true;
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

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");

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
  const item = carrito.find((i) => i.id === id);

  if (item) {
    item.cantidad += 1;
  } else {
    carrito.push({
      ...producto,
      cantidad: 1,
    });
  }

  guardarCarrito();
  mostrarCarrito();
  actualizarContadorCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  if (!cartCount) {
    return;
  }

  const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);

  cartCount.textContent = cantidadTotal;
}

function mostrarCarrito() {
  if (!cartList) {
    actualizarContadorCarrito();
    return;
  }

  cartList.innerHTML = "";

  if (carrito.length === 0) {
    cartList.innerHTML = '<p class="text-muted mb-0">El carrito está vacío.</p>';
    actualizarContadorCarrito();
    return;
  }

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

  const total = carrito.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0,
  );

  cartList.innerHTML += `
    <h3 class="h5 text-end mb-0">
      Total: $${total.toLocaleString("es-CL")}
    </h3>
  `;

  actualizarContadorCarrito();
}

function disminuirCantidad(id) {
  const item = carrito.find((i) => i.id === id);

  if (item) {
    item.cantidad -= 1;

    if (item.cantidad <= 0) {
      carrito = carrito.filter((i) => i.id !== id);
    }

    guardarCarrito();
    mostrarCarrito();
    actualizarContadorCarrito();
  }
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter((item) => item.id !== id);

  guardarCarrito();
  mostrarCarrito();
  actualizarContadorCarrito();
}

function vaciarCarrito() {
  carrito = [];

  guardarCarrito();
  mostrarCarrito();
  actualizarContadorCarrito();
}

mostrarProductos();
mostrarCarrito();
actualizarContadorCarrito();
