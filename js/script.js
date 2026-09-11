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
