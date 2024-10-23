const router = require("express").Router();
const { jsonResponse } = require("../lib/jsonResponse");
const user = require("../schema/user");
const getUserInfo = require("../lib/getUserInfo");

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    );
  }

  const foundUser = await user.findOne({ username }); // Renombrado aquí

  if (foundUser) {
    const correctPassword = await foundUser.comparePassword(
      password,
      foundUser.password
    );

    if (correctPassword) {
      // Autenticar usuario
      const accessToken = foundUser.createAccessToken();
      const refreshToken = await foundUser.createRefreshToken();

      return res.status(200).json(
        jsonResponse(200, {
          user: getUserInfo(foundUser),
          accessToken,
          refreshToken,
        })
      );
    } else {
      return res.status(400).json(
        jsonResponse(400, {
          error: "User or Password incorrect",
        })
      );
    }
  } else {
    return res.status(400).json(
      jsonResponse(400, {
        error: "User not found",
      })
    );
  }
});

module.exports = router;
