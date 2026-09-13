const regionesComunas = {
  "Región Metropolitana": [
    "Santiago",
    "Providencia",
    "Maipú",
    "La Florida",
    "Puente Alto",
  ],
  Valparaíso: [
    "Valparaíso",
    "Viña del Mar",
    "Quilpué",
    "Villa Alemana",
    "San Antonio",
  ],
  Biobío: ["Concepción", "Talcahuano", "Los Ángeles", "Coronel", "Chiguayante"],
  "La Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Angol", "Pucón"],
  Antofagasta: ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "Taltal"],
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

//USUARIOS INICIALES DE PRUEBA
function obtenerUsuariosIniciales() {

  return [

    // CLIENTES
    {
      id: 1001,
      run: "123456785",
      nombre: "Camila Soto",
      fechaNacimiento: "1998-04-15",
      email: "camila@gmail.com",
      password: "camila123",
      telefono: "+56911111111",
      region: "Región Metropolitana de Santiago",
      comuna: "Santiago",
      direccion: "Av. Providencia 123",
      rol: "cliente",
      descuentoDuoc: false
    },

    {
      id: 1002,
      run: "193456782",
      nombre: "Matías Rojas",
      fechaNacimiento: "2000-08-22",
      email: "matias@duoc.cl",
      password: "matias123",
      telefono: "+56922222222",
      region: "Región Metropolitana de Santiago",
      comuna: "Maipú",
      direccion: "Los Pajaritos 456",
      rol: "cliente",
      descuentoDuoc: true
    },

    {
      id: 1003,
      run: "205678905",
      nombre: "Fernanda Díaz",
      fechaNacimiento: "1997-11-03",
      email: "fernanda@gmail.com",
      password: "fernanda123",
      telefono: "+56933333333",
      region: "Región de Valparaíso",
      comuna: "Viña del Mar",
      direccion: "Álvarez 789",
      rol: "cliente",
      descuentoDuoc: false
    },

    // ADMINISTRADOR
    {
      id: 2001,
      run: "176543213",
      nombre: "Daniel Morales",
      fechaNacimiento: "1992-06-18",
      email: "daniel.admin@gmail.com",
      password: "admin123",
      telefono: "+56944444444",
      region: "Región Metropolitana de Santiago",
      comuna: "Santiago",
      direccion: "Av. Apoquindo 1200",
      rol: "admin",
      descuentoDuoc: false
    },

    // VENDEDORES
    {
      id: 3001,
      run: "18456789K",
      nombre: "Valentina Pérez",
      fechaNacimiento: "1995-09-12",
      email: "valentina.vendedor@gmail.com",
      password: "venta123",
      telefono: "+56955555555",
      region: "Región Metropolitana de Santiago",
      comuna: "Providencia",
      direccion: "Av. Nueva Providencia 850",
      rol: "vendedor",
      descuentoDuoc: false
    },

    {
      id: 3002,
      run: "215432106",
      nombre: "Sebastián Herrera",
      fechaNacimiento: "1999-02-27",
      email: "sebastian.vendedor@duoc.cl",
      password: "venta456",
      telefono: "+56966666666",
      region: "Región de Valparaíso",
      comuna: "Valparaíso",
      direccion: "Av. Brasil 560",
      rol: "vendedor",
      descuentoDuoc: true
    }

  ];

}

function inicializarUsuarios() {

  const usuariosIniciales =
    obtenerUsuariosIniciales();

  const usuariosGuardados =
    JSON.parse(
      localStorage.getItem("usuariosLevelUp")
    ) || [];


  // Si todavía no existe ningún usuario,
  // guardamos todos los iniciales
  if (usuariosGuardados.length === 0) {

    localStorage.setItem(
      "usuariosLevelUp",
      JSON.stringify(usuariosIniciales)
    );

    return;
  }


  // Buscar usuarios iniciales que todavía
  // no existan en localStorage
  const usuariosFaltantes =
    usuariosIniciales.filter((usuarioInicial) => {

      return !usuariosGuardados.some((usuarioGuardado) =>

        String(usuarioGuardado.id) ===
          String(usuarioInicial.id)

        ||

        usuarioGuardado.run ===
          usuarioInicial.run

        ||

        usuarioGuardado.email ===
          usuarioInicial.email
      );

    });


  // Agregar solamente los que faltan
  if (usuariosFaltantes.length > 0) {

    const usuariosActualizados = [
      ...usuariosGuardados,
      ...usuariosFaltantes
    ];


    localStorage.setItem(
      "usuariosLevelUp",
      JSON.stringify(usuariosActualizados)
    );
  }

}

function obtenerUsuariosRegistrados() {
  return JSON.parse(localStorage.getItem("usuariosLevelUp")) || [];
}

function guardarUsuariosRegistrados(usuarios) {
  localStorage.setItem("usuariosLevelUp", JSON.stringify(usuarios));
}

function obtenerUsuarioActivo() {
  return JSON.parse(localStorage.getItem("usuarioActivo")) || null;
}

function guardarUsuarioActivo(usuario) {
  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
}

function obtenerIniciales(nombre) {
  return (
    nombre
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((parte) => parte.charAt(0).toUpperCase())
      .join("") || "UG"
  );
}

function formatearPrecio(valor) {
  return "$" + valor.toLocaleString("es-CL") + " CLP";
}

function validarLogin() {
  const errores = [];

  const email =
    document.getElementById("email")?.value.trim().toLowerCase() || "";
  const password = document.getElementById("password")?.value.trim() || "";

  if (!email && !password) {
    mostrarMensajes(["Ingresa tu correo y contraseña."]);
    return false;
  }

  if (!email) {
    mostrarMensajes(["Ingresa tu correo."]);
    return false;
  }

  if (!password) {
    mostrarMensajes(["Ingresa tu contraseña."]);
    return false;
  }

  if (email.length > 100) {
    errores.push("El correo no puede superar los 100 caracteres.");
  }

  const emailRegex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  if (email !== "" && !emailRegex.test(email)) {
    errores.push(
      "El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com.",
    );
  }

  if (errores.length > 0) {
    mostrarMensajes(errores);
    return false;
  }

  if (email === "admin@gmail.com" && password === "admin123") {
    guardarUsuarioActivo({
      nombre: "Administrador",
      email,
      rol: "admin",
      descuentoDuoc: false,
    });

    mostrarExito("✅ Inicio de sesión correcto. Bienvenido, Administrador.");
    actualizarHeaderUsuario();
    setTimeout(() => {
      window.location.href = "admin.html";
    }, 900);
    return false;
  }

  const usuarios = obtenerUsuariosRegistrados();
  const usuarioPorCorreo = usuarios.find((usuario) => usuario.email === email);

  if (!usuarioPorCorreo) {
    mostrarMensajes(["No existe una cuenta registrada con ese correo."]);
    return false;
  }

  if (usuarioPorCorreo.password !== password) {
    mostrarMensajes(["La contraseña ingresada es incorrecta."]);
    return false;
  }

  guardarUsuarioActivo({
    run: usuarioPorCorreo.run,
    nombre: usuarioPorCorreo.nombre,
    email: usuarioPorCorreo.email,
    telefono: usuarioPorCorreo.telefono,
    region: usuarioPorCorreo.region,
    comuna: usuarioPorCorreo.comuna,
    direccion: usuarioPorCorreo.direccion,
    rol: usuarioPorCorreo.rol || "cliente",
    descuentoDuoc: usuarioPorCorreo.descuentoDuoc,
  });

  mostrarExito(
    `✅ Inicio de sesión correcto. Bienvenido, ${usuarioPorCorreo.nombre}.`,
  );
  actualizarHeaderUsuario();

  setTimeout(() => {
    window.location.href = "index.html";
  }, 900);

  return false;
}

function validarRun(run) {

  const runLimpio = run.toUpperCase();

  const formatoRun = /^[0-9]{6,8}[0-9K]$/;

  if (!formatoRun.test(runLimpio)) {
    return false;
  }

  const cuerpo = runLimpio.slice(0, -1);
  const digitoIngresado = runLimpio.slice(-1);

  let suma = 0;
  let multiplicador = 2;


  for (let i = cuerpo.length - 1; i >= 0; i--) {

    suma += Number(cuerpo[i]) * multiplicador;

    multiplicador++;

    if (multiplicador > 7) {
      multiplicador = 2;
    }
  }


  const resto = 11 - (suma % 11);

  let digitoCalculado;

  if (resto === 11) {

    digitoCalculado = "0";

  } else if (resto === 10) {

    digitoCalculado = "K";

  } else {

    digitoCalculado = String(resto);
  }


  return digitoIngresado === digitoCalculado;
}

