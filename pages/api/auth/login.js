import db from "../../../api/index";
import { SECRET_KEY } from "../../../api/config";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

export default async (req, res) => {
  await db.User.findOne({
    where: { email: req.body.email },
    attributes: ["id", "email", "password", "firstname", "lastname"],
    limit: 1,
  })
    .then((user) => {
      let data = user.dataValues;
      if (!data) res.status(400).json({ error: "User does not exist !" });

      const secretToken = jwt.sign(
        { userId: data.id, email: data.email, date: new Date().getTime() },
        SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      bcrypt
        .compare(req.body.password, data.password)
        .then((valid) => {
          if (!valid) res.status(401).json({ error: "Wrong password !" });

          res.setHeader(
            "Set-Cookie",
            `comonToken=${secretToken}; Path=/; HttpOnly; Max-Age=${
              24 * 60 * 60
            }`
          );
          res.status(200).json({
            userId: data.id,
            token: secretToken,
            isAuth: true,
          });
        })
        .catch(() =>
          res.status(500).json({ error: "Error while logging in !" })
        );
    })
    .catch(() => res.status(500).json({ error: "User not found !" }));
};
