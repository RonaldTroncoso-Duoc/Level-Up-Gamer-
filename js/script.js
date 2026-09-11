function validarLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validar que los campos no estén vacíos
  if (!email || !password) {
    alert("Por favor, completa todos los campos.");
    return false;
  }

  const emailAdminRegex = /^admin@levelup\.com$/;
  if (emailAdminRegex.test(email) && password === "admin123") {
    return true; // Permitir acceso al administrador sin más validaciones
  }
  // Validar formato de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return false;
  }
  // Validar longitud de la contraseña
  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres.");
    return false;
  }

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

  // Validar que los campos no estén vacíos
  if (
    !nombre ||
    !fechaNacimientoTexto ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    errores.push("Por favor, completa todos los campos.");
  }

  // 1. Validar nombre
  if (nombre === "") {
    errores.push("El nombre es obligatorio.");
  } else if (nombre.length > 50) {
    errores.push("El nombre no puede superar los 50 caracteres.");
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
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === "") {
    errores.push("El correo es obligatorio.");
  } else if (!emailRegex.test(email)) {
    errores.push("El correo debe ser válido.");
  }

  // 4. Validar contraseñas
  if (password.length < 6 || confirmPassword.length < 6) {
    errores.push("La contraseña debe tener al menos 6 caracteres.");
  } else if (password !== confirmPassword) {
    errores.push("Las contraseñas no coinciden.");
  }

  // Mostrar errores
  if (errores.length > 0) {
    let html = "";

    for (let error of errores) {
      html += '<div class="error">⚠️ ' + error + "</div>";
    }

    mensajes.innerHTML = html;
  } else {
    mensajes.innerHTML =
      '<div class="exito">' +
      "✅ Registro realizado correctamente.<br><br>" +
      "Nombre: " +
      nombre +
      "<br>" +
      "Correo: " +
      email +
      "<br>" +
      "</div>";

    document.getElementById("formularioRegistro").reset();
  }
}