function registrarUsuario() {
  const errores = [];

  const run =
    document.getElementById("run")?.value.trim().toUpperCase() || "";

  const nombre =
    document.getElementById("nombre")?.value.trim() || "";

  const fechaNacimientoTexto =
    document.getElementById("fechaNacimiento")?.value || "";

  const email =
    document.getElementById("email")?.value.trim().toLowerCase() || "";

  const password =
    document.getElementById("password")?.value.trim() || "";

  const confirmPassword =
    document.getElementById("confirmPassword")?.value.trim() || "";

  const telefono =
    document.getElementById("telefono")?.value.trim() || "";

  const region =
    document.getElementById("region")?.value || "";

  const comuna =
    document.getElementById("comuna")?.value || "";

  const direccion =
    document.getElementById("direccion")?.value.trim() || "";

  const rol = "cliente";
  
  const camposObligatorios = [
    run,
    nombre,
    fechaNacimientoTexto,
    email,
    password,
    confirmPassword,
    region,
    comuna,
  ];
  const todosLosCamposObligatoriosVacios = camposObligatorios.every(
    (campo) => campo === "",
  );

  if (todosLosCamposObligatoriosVacios) {
    errores.push("Por favor, completa todos los campos obligatorios.");
  }

  // Validar RUN

  if (run === "") {

    errores.push("El RUN es obligatorio.");

  } else if (run.includes(".") || run.includes("-")) {

    errores.push(
      "El RUN debe ingresarse sin puntos ni guion."
    );

  } else if (run.length < 7 || run.length > 9) {

    errores.push(
      "El RUN debe tener entre 7 y 9 caracteres."
    );

  } else if (!validarRun(run)) {

    errores.push(
      "El RUN ingresado no es válido."
    );
  }

  if (nombre === "") {
    errores.push("El nombre es obligatorio.");
  } else if (nombre.length > 100) {
    errores.push("El nombre no puede superar los 100 caracteres.");
  }

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

  if (region === "") {
    errores.push("Debes seleccionar una región.");
  }

  if (comuna === "") {
    errores.push("Debes seleccionar una comuna.");
  }

  if (direccion === "") {

    errores.push("La dirección es obligatoria.");

  } else if (direccion.length > 300) {

    errores.push(
      "La dirección no puede superar los 300 caracteres."
    );
  }

  const usuarios = obtenerUsuariosRegistrados();
  const usuarioYaExiste = usuarios.some((usuario) => usuario.email === email);

  if (usuarioYaExiste) {
    errores.push("Ya existe una cuenta registrada con ese correo.");
  }

  const runYaExiste = usuarios.some(
    (usuario) => usuario.run === run
  );

  if (runYaExiste) {
    errores.push(
      "Ya existe una cuenta registrada con ese RUN."
    );
  }

  if (errores.length > 0) {
    mostrarMensajes(errores);
    return false;
  }

  const descuentoDuoc =
    email.endsWith("@duoc.cl") || email.endsWith("@profesor.duoc.cl");

  const nuevoUsuario = {
    id: Date.now(),
    run,
    nombre,
    fechaNacimiento: fechaNacimientoTexto,
    email,
    password,
    telefono,
    region,
    comuna,
    direccion,
    rol,
    descuentoDuoc,
  };

  usuarios.push(nuevoUsuario);
  guardarUsuariosRegistrados(usuarios);

  mostrarExito(
    "✅ Registro realizado correctamente.<br><br>" +
      "¡Bienvenido a Level-Up Gamer!<br><br>" +
      "RUN: " +
      run +
      "<br>" +
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
      "Dirección: " +
      direccion +
      "<br>" +
      "Tipo de usuario: Cliente<br>" +
      (telefono ? "Teléfono: " + telefono + "<br>" : "") +
      (descuentoDuoc ? "Beneficio: descuento Duoc 20% registrado.<br>" : "") +
      '<br><a href="login.html">Ir a iniciar sesión</a>',
  );

  document.getElementById("formularioRegistro")?.reset();

  const comunaSelect = document.getElementById("comuna");
  if (comunaSelect) {
    comunaSelect.innerHTML = '<option value="">Selecciona una comuna</option>';
    comunaSelect.disabled = true;
  }

  return false;
}

function actualizarHeaderUsuario() {
  const contenedoresUsuario = document.querySelectorAll(
    "header .container.py-2 .text-end",
  );
  const usuario = obtenerUsuarioActivo();

  contenedoresUsuario.forEach((contenedor) => {
    if (!usuario) {
      contenedor.innerHTML = `
        <a href="login.html">Iniciar sesión</a>
        <span>|</span>
        <a href="registro.html">Registrar usuario</a>
      `;
      return;
    }

    contenedor.innerHTML = `
      <div class="dropdown user-session d-inline-block">
        <button class="btn btn-sm dropdown-toggle user-session-btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false">
          <span class="user-avatar">${obtenerIniciales(usuario.nombre)}</span>
          <span>Hola, ${usuario.nombre.split(" ")[0]}</span>
        </button>

        <ul class="dropdown-menu dropdown-menu-end user-session-menu">
          ${
            usuario.rol === "admin"
              ? `<li>
                  <a class="dropdown-item" href="admin.html">Panel administrador</a>
                </li>
                <li><hr class="dropdown-divider"></li>`
              : ""
          }
          <li>
            <button class="dropdown-item" type="button" onclick="editarPerfil()">
              Editar perfil
            </button>
          </li>
          <li><hr class="dropdown-divider"></li>
          <li>
            <button class="dropdown-item text-danger" type="button" onclick="cerrarSesion()">
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    `;
  });
}

function editarPerfil() {
  const usuario = obtenerUsuarioActivo();

  if (!usuario) {
    window.location.href = "login.html";
    return;
  }

  alert(
    `Perfil de ${usuario.nombre}\n\n` +
      `Correo: ${usuario.email}\n` +
      `Región: ${usuario.region || "No registrada"}\n` +
      `Comuna: ${usuario.comuna || "No registrada"}\n\n` +
      "La edición completa del perfil quedará preparada para una próxima vista.",
  );
}

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  actualizarHeaderUsuario();
  window.location.href = "index.html";
}

function cerrarSesionAdmin() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "login.html";
}

//REGIONES Y COMUNAS -ADMIN USUARIOS
function cargarRegionesUsuariosAdmin() {

  const regionSelect =
    document.getElementById("admin-user-region");

  if (!regionSelect) {
    return;
  }

  regionSelect.innerHTML =
    '<option value="">Selecciona una región</option>';

  Object.keys(regionesComunas).forEach((region) => {

    const option = document.createElement("option");

    option.value = region;
    option.textContent = region;

    regionSelect.appendChild(option);

  });


  regionSelect.addEventListener("change", function () {

    cargarComunasUsuarioAdmin(regionSelect.value);

  });

}

function cargarComunasUsuarioAdmin(
  region,
  comunaSeleccionada = ""
) {

  const comunaSelect =
    document.getElementById("admin-user-comuna");

  if (!comunaSelect) {
    return;
  }

  const comunas = regionesComunas[region] || [];

  comunaSelect.innerHTML =
    '<option value="">Selecciona una comuna</option>';

  comunaSelect.disabled = comunas.length === 0;


  comunas.forEach((comuna) => {

    const option = document.createElement("option");

    option.value = comuna;
    option.textContent = comuna;


    if (comuna === comunaSeleccionada) {
      option.selected = true;
    }

    comunaSelect.appendChild(option);

  });

}

//MOSTRAR EMPLEADOS REGISTRADOS EN ADMIN
function renderizarEmpleadosAdmin() {

  const tbody =
    document.getElementById("admin-employees-body");

  const contador =
    document.getElementById("admin-employees-count");


  if (!tbody) {
    return;
  }


  const empleados = obtenerUsuariosRegistrados()
    .filter(
      (usuario) =>
        usuario.rol === "vendedor" ||
        usuario.rol === "admin"
    );


  if (empleados.length === 0) {

    tbody.innerHTML = `

      <tr>

        <td colspan="5"
            class="text-center">

          No hay empleados registrados.

        </td>

      </tr>

    `;

  } else {

    tbody.innerHTML = empleados
      .map((usuario) => {

        return `

          <tr>

            <td>
              ${usuario.run || "Sin RUN"}
            </td>

            <td>
              ${usuario.nombre || "-"}
            </td>

            <td>
              ${usuario.email || "-"}
            </td>

            <td>
              ${obtenerNombreRolAdmin(usuario.rol)}
            </td>

            <td>
              ${usuario.region || "-"}
            </td>

          </tr>

        `;

      })
      .join("");

  }


  if (contador) {

    contador.textContent =
      empleados.length +
      (empleados.length === 1
        ? " empleado registrado"
        : " empleados registrados");

  }

}

