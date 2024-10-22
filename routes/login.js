const { jsonResponse } = require("../lib/jsonResponse");
const user = require("../schema/user");

const router = require("express").Router();

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    );
  }

  const user = await user.findOne({ username });

  if (user) {
    const correctPassword = await user.comparePassword(password, user.password);

    if (correctPassword) {
      //autenticar Usuario
      const accessToken = user.createAccessToken;
      const refreshToken = user.createRefreshToken;

      res
        .status(200)
        .json(jsonResponse(200, { user, accessToken, refreshToken }));
    } else {
      res.status(400).json(
        jsonResponse(400, {
          error: "User or Password incorrect ",
        })
      );
    }
  } else {
    res.status(400).json(
      jsonResponse(400, {
        error: "User not found",
      })
    );
  }
});

module.exports = router;
