const jwt = require("jsonwebtoken");
import db from "../index";
import { SECRET_KEY } from "../config";

export default function withProtect(handler) {
  return async (req, res) => {
    const token =
      req.method === "GET"
        ? await req.headers.cookie
        : await req.cookies.comonToken;
    const decodedToken = await jwt.verify(token, SECRET_KEY);
    const { userId, email, date } = decodedToken;

    if (!token || token === undefined || token === null) {
      return res.status(401).json({ error: "Access not allowed (no token) !" });
    }

    if (date + 7200000 < new Date().getTime()) {
      return res
        .status(500)
        .json({ error: "Token expired, please reconnect !" });
    }

    try {
      db.User.findOne({ where: { id: userId, email: email } })
        .then((user) => {
          req.user = user;
          return handler(req, res);
        })
        .catch(() => {
          res
            .status(401)
            .json({ error: "User belonging to this token no longer exists." });
        });
    } catch (error) {
      return res
        .status(401)
        .json({ error: "Request not accepted, please log in." });
    }
  };
}