//MOSTRAR USUARIOS REGISTRADOS EN ADMIN
function renderizarUsuariosAdmin() {

  const tbody =
    document.getElementById("admin-users-body");

  const contador =
    document.getElementById("admin-users-count");

  if (!tbody) {
    return;
  }

  const usuarios = obtenerUsuariosRegistrados().filter((usuario) => usuario.rol === "cliente");


  // Si no existen usuarios registrados
  if (usuarios.length === 0) {

    tbody.innerHTML = `

      <tr>
        <td colspan="6" class="text-center">
          No hay usuarios registrados.
        </td>
      </tr>

    `;

  } else {

    tbody.innerHTML = usuarios
      .map((usuario) => {

        return `

          <tr>

            <td>
              ${usuario.run || "Sin RUN"}
            </td>

            <td>
              ${usuario.nombre || "-"}
            </td>

            <td>
              ${usuario.email || "-"}
            </td>

            <td>
              ${obtenerNombreRolAdmin(usuario.rol)}
            </td>

            <td>
              ${usuario.region || "-"}
            </td>

            <td>

              <div class="admin-row-actions">

                <button
                  type="button"
                  onclick="editarUsuarioAdmin('${usuario.id}')">

                  Editar

                </button>

                <button
                  type="button"
                  class="danger"
                  onclick="eliminarUsuarioAdmin('${usuario.id}')">

                  Eliminar

                </button>

              </div>

            </td>

          </tr>

        `;

      })
      .join("");

  }


  // Actualizar contador
  if (contador) {

    contador.textContent =
      usuarios.length +
      (usuarios.length === 1
        ? " usuario registrado"
        : " usuarios registrados");

  }

}

function obtenerNombreRolAdmin(rol) {

  if (rol === "admin") {
    return "Administrador";
  }

  if (rol === "vendedor") {
    return "Vendedor";
  }

  return "Cliente";
}

//OBTENER DATOS FORMULARIO USUARIO ADMIN
function obtenerDatosFormularioUsuarioAdmin() {

  return {

    editingId:
      document.getElementById("admin-user-editing-id")?.value || "",

    run:
      document.getElementById("admin-user-run")
        ?.value.trim().toUpperCase() || "",

    nombre:
      document.getElementById("admin-user-name")
        ?.value.trim() || "",

    email:
      document.getElementById("admin-user-email")
        ?.value.trim().toLowerCase() || "",

    password:
      document.getElementById("admin-user-password")
        ?.value.trim() || "",

    fechaNacimiento:
      document.getElementById("admin-user-birthdate")
        ?.value || "",

    rol:
      document.getElementById("admin-user-role")
        ?.value || "",

    region:
      document.getElementById("admin-user-region")
        ?.value || "",

    comuna:
      document.getElementById("admin-user-comuna")
        ?.value || "",

    direccion:
      document.getElementById("admin-user-address")
        ?.value.trim() || ""
  };

}

//MENSAJES ADMIN USUARIOS
function mostrarMensajeUsuarioAdmin(mensaje, tipo = "error") {

  const contenedor =
    document.getElementById("admin-users-message");

  if (!contenedor) {
    return;
  }

  contenedor.textContent = mensaje;

  contenedor.className =
    "admin-form-message " + tipo;

}

//LIMPIAR FORMULARIO USUARIO ADMIN
function limpiarFormularioUsuarioAdmin(
  limpiarMensaje = true
) {

  const formulario =
    document.getElementById("admin-user-form");

  if (formulario) {
    formulario.reset();
  }


  const editingId =
    document.getElementById(
      "admin-user-editing-id"
    );

  if (editingId) {
    editingId.value = "";
  }


  const titulo =
    document.getElementById(
      "admin-user-form-title"
    );

  if (titulo) {
    titulo.textContent = "Agregar usuario";
  }


  const comuna =
    document.getElementById(
      "admin-user-comuna"
    );

  if (comuna) {

    comuna.innerHTML =
      '<option value="">Selecciona una comuna</option>';

    comuna.disabled = true;

  }


  if (limpiarMensaje) {

    const mensaje =
      document.getElementById(
        "admin-users-message"
      );

    if (mensaje) {

      mensaje.textContent = "";

      mensaje.className =
        "admin-form-message";

    }

  }

}

function prepararNuevoUsuarioAdmin() {

  limpiarFormularioUsuarioAdmin();

  const campoRun =
    document.getElementById("admin-user-run");

  if (campoRun) {
    campoRun.focus();
  }

}

//GUARDAR USUARIO ADMIN
function guardarUsuarioAdmin() {

  const datos = obtenerDatosFormularioUsuarioAdmin();

  const errores = [];

  const usuarios = obtenerUsuariosRegistrados();

  // RUN
  if (datos.run === "") {

    errores.push("El RUN es obligatorio.");

  } else if (
    datos.run.includes(".") ||
    datos.run.includes("-")
  ) {

    errores.push(
      "El RUN debe ingresarse sin puntos ni guion."
    );

  } else if (
    datos.run.length < 7 ||
    datos.run.length > 9
  ) {

    errores.push(
      "El RUN debe tener entre 7 y 9 caracteres."
    );

  } else if (!validarRun(datos.run)) {

    errores.push(
      "El RUN ingresado no es válido."
    );

  }

  // NOMBRE
  if (datos.nombre === "") {

    errores.push(
      "El nombre completo es obligatorio."
    );

  }

  // CORREO
  const emailRegex =
    /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;


  if (datos.email === "") {

    errores.push(
      "El correo es obligatorio."
    );

  } else if (datos.email.includes(" ")) {

    errores.push(
      "El correo no puede contener espacios."
    );

  } else if (datos.email.length > 100) {

    errores.push(
      "El correo no puede superar los 100 caracteres."
    );

  } else if (!emailRegex.test(datos.email)) {

    errores.push(
      "El correo debe pertenecer a @duoc.cl, " +
      "@profesor.duoc.cl o @gmail.com."
    );

  }

  // CONTRASEÑA
  if (!datos.editingId && datos.password === "") {

    errores.push(
      "La contraseña es obligatoria."
    );

  }

  // ROL
  if (datos.rol === "") {

    errores.push(
      "Debes seleccionar un tipo de usuario."
    );

  }

  // REGIÓN
  if (datos.region === "") {

    errores.push(
      "Debes seleccionar una región."
    );

  }

  // COMUNA
  if (datos.comuna === "") {

    errores.push(
      "Debes seleccionar una comuna."
    );

  }

  // DIRECCIÓN
  if (datos.direccion === "") {

    errores.push(
      "La dirección es obligatoria."
    );

  } else if (datos.direccion.length > 300) {

    errores.push(
      "La dirección no puede superar los 300 caracteres."
    );

  }

  // RUN DUPLICADO
  const runDuplicado = usuarios.some(
    (usuario) =>
      usuario.run === datos.run &&
      String(usuario.id) !== String(datos.editingId)
  );


  if (runDuplicado) {

    errores.push(
      "Ya existe un usuario registrado con ese RUN."
    );

  }

  // CORREO DUPLICADO
  const correoDuplicado = usuarios.some(
    (usuario) =>
      usuario.email === datos.email &&
      String(usuario.id) !== String(datos.editingId)
  );


  if (correoDuplicado) {

    errores.push(
      "Ya existe un usuario registrado con ese correo."
    );

  }

  // MOSTRAR ERRORES
  if (errores.length > 0) {

    mostrarMensajeUsuarioAdmin(
      errores.join(" ")
    );

    return false;
  }

  // BENEFICIO DUOC
  const descuentoDuoc =
    datos.email.endsWith("@duoc.cl") ||
    datos.email.endsWith("@profesor.duoc.cl");
  
  //EDITAR USUARIO EXISTENTE
  if (datos.editingId) {

    const usuariosActualizados = usuarios.map((usuario) => {

      if (String(usuario.id) !== String(datos.editingId)) {
        return usuario;
      }

      return {
        ...usuario,

        run: datos.run,
        nombre: datos.nombre,
        email: datos.email,

        password:
          datos.password || usuario.password,

        fechaNacimiento:
          datos.fechaNacimiento,

        region: datos.region,
        comuna: datos.comuna,
        direccion: datos.direccion,

        rol: datos.rol,

        descuentoDuoc
      };

    });


    guardarUsuariosRegistrados(usuariosActualizados);

    renderizarUsuariosAdmin();

    limpiarFormularioUsuarioAdmin(false);

    mostrarMensajeUsuarioAdmin(
      "Usuario actualizado correctamente.",
      "success"
    );

    return false;
  }

  // CREAR NUEVO USUARIO
  const nuevoUsuario = {

    id: Date.now(),

    run: datos.run,

    nombre: datos.nombre,

    email: datos.email,

    password: datos.password,

    fechaNacimiento: datos.fechaNacimiento,

    telefono: "",

    region: datos.region,

    comuna: datos.comuna,

    direccion: datos.direccion,

    rol: datos.rol,

    descuentoDuoc: descuentoDuoc
  };


  usuarios.push(nuevoUsuario);


  guardarUsuariosRegistrados(usuarios);


  renderizarUsuariosAdmin();


  mostrarMensajeUsuarioAdmin(
    "Usuario agregado correctamente.",
    "success"
  );


  limpiarFormularioUsuarioAdmin(false);


  return false;

}

