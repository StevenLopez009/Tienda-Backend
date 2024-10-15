const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Configurar CORS para permitir solicitudes desde el frontend en localhost:5173
const corsOptions = {
  origin: "http://localhost:5173", // Reemplaza con el origen de tu frontend
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());

// Conexión a MongoDB
async function main() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();

// Rutas de la aplicación
app.use("/api/signup", require("./routes/signup"));
app.use("/api/login", require("./routes/login"));
app.use("/api/refresh-token", require("./routes/refreshToken"));
app.use("/api/signout", require("./routes/signout"));
app.use("/api/home", require("./routes/home"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
