const { jsonResponse } = require("../lib/jsonResponse");

const router = require("express").Router();

router.post("/", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "Fields are required",
      })
    );
  }

  //autenticar Usuario
  const accessToken = "access_token";
  const refreshToken = "refresh_token";
  const user = {
    id: "1",
    name: "John Doe",
    username: "xxx",
  };

  res.status(200).json(jsonResponse(200, { user, accessToken, refreshToken }));
});

module.exports = router;