//EDITAR USUARIO ADMIN
function editarUsuarioAdmin(idUsuario) {

  const usuarios = obtenerUsuariosRegistrados();

  const usuario = usuarios.find(
    (item) => String(item.id) === String(idUsuario)
  );

  if (!usuario) {
    return;
  }

  document.getElementById(
    "admin-user-editing-id"
  ).value = usuario.id;


  document.getElementById(
    "admin-user-run"
  ).value = usuario.run || "";


  document.getElementById(
    "admin-user-name"
  ).value = usuario.nombre || "";


  document.getElementById(
    "admin-user-email"
  ).value = usuario.email || "";


  // No mostramos la contraseña guardada.
  // Si queda vacío al guardar, se conserva.
  document.getElementById(
    "admin-user-password"
  ).value = "";


  document.getElementById(
    "admin-user-birthdate"
  ).value = usuario.fechaNacimiento || "";


  document.getElementById(
    "admin-user-role"
  ).value = usuario.rol || "cliente";


  document.getElementById(
    "admin-user-region"
  ).value = usuario.region || "";


  cargarComunasUsuarioAdmin(
    usuario.region,
    usuario.comuna
  );


  document.getElementById(
    "admin-user-address"
  ).value = usuario.direccion || "";


  const titulo =
    document.getElementById(
      "admin-user-form-title"
    );

  if (titulo) {
    titulo.textContent = "Editar usuario";
  }


  mostrarMensajeUsuarioAdmin(
    "Editando usuario: " + usuario.nombre,
    "info"
  );
}

//ELIMINAR USUARIO ADMIN
function eliminarUsuarioAdmin(idUsuario) {

  const usuarios = obtenerUsuariosRegistrados();

  const usuario = usuarios.find(
    (item) => String(item.id) === String(idUsuario)
  );


  if (!usuario) {
    return;
  }


  const confirmar = confirm(
    "¿Deseas eliminar al usuario " + usuario.nombre + "?"
  );


  if (!confirmar) {
    return;
  }


  const usuariosActualizados = usuarios.filter(
    (item) => String(item.id) !== String(idUsuario)
  );


  guardarUsuariosRegistrados(usuariosActualizados);

  renderizarUsuariosAdmin();

  limpiarFormularioUsuarioAdmin(false);

  mostrarMensajeUsuarioAdmin(
    "Usuario eliminado correctamente.",
    "success"
  );

}

function cargarPanelAdministrador() {
  const adminBody = document.querySelector(".admin-body");

  if (!adminBody) {
    return;
  }

  const usuario = obtenerUsuarioActivo() || {
    nombre: "Administrador",
    email: "admin@gmail.com",
    rol: "admin",
  };

  const nombreCorto = usuario.nombre.split(" ")[0] || "Administrador";
  const rolUsuario = usuario.rol === "admin" ? "Administrador" : "Usuario";
  const usuariosRegistrados = obtenerUsuariosRegistrados();

  const saludo = document.getElementById("admin-greeting-name");
  const perfilNombre = document.getElementById("admin-profile-name");
  const perfilRol = document.getElementById("admin-profile-role");
  const avatar = document.getElementById("admin-avatar");
  const totalUsuarios = document.getElementById("admin-total-users");

  if (saludo) {
    saludo.textContent = nombreCorto;
  }

  if (perfilNombre) {
    perfilNombre.textContent = usuario.nombre;
  }

  if (perfilRol) {
    perfilRol.textContent = `${rolUsuario} conectado`;
  }

  if (avatar) {
    avatar.textContent = obtenerIniciales(usuario.nombre);
  }

  if (totalUsuarios) {
    totalUsuarios.textContent = usuariosRegistrados.length;
  }

  cargarCategoriasInventarioAdmin();
  renderizarInventarioAdmin();
  actualizarDashboardAdmin();
  inicializarNavegacionAdmin();
  renderizarResumenPedidosAdmin();
  renderizarPedidosAdmin();
  cargarRegionesUsuariosAdmin();
  renderizarUsuariosAdmin();
  renderizarEmpleadosAdmin();
}

const pedidosAdmin = crearPedidosAdmin();

function crearPedidosAdmin() {
  const trabajadores = [
    "Camila Torres",
    "Matías Rojas",
    "Fernanda Muñoz",
    "Diego Salazar",
    "Valentina Soto",
    "Nicolás Herrera",
  ];
  const fechas = [
    ...Array(12).fill("13/09/2026"),
    ...Array(10).fill("12/09/2026"),
    ...Array(8).fill("11/09/2026"),
    ...Array(7).fill("10/09/2026"),
    ...Array(7).fill("09/09/2026"),
    ...Array(6).fill("08/09/2026"),
  ];
  const estados = ["Completado", "En curso", "Completado", "Cancelado", "Completado"];
  const gruposProductos = [
    [
      { nombre: "PlayStation 5", cantidad: 1, precio: 549990 },
      { nombre: "Auriculares Gamer HyperX Cloud II", cantidad: 1, precio: 79990 },
    ],
    [
      { nombre: "Catan", cantidad: 2, precio: 29990 },
      { nombre: "Carcassonne", cantidad: 1, precio: 24990 },
    ],
    [{ nombre: "PC Gamer ASUS ROG Strix", cantidad: 1, precio: 1299990 }],
    [
      { nombre: "Mouse Gamer Logitech G502 HERO", cantidad: 1, precio: 49990 },
      { nombre: "Mousepad Razer Goliathus Extended Chroma", cantidad: 1, precio: 29990 },
    ],
    [
      { nombre: "Silla Gamer Secretlab Titan", cantidad: 1, precio: 349990 },
      { nombre: "Polera Gamer Personalizada 'Level-Up'", cantidad: 2, precio: 14990 },
    ],
    [{ nombre: "Controlador Inalámbrico Xbox Series X", cantidad: 2, precio: 59990 }],
  ];

  return fechas.map((fecha, index) => ({
    id: `LVG-${String(1050 - index).padStart(4, "0")}`,
    fecha,
    trabajador: trabajadores[index % trabajadores.length],
    estado: estados[index % estados.length],
    productos: gruposProductos[index % gruposProductos.length],
  }));
}

let paginaPedidosAdmin = 1;
let pedidoSeleccionadoAdmin = null;
const pedidosPorPaginaAdmin = 10;

function actualizarDashboardAdmin() {
  const pedidosHoy = document.getElementById("admin-dashboard-orders-today");
  const ventasHoy = document.getElementById("admin-dashboard-sales-today");
  const fechaHoySimulada = pedidosAdmin[0]?.fecha;
  const pedidosDelDia = pedidosAdmin.filter(
    (pedido) => pedido.fecha === fechaHoySimulada,
  );
  const totalVendidoDia = pedidosDelDia.reduce(
    (total, pedido) => total + obtenerTotalPedidoAdmin(pedido),
    0,
  );

  if (pedidosHoy) {
    pedidosHoy.textContent = pedidosDelDia.length;
  }

  if (ventasHoy) {
    ventasHoy.textContent = formatearPrecio(totalVendidoDia);
  }
}

function inicializarNavegacionAdmin() {
  const links = document.querySelectorAll("[data-admin-view]");

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      cambiarVistaAdmin(link.dataset.adminView);
    });
  });
}

