const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Base de datos en memoria (simulada)
let usuarios = [];

/* =========================
   RUTA PRINCIPAL (PREVIEW)
========================= */
app.get("/", (req, res) => {
  res.send("API de usuarios funcionando correctamente");
});

/* =========================
   REGISTRO
========================= */
app.post("/registro", (req, res) => {
  const { nombre, email, password } = req.body;

  // Validación de campos obligatorios
  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: "Campos obligatorios" });
  }

  // Validación de contraseña
  if (password.length < 6) {
    return res.status(400).json({ mensaje: "Mínimo 6 caracteres" });
  }

  // Verificar si el usuario ya existe
  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    return res.status(400).json({ mensaje: "Usuario ya existe" });
  }

  // Guardar usuario
  usuarios.push({ nombre, email, password });

  res.json({ mensaje: "Registrado correctamente" });
});

/* =========================
   LOGIN
========================= */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Validación de campos
  if (!email || !password) {
    return res.status(400).json({ mensaje: "Campos obligatorios" });
  }

  // Buscar usuario
  const usuario = usuarios.find(
    (u) => u.email === email && u.password === password
  );

  if (!usuario) {
    return res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }

  res.json({ mensaje: "Login exitoso", usuario });
});

/* =========================
   INICIAR SERVIDOR
========================= */
app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});
