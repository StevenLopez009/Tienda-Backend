const express = require("express");
const router = express.Router();
const { jsonResponse } = require("../lib/jsonResponse");
const User = require("../schema/user");

router.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (!username || !name || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    );
  }

  try {
    // Verificar si el nombre de usuario ya existe
    const user = new User();
    const exists = await user.usernameExists(username);
    if (exists) {
      return res.status(400).json(
        jsonResponse(400, {
          error: "Username already exists",
        })
      );
    }

    // Crear y guardar un nuevo usuario en la base de datos
    const newUser = new User({ username, name, password });
    await newUser.save();

    res
      .status(201)
      .json(jsonResponse(201, { message: "User created successfully" }));
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json(jsonResponse(500, { error: "Error creating user" }));
  }
});

module.exports = router;