function cambiarVistaAdmin(vista) {
  const secciones = document.querySelectorAll(".admin-view-section");
  const links = document.querySelectorAll("[data-admin-view]");

  secciones.forEach((seccion) => {
    seccion.classList.toggle("active", seccion.id === `admin-view-${vista}`);
  });

  links.forEach((link) => {
    const activo = link.dataset.adminView === vista;
    link.classList.toggle("active", activo);

    if (activo) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function obtenerTotalPedidoAdmin(pedido) {
  return pedido.productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  );
}

function obtenerClaseEstadoPedidoAdmin(estado) {
  const estadoNormalizado = estado.toLowerCase();

  if (estadoNormalizado === "completado") {
    return "completed";
  }

  if (estadoNormalizado === "cancelado") {
    return "cancelled";
  }

  return "progress";
}

function renderizarResumenPedidosAdmin() {
  const completados = document.getElementById("admin-orders-completed");
  const enCurso = document.getElementById("admin-orders-progress");
  const cancelados = document.getElementById("admin-orders-cancelled");

  if (!completados || !enCurso || !cancelados) {
    return;
  }

  completados.textContent = pedidosAdmin.filter(
    (pedido) => pedido.estado === "Completado",
  ).length;
  enCurso.textContent = pedidosAdmin.filter(
    (pedido) => pedido.estado === "En curso",
  ).length;
  cancelados.textContent = pedidosAdmin.filter(
    (pedido) => pedido.estado === "Cancelado",
  ).length;
}

function renderizarPedidosAdmin() {
  const tbody = document.getElementById("admin-orders-body");
  const rango = document.getElementById("admin-orders-range");

  if (!tbody) {
    return;
  }

  const inicio = (paginaPedidosAdmin - 1) * pedidosPorPaginaAdmin;
  const fin = inicio + pedidosPorPaginaAdmin;
  const pedidosPagina = pedidosAdmin.slice(inicio, fin);

  tbody.innerHTML = pedidosPagina
    .map((pedido) => {
      const total = obtenerTotalPedidoAdmin(pedido);
      const estadoClase = obtenerClaseEstadoPedidoAdmin(pedido.estado);
      const seleccionado = pedidoSeleccionadoAdmin === pedido.id ? "selected" : "";
      const filaDetalle =
        pedidoSeleccionadoAdmin === pedido.id
          ? renderizarFilaDetallePedidoAdmin(pedido)
          : "";

      return `
        <tr class="${seleccionado}" onclick="seleccionarPedidoAdmin('${pedido.id}')">
          <td>${pedido.fecha}</td>
          <td><strong>${pedido.id}</strong></td>
          <td>${pedido.trabajador}</td>
          <td><span class="admin-status-badge ${estadoClase}">${pedido.estado}</span></td>
          <td>${formatearPrecio(total)}</td>
        </tr>
        ${filaDetalle}
      `;
    })
    .join("");

  if (rango) {
    rango.textContent = `Mostrando ${inicio + 1}-${Math.min(
      fin,
      pedidosAdmin.length,
    )} de ${pedidosAdmin.length} ventas`;
  }

  renderizarPaginacionPedidosAdmin();
}

function renderizarPaginacionPedidosAdmin() {
  const contenedor = document.getElementById("admin-orders-pagination");

  if (!contenedor) {
    return;
  }

  const totalPaginas = Math.ceil(pedidosAdmin.length / pedidosPorPaginaAdmin);
  const botones = [];

  botones.push(
    `<button type="button" onclick="cambiarPaginaPedidosAdmin(1)" ${paginaPedidosAdmin === 1 ? "disabled" : ""}>&lt;&lt;</button>`,
  );
  botones.push(
    `<button type="button" onclick="cambiarPaginaPedidosAdmin(${paginaPedidosAdmin - 1})" ${paginaPedidosAdmin === 1 ? "disabled" : ""}>&lt;</button>`,
  );

  for (let pagina = 1; pagina <= totalPaginas; pagina += 1) {
    botones.push(
      `<button type="button" class="${paginaPedidosAdmin === pagina ? "active" : ""}" onclick="cambiarPaginaPedidosAdmin(${pagina})">${pagina}</button>`,
    );
  }

  botones.push(
    `<button type="button" onclick="cambiarPaginaPedidosAdmin(${paginaPedidosAdmin + 1})" ${paginaPedidosAdmin === totalPaginas ? "disabled" : ""}>&gt;</button>`,
  );
  botones.push(
    `<button type="button" onclick="cambiarPaginaPedidosAdmin(${totalPaginas})" ${paginaPedidosAdmin === totalPaginas ? "disabled" : ""}>&gt;&gt;</button>`,
  );

  contenedor.innerHTML = botones.join("");
}

function cambiarPaginaPedidosAdmin(pagina) {
  const totalPaginas = Math.ceil(pedidosAdmin.length / pedidosPorPaginaAdmin);

  if (pagina < 1 || pagina > totalPaginas) {
    return;
  }

  paginaPedidosAdmin = pagina;
  pedidoSeleccionadoAdmin = null;
  renderizarPedidosAdmin();
}

function seleccionarPedidoAdmin(idPedido) {
  pedidoSeleccionadoAdmin = pedidoSeleccionadoAdmin === idPedido ? null : idPedido;
  renderizarPedidosAdmin();
}

function renderizarFilaDetallePedidoAdmin(pedido) {
  const total = obtenerTotalPedidoAdmin(pedido);
  const estadoClase = obtenerClaseEstadoPedidoAdmin(pedido.estado);

  return `
    <tr class="admin-order-detail-row">
      <td colspan="5">
        <div class="admin-order-detail-inline">
          <div class="admin-order-detail-header">
            <div>
              <p>Detalle de venta</p>
              <h3>${pedido.id}</h3>
            </div>
            <span class="admin-status-badge ${estadoClase}">${pedido.estado}</span>
          </div>

          <div class="admin-order-meta">
            <span><strong>Fecha:</strong> ${pedido.fecha}</span>
            <span><strong>Trabajador:</strong> ${pedido.trabajador}</span>
            <span><strong>Total:</strong> ${formatearPrecio(total)}</span>
          </div>

          <div class="admin-table-responsive">
            <table class="admin-order-products-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                ${pedido.productos
                  .map(
                    (producto) => `
                      <tr>
                        <td>${producto.nombre}</td>
                        <td>${producto.cantidad}</td>
                        <td>${formatearPrecio(producto.precio)}</td>
                        <td>${formatearPrecio(producto.precio * producto.cantidad)}</td>
                      </tr>
                    `,
                  )
                  .join("")}
              </tbody>
            </table>
          </div>
        </div>
      </td>
    </tr>
  `;
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
    imagen:
      "img/img-productos/img-juegos-de-mesa/CARCASSONNE-LEVEL-UP-GAMER.jpg",
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
    imagen:
      "img/img-productos/img-accesorios/SILLA-GAMER-Secretlab-TITAN-LEVEL-UP-GAMER.jpg",
    descripcion:
      "Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones de juego prolongadas.",
  },

  {
    id: "MS001",
    nombre: "Mouse Gamer Logitech G502 HERO",
    categoria: "Mouse",
    precio: 49990,
    imagen:
      "img/img-productos/img-accesorios/MOUSE-Logitech-G502-LEVEL-UP-GAMER.jpg",
    descripcion:
      "Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso y personalización.",
  },

  {
    id: "MP001",
    nombre: "Mousepad Razer Goliathus Extended Chroma",
    categoria: "Mousepad",
    precio: 29990,
    imagen:
      "img/img-productos/img-accesorios/MOUSEPAD-GAMER-Razer-Goliathus-LEVEL-UP-GAMER.png",
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

let inventarioAdmin = obtenerInventarioAdmin();

function obtenerStockInicialAdmin(indice) {
  const stocks = [18, 14, 22, 16, 9, 6, 11, 25, 20, 30];
  return stocks[indice % stocks.length];
}

function normalizarStockCritico(valor) {

  if (
    valor === null ||
    valor === undefined ||
    valor === ""
  ) {

    return null;
  }

  const numero = Number(valor);

  if (
    !Number.isInteger(numero) ||
    numero < 0
  ) {

    return null;
  }

  return numero;
}

function obtenerInventarioAdmin() {
  const inventarioGuardado = JSON.parse(
    localStorage.getItem("inventarioLevelUpAdmin"),
  );

  if (inventarioGuardado && Array.isArray(inventarioGuardado)) {
    return inventarioGuardado.map((producto, index) => ({
      ...producto,
      stock: Number.isInteger(Number(producto.stock))
        ? Number(producto.stock)
        : obtenerStockInicialAdmin(index),
      stockCritico: normalizarStockCritico(producto.stockCritico),
    }));
  }

  return productos.map((producto, index) => ({
    ...producto,
    stock: obtenerStockInicialAdmin(index),
    stockCritico: null,
  }));
}

function guardarInventarioAdmin() {
  localStorage.setItem("inventarioLevelUpAdmin", JSON.stringify(inventarioAdmin));
}

function guardarInventarioTienda(productosInventario) {
  inventarioAdmin = productosInventario;
  localStorage.setItem("inventarioLevelUpAdmin", JSON.stringify(productosInventario));
}

function obtenerProductosTienda() {
  const inventarioGuardado = JSON.parse(
    localStorage.getItem("inventarioLevelUpAdmin"),
  );

  if (inventarioGuardado && Array.isArray(inventarioGuardado)) {
    return inventarioGuardado.map((producto, index) => ({
      ...producto,
      stock: Number.isInteger(Number(producto.stock))
        ? Number(producto.stock)
        : obtenerStockInicialAdmin(index),
      stockCritico: normalizarStockCritico(producto.stockCritico),
    }));
  }

  return inventarioAdmin;
}

function obtenerProductoTienda(idProducto) {
  return obtenerProductosTienda().find((producto) => producto.id === idProducto) || null;
}

function obtenerStockDisponibleProducto(idProducto) {
  const producto = obtenerProductoTienda(idProducto);
  return producto ? Number(producto.stock) || 0 : 0;
}

function obtenerCategoriasInventarioAdmin() {
  return [
    ...new Set([
      ...productos.map((producto) => producto.categoria),
      ...inventarioAdmin.map((producto) => producto.categoria),
    ]),
  ];
}

function cargarCategoriasInventarioAdmin() {
  const selectCategoria = document.getElementById("admin-product-category");

  if (!selectCategoria) {
    return;
  }

  const valorActual = selectCategoria.value;

  selectCategoria.innerHTML = '<option value="">Selecciona una categoría</option>';

  obtenerCategoriasInventarioAdmin().forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    selectCategoria.appendChild(option);
  });

  selectCategoria.value = valorActual;
}

function esStockCriticoAdmin(producto) {

  if (
    producto.stockCritico === null ||
    producto.stockCritico === undefined
  ) {

    return false;
  }

  return producto.stock <= producto.stockCritico;
}

function renderizarInventarioAdmin() {
  const tbody = document.getElementById("admin-inventory-body");
  const contador = document.getElementById("admin-inventory-count");
  const productosActivos = document.getElementById("admin-dashboard-products-active");

  if (!tbody) {
    return;
  }

  if (inventarioAdmin.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="admin-empty-table">
          No hay productos registrados. Usa el formulario para agregar el primer producto.
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = inventarioAdmin
      .map(
        (producto) => `
          <tr>
            <td>
              <img src="${producto.imagen}" alt="${producto.nombre}" class="admin-inventory-img">
            </td>
            <td><strong>${producto.id}</strong></td>
            <td>
              <strong>${producto.nombre}</strong>
              <small>${producto.descripcion}</small>
            </td>
            <td>${producto.categoria}</td>
            <td>${formatearPrecio(producto.precio)}</td>
            <td>
              <span class="admin-stock-badge ${esStockCriticoAdmin(producto) ? "low" : ""}">
                  ${producto.stock}
              </span>

              <small>
                  ${
                    producto.stockCritico === null ||
                    producto.stockCritico === undefined

                      ? "Sin stock crítico"

                      : esStockCriticoAdmin(producto)

                        ? `Crítico: ${producto.stockCritico} ⚠️`

                        : `Crítico: ${producto.stockCritico}`
                  }
              </small>
            </td>
            <td>
              <div class="admin-row-actions">
                <button type="button" onclick="editarProductoInventarioAdmin('${producto.id}')">Editar</button>
                <button type="button" class="danger" onclick="eliminarProductoInventarioAdmin('${producto.id}')">Eliminar</button>
              </div>
            </td>
          </tr>
        `,
      )
      .join("");
  }

  if (contador) {
    contador.textContent = `${inventarioAdmin.length} productos en inventario`;
  }

  if (productosActivos) {
    productosActivos.textContent = inventarioAdmin.length;
  }
}

function obtenerDatosFormularioInventarioAdmin() {

  const precioTexto =
    document.getElementById("admin-product-price")?.value.trim() || "";

  const stockTexto =
    document.getElementById("admin-product-stock")?.value.trim() || "";

  const stockCriticoTexto =
    document.getElementById("admin-product-critical-stock")?.value.trim() || "";

  return {

    editingId:
      document.getElementById("admin-product-editing-id")?.value || "",

    id:
      document.getElementById("admin-product-id")
        ?.value.trim().toUpperCase() || "",

    nombre:
      document.getElementById("admin-product-name")
        ?.value.trim() || "",

    categoria:
      document.getElementById("admin-product-category")
        ?.value || "",

    precioTexto,
    precio: Number(precioTexto),

    stockTexto,
    stock: Number(stockTexto),

    stockCriticoTexto,

    stockCritico:
      stockCriticoTexto === ""
        ? null
        : Number(stockCriticoTexto),

    imagen:
      document.getElementById("admin-product-image")
        ?.value.trim() || "",

    descripcion:
      document.getElementById("admin-product-description")
        ?.value.trim() || "",
  };
}

function mostrarMensajeInventarioAdmin(mensaje, tipo = "error") {
  const contenedor = document.getElementById("admin-inventory-message");

  if (!contenedor) {
    return;
  }

  contenedor.className = `admin-form-message ${tipo}`;
  contenedor.textContent = mensaje;
}

function guardarProductoInventarioAdmin() {
  const datos = obtenerDatosFormularioInventarioAdmin();
  const errores = [];

  // Código

  if (!datos.id) {

    errores.push("Ingresa el código del producto.");

  } else if (datos.id.length < 3) {

    errores.push(
      "El código debe tener al menos 3 caracteres."
    );

  } else if (!/^[A-Z0-9-]+$/.test(datos.id)) {

    errores.push(
      "El código solo puede usar letras, números y guiones."
    );
  }


  // Nombre

  if (!datos.nombre) {

    errores.push("Ingresa el nombre del producto.");

  } else if (datos.nombre.length > 100) {

    errores.push(
      "El nombre no puede superar los 100 caracteres."
    );
  }


  // Categoría

  if (!datos.categoria) {

    errores.push("Selecciona una categoría.");
  }


  // Precio

  if (datos.precioTexto === "") {

    errores.push("Ingresa el precio del producto.");

  } else if (
    Number.isNaN(datos.precio) ||
    datos.precio < 0
  ) {

    errores.push(
      "El precio debe ser un número igual o mayor a 0."
    );
  }


  // Stock

  if (datos.stockTexto === "") {

    errores.push("Ingresa el stock del producto.");

  } else if (
    !Number.isInteger(datos.stock) ||
    datos.stock < 0
  ) {

    errores.push(
      "El stock debe ser un número entero igual o mayor a 0."
    );
  }


  // Stock crítico

  if (
    datos.stockCriticoTexto !== "" &&
    (
      !Number.isInteger(datos.stockCritico) ||
      datos.stockCritico < 0
    )
  ) {

    errores.push(
      "El stock crítico debe ser un número entero igual o mayor a 0."
    );
  }


  // Descripción

  if (datos.descripcion.length > 500) {

    errores.push(
      "La descripción no puede superar los 500 caracteres."
    );
  }

  const codigoDuplicado = inventarioAdmin.some(
    (producto) => producto.id === datos.id && producto.id !== datos.editingId,
  );

  if (codigoDuplicado) {
    errores.push("Ya existe un producto con ese código.");
  }

  if (errores.length > 0) {
    mostrarMensajeInventarioAdmin(errores.join(" "));
    return false;
  }

  const productoGuardado = {

    id: datos.id,

    nombre: datos.nombre,

    categoria: datos.categoria,

    precio: datos.precio,

    imagen:
      datos.imagen || "img/LOGO-LEVEL-UP-GAMER.png",

    descripcion: datos.descripcion,

    stock: datos.stock,

    stockCritico: datos.stockCritico,
  };

  if (datos.editingId) {
    inventarioAdmin = inventarioAdmin.map((producto) =>
      producto.id === datos.editingId ? productoGuardado : producto,
    );
    mostrarMensajeInventarioAdmin("Producto actualizado correctamente.", "success");
  } else {
    inventarioAdmin.push(productoGuardado);
    mostrarMensajeInventarioAdmin("Producto agregado correctamente.", "success");
  }

  guardarInventarioAdmin();
  cargarCategoriasInventarioAdmin();
  renderizarInventarioAdmin();
  limpiarFormularioInventarioAdmin(false);
  return false;
}

function editarProductoInventarioAdmin(idProducto) {
  const producto = inventarioAdmin.find((item) => item.id === idProducto);

  if (!producto) {
    return;
  }

  document.getElementById("admin-product-editing-id").value = producto.id;
  document.getElementById("admin-product-id").value = producto.id;
  document.getElementById("admin-product-name").value = producto.nombre;
  document.getElementById("admin-product-category").value = producto.categoria;
  document.getElementById("admin-product-price").value = producto.precio;
  document.getElementById("admin-product-stock").value = producto.stock;
  document.getElementById("admin-product-critical-stock").value = producto.stockCritico ?? "";
  document.getElementById("admin-product-image").value = producto.imagen;
  document.getElementById("admin-product-description").value = producto.descripcion;

  const titulo = document.getElementById("admin-inventory-form-title");
  if (titulo) {
    titulo.textContent = "Editar producto";
  }

  mostrarMensajeInventarioAdmin(`Editando ${producto.nombre}.`, "info");
}

function eliminarProductoInventarioAdmin(idProducto) {
  const producto = inventarioAdmin.find((item) => item.id === idProducto);

  if (!producto) {
    return;
  }

  const confirmar = confirm(`¿Eliminar ${producto.nombre} del inventario?`);

  if (!confirmar) {
    return;
  }

  inventarioAdmin = inventarioAdmin.filter((item) => item.id !== idProducto);
  guardarInventarioAdmin();
  renderizarInventarioAdmin();
  limpiarFormularioInventarioAdmin(false);
  mostrarMensajeInventarioAdmin("Producto eliminado correctamente.", "success");
}

function limpiarFormularioInventarioAdmin(limpiarMensaje = true) {
  const formulario = document.getElementById("admin-inventory-form");
  const titulo = document.getElementById("admin-inventory-form-title");
  const mensaje = document.getElementById("admin-inventory-message");

  if (formulario) {
    formulario.reset();
  }

  const editingId = document.getElementById("admin-product-editing-id");
  if (editingId) {
    editingId.value = "";
  }

  if (titulo) {
    titulo.textContent = "Agregar producto";
  }

  if (mensaje && limpiarMensaje) {
    mensaje.className = "admin-form-message";
    mensaje.textContent = "";
  }
}

function prepararNuevoProductoAdmin() {
  limpiarFormularioInventarioAdmin();
  const codigo = document.getElementById("admin-product-id");

  if (codigo) {
    codigo.focus();
  }
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let descuentoAplicado =
  JSON.parse(localStorage.getItem("descuentoAplicado")) || null;

const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartTotalFinal = document.getElementById("cart-total-final");
const codigoDescuento = document.getElementById("codigo-descuento");
const aplicarDescuentoBtn = document.getElementById("aplicar-descuento");
const mensajeDescuento = document.getElementById("mensaje-descuento");
const filtroCategoria = document.getElementById("filtro-categoria");
const filtroPrecio = document.getElementById("filtro-precio");
const detalleProducto = document.getElementById("detalle-producto");
const productosSimilares = document.getElementById("productos-similares");

function obtenerProductosFiltrados() {
  let productosFiltrados = [...obtenerProductosTienda()];

  if (filtroCategoria && filtroCategoria.value !== "") {
    productosFiltrados = productosFiltrados.filter(
      (producto) => producto.categoria === filtroCategoria.value,
    );
  }

  if (filtroPrecio) {
    if (filtroPrecio.value === "menor-mayor") {
      productosFiltrados.sort((a, b) => a.precio - b.precio);
    }

    if (filtroPrecio.value === "mayor-menor") {
      productosFiltrados.sort((a, b) => b.precio - a.precio);
    }
  }

  return productosFiltrados;
}

function cargarFiltrosProductos() {
  if (!filtroCategoria) {
    return;
  }

  const categorias = [
    ...new Set(obtenerProductosTienda().map((producto) => producto.categoria)),
  ];

  categorias.forEach((categoria) => {
    const option = document.createElement("option");
    option.value = categoria;
    option.textContent = categoria;
    filtroCategoria.appendChild(option);
  });


  // Obtener la categoría enviada por la URL
  const parametros = new URLSearchParams(window.location.search);
  const categoriaURL = parametros.get("categoria");


  // Buscar la categoría sin importar mayúsculas o minúsculas
  if (categoriaURL) {

    const categoriaEncontrada = categorias.find(
      (categoria) =>
        categoria.toLowerCase() === categoriaURL.toLowerCase()
    );

    if (categoriaEncontrada) {
      filtroCategoria.value = categoriaEncontrada;
    }
  }


  filtroCategoria.addEventListener("change", mostrarProductos);

  if (filtroPrecio) {
    filtroPrecio.addEventListener("change", mostrarProductos);
  }
}

function crearCardProducto(producto) {
  const div = document.createElement("div");
  const sinStock = producto.stock <= 0;

  div.className = "col-12 col-sm-6 col-lg-4";

  div.innerHTML = `
    <div class="card h-100 product-card">

      <a href="detalle-producto.html?id=${producto.id}"
         class="product-image-link"
         aria-label="Ver detalle de ${producto.nombre}">
        <img src="${producto.imagen}"
             class="card-img-top"
             alt="${producto.nombre}">
      </a>

      <div class="card-body d-flex flex-column">

        <h5 class="card-title">
          ${producto.nombre}
        </h5>

        <p class="card-text mb-2">
          ${producto.categoria}
        </p>

        <p class="product-price fw-bold mb-3">
          $${producto.precio.toLocaleString("es-CL")}
        </p>

        <p class="product-stock ${sinStock ? "out" : ""}">
          ${sinStock ? "Sin stock disponible" : `Stock disponible: ${producto.stock}`}
        </p>

        <button
          type="button"
          class="btn btn-outline-dark mt-auto"
          ${sinStock ? "disabled" : ""}
          onclick="agregarAlCarrito('${producto.id}')">
          ${sinStock ? "No disponible" : "Agregar al carrito"}
        </button>

      </div>

    </div>
  `;

  return div;
}

function mostrarProductos() {
  if (!productList) {
    return;
  }

  productList.innerHTML = "";

  const limite = Number(productList.dataset.limit) || obtenerProductosTienda().length;
  const productosAMostrar = obtenerProductosFiltrados().slice(0, limite);

  if (productosAMostrar.length === 0) {
    productList.innerHTML =
      '<p class="text-muted">No se encontraron productos con los filtros seleccionados.</p>';
    return;
  }

  productosAMostrar.forEach((producto) => {
    productList.appendChild(crearCardProducto(producto));
  });
}

function agregarAlCarrito(id, cantidad = 1) {
  const producto = obtenerProductoTienda(id);

  if (!producto) {
    alert("Este producto ya no está disponible en la tienda.");
    return;
  }

  const cantidadNumerica = Number(cantidad) || 1;
  const cantidadAgregar = Math.max(1, cantidadNumerica);
  const item = carrito.find((p) => p.id === id);
  const cantidadActual = item ? item.cantidad : 0;

  if (producto.stock <= 0) {
    alert("Este producto no tiene stock disponible.");
    return;
  }

  if (cantidadActual + cantidadAgregar > producto.stock) {
    alert(`Solo hay ${producto.stock} unidad(es) disponibles de ${producto.nombre}.`);
    return;
  }

  if (item) {
    item.cantidad += cantidadAgregar;
    item.nombre = producto.nombre;
    item.categoria = producto.categoria;
    item.precio = producto.precio;
    item.imagen = producto.imagen;
    item.descripcion = producto.descripcion;
  } else {
    carrito.push({ ...producto, cantidad: cantidadAgregar });
  }

  sincronizarCarrito();
}

function obtenerProductoDesdeUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  return obtenerProductoTienda(id);
}

function mostrarDetalleProducto() {
  if (!detalleProducto) {
    return;
  }

  const producto = obtenerProductoDesdeUrl();

  if (!producto) {
    detalleProducto.innerHTML = `
      <div class="alert alert-warning">
        No se encontró el producto solicitado.
        <a href="productos.html" class="alert-link">Volver a productos</a>.
      </div>
    `;
    return;
  }

  document.title = `${producto.nombre} - Level-Up Gamer`;
  const sinStock = producto.stock <= 0;
  const cantidadMaxima = Math.min(producto.stock, 10);
  const opcionesCantidad = Array.from(
    { length: cantidadMaxima },
    (_, index) => index + 1,
  );

  detalleProducto.innerHTML = `
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb lug-breadcrumb">
        <li class="breadcrumb-item"><a href="index.html">Inicio</a></li>
        <li class="breadcrumb-item"><a href="productos.html">Productos</a></li>
        <li class="breadcrumb-item active" aria-current="page">${producto.nombre}</li>
      </ol>
    </nav>

    <div class="card product-detail-card">
      <div class="row g-0">
        <div class="col-lg-6">
          <img src="${producto.imagen}"
               class="img-fluid product-detail-img"
               alt="${producto.nombre}">
        </div>

        <div class="col-lg-6">
          <div class="card-body p-4 p-lg-5">
            <p class="text-muted mb-2">${producto.categoria} · ${producto.id}</p>
            <h1 class="h2 mb-3">${producto.nombre}</h1>
            <p class="product-price fs-3 fw-bold mb-4">
              $${producto.precio.toLocaleString("es-CL")}
            </p>

            <p class="product-stock detail ${sinStock ? "out" : ""}">
              ${sinStock ? "Sin stock disponible" : `Stock disponible: ${producto.stock}`}
            </p>

            <hr class="detail-divider">

            <p class="text-muted mb-4">
              ${producto.descripcion}
            </p>

            <hr class="detail-divider">

            <label for="cantidad-producto" class="form-label fw-bold">
              Cantidad
            </label>
            <select id="cantidad-producto" class="form-select detail-quantity mb-4">
              ${opcionesCantidad
                .map(
                  (cantidad) =>
                    `<option value="${cantidad}">${cantidad}</option>`,
                )
                .join("")}
            </select>

            <button type="button"
                    class="btn btn-success btn-lg"
                    ${sinStock ? "disabled" : ""}
                    onclick="agregarDetalleAlCarrito('${producto.id}')">
              ${sinStock ? "No disponible" : "Añadir al carrito"}
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  mostrarProductosSimilares(producto);
}

function agregarDetalleAlCarrito(id) {
  const cantidadSelect = document.getElementById("cantidad-producto");
  const cantidad = Number(cantidadSelect?.value) || 1;

  agregarAlCarrito(id, cantidad);
}

function mostrarProductosSimilares(productoActual) {
  if (!productosSimilares) {
    return;
  }

  const similares = obtenerProductosTienda()
    .filter(
      (producto) =>
        producto.categoria === productoActual.categoria &&
        producto.id !== productoActual.id,
    )
    .slice(0, 6);

  if (similares.length === 0) {
    productosSimilares.innerHTML = "";
    return;
  }

  productosSimilares.innerHTML = `
    <h2 class="h3 mb-4">Productos similares (${productoActual.categoria})</h2>

    <div id="carouselProductosSimilares" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        ${similares
          .map(
            (producto, index) => `
              <div class="carousel-item ${index === 0 ? "active" : ""}">
                <div class="card similar-product-card mx-auto">
                  <a href="detalle-producto.html?id=${producto.id}" class="product-image-link">
                    <img src="${producto.imagen}"
                         class="card-img-top"
                         alt="${producto.nombre}">
                  </a>
                  <div class="card-body text-center">
                    <h3 class="h6 card-title">${producto.nombre}</h3>
                    <p class="product-price fw-bold mb-0">
                      $${producto.precio.toLocaleString("es-CL")}
                    </p>
                  </div>
                </div>
              </div>
            `,
          )
          .join("")}
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselProductosSimilares" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Anterior</span>
      </button>

      <button class="carousel-control-next" type="button" data-bs-target="#carouselProductosSimilares" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Siguiente</span>
      </button>
    </div>
  `;
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function sincronizarCarritoConInventario() {
  let carritoCambiado = false;

  carrito = carrito
    .map((item) => {
      const productoActual = obtenerProductoTienda(item.id);

      if (!productoActual || productoActual.stock <= 0) {
        carritoCambiado = true;
        return null;
      }

      const cantidadAjustada = Math.min(item.cantidad, productoActual.stock);

      if (
        cantidadAjustada !== item.cantidad ||
        item.nombre !== productoActual.nombre ||
        item.precio !== productoActual.precio ||
        item.imagen !== productoActual.imagen ||
        item.descripcion !== productoActual.descripcion
      ) {
        carritoCambiado = true;
      }

      return {
        ...productoActual,
        cantidad: cantidadAjustada,
      };
    })
    .filter(Boolean);

  if (carritoCambiado) {
    guardarCarrito();
  }
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

  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0,
  );

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
  sincronizarCarritoConInventario();

  if (!cartList) {
    actualizarContadorCarrito();
    actualizarResumenCompra();
    return;
  }

  cartList.innerHTML = "";

  if (carrito.length === 0) {
    cartList.innerHTML =
      '<p class="text-muted mb-0">El carrito está vacío.</p>';
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
    const stockDisponible = obtenerStockDisponibleProducto(item.id);
    const stockMaximoAlcanzado = item.cantidad >= stockDisponible;

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
                  ${stockMaximoAlcanzado ? "disabled" : ""}
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

      <small class="text-muted d-block mt-1">
        Stock disponible: ${stockDisponible}
      </small>
    `;

    cartList.appendChild(div);
  });

  const total = calcularTotalCarrito();

  cartList.innerHTML += `
    <p class="cart-summary-total text-end mb-0">
      Total: <span>$${total.toLocaleString("es-CL")}</span>
    </p>
  `;
}

