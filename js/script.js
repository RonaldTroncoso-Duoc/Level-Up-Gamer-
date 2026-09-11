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
  const nombre = document.getElementById("nombre").value.trim();
  const fechaNacimiento = new Date(
    document.getElementById("fechaNacimiento").value,
  );
  const hoy = new Date();
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
  const mes = hoy.getMonth() - fechaNacimiento.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
    edad--;
  }
  if (edad < 18) {
    alert("Debes ser mayor de 18 años para registrarte.");
    return false;
  }
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document
    .getElementById("confirmPassword")
    .value.trim();
}