function mostrarCarritoDetallado() {
  carrito.forEach((item) => {
    const div = document.createElement("div");
    const stockDisponible = obtenerStockDisponibleProducto(item.id);
    const stockMaximoAlcanzado = item.cantidad >= stockDisponible;

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
                      ${stockMaximoAlcanzado ? "disabled" : ""}
                      onclick="agregarAlCarrito('${item.id}')">
                +
              </button>

            </div>

            <p class="fw-bold mb-2">
              Subtotal: $${(item.precio * item.cantidad).toLocaleString("es-CL")}
            </p>

            <small class="text-muted d-block mb-2">
              Stock disponible: ${stockDisponible}
            </small>

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
    mensajeDescuento.textContent =
      "Códigos disponibles: LEVELUP10, DUOC20 o GAMER5.";
    mensajeDescuento.className = "form-text";
  }
}

function vaciarCarrito() {
  carrito = [];
  reiniciarDescuento();
  sincronizarCarrito();
}

function descontarStockCarrito() {
  const inventarioActualizado = obtenerProductosTienda().map((producto) => {
    const itemCarrito = carrito.find((item) => item.id === producto.id);

    if (!itemCarrito) {
      return producto;
    }

    return {
      ...producto,
      stock: Math.max(0, producto.stock - itemCarrito.cantidad),
    };
  });

  guardarInventarioTienda(inventarioActualizado);
}

function aplicarDescuento() {
  if (!codigoDescuento || !mensajeDescuento || !aplicarDescuentoBtn) {
    return;
  }

  if (descuentoAplicado) {
    mensajeDescuento.textContent =
      "Ya aplicaste un cupón de descuento en esta compra.";
    mensajeDescuento.className = "form-text text-warning";
    aplicarDescuentoBtn.disabled = true;
    return;
  }

  if (carrito.length === 0) {
    mensajeDescuento.textContent =
      "Agrega productos al carrito antes de aplicar un cupón.";
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
  sincronizarCarritoConInventario();

  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de pagar.");
    return;
  }

  const totalFinal = calcularTotalConDescuento();

  alert(`Compra simulada por $${totalFinal.toLocaleString("es-CL")}.`);
  descontarStockCarrito();
  vaciarCarrito();
  mostrarProductos();
  mostrarDetalleProducto();
}


// FORMULARIO DE CONTACTO
const formularioContacto = document.getElementById("form-contacto");

if (formularioContacto) {

    formularioContacto.addEventListener("submit", function (event) {

        event.preventDefault();

        const nombre = document
            .getElementById("nombre-contacto")
            .value
            .trim();

        const correo = document
            .getElementById("correo-contacto")
            .value
            .trim();

        const comentario = document
            .getElementById("comentario-contacto")
            .value
            .trim();

        const mensaje = document.getElementById("mensaje-contacto");

        const errores = [];


        // Validar nombre

        if (nombre === "") {

            errores.push("El nombre es obligatorio.");

        } else if (nombre.length > 100) {

            errores.push("El nombre no puede superar los 100 caracteres.");

        }


        // Validar correo

        if (correo === "") {

            errores.push("El correo es obligatorio.");

        } else if (correo.includes(" ")) {

            errores.push(
                "El correo no puede contener espacios."
            );

        } else if (correo.length > 100) {

            errores.push(
                "El correo no puede superar los 100 caracteres."
            );

        } else if (!correoValidoContacto(correo)) {

            errores.push(
                "El correo debe pertenecer a @duoc.cl, " +
                "@profesor.duoc.cl o @gmail.com."
            );

        }

        // Validar comentario

        if (comentario === "") {

            errores.push("El comentario es obligatorio.");

        } else if (comentario.length > 500) {

            errores.push(
                "El comentario no puede superar los 500 caracteres."
            );

        }


        // Mostrar errores

        if (errores.length > 0) {

            mensaje.className = "alert alert-danger mt-3";

            mensaje.innerHTML =
                errores.map(
                    (error) => "<div>⚠️ " + error + "</div>"
                ).join("");

            return;
        }


        // Mensaje correcto

        mensaje.className = "alert alert-success mt-3";

        mensaje.innerHTML =
            "✅ Tu mensaje fue enviado correctamente.";


        // Limpiar formulario

        formularioContacto.reset();

    });

}

// VALIDAR DOMINIO DEL CORREO
function correoValidoContacto(correo) {

    const correoMinuscula = correo.toLowerCase();

    return (
        correoMinuscula.endsWith("@duoc.cl") ||
        correoMinuscula.endsWith("@profesor.duoc.cl") ||
        correoMinuscula.endsWith("@gmail.com")
    );

}

inicializarUsuarios();
actualizarHeaderUsuario();
cargarFiltrosProductos();
mostrarProductos();
mostrarDetalleProducto();
mostrarCarrito();
actualizarContadorCarrito();
actualizarResumenCompra();
cargarRegionesYComunas();
cargarPanelAdministrador();
