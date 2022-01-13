import db from "../../../api/index";
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");

export default async (req, res) => {
  let schema = new passwordValidator();
  schema
    .is()
    .min(8)
    .is()
    .max(30)
    .has()
    .uppercase()
    .has()
    .lowercase()
    .has()
    .digits(1)
    .has()
    .not()
    .spaces();
  if (
    emailValidator.validate(req.body.email) == true &&
    schema.validate(req.body.password) == true
  ) {
    bcrypt
      .hash(req.body.password, 12)
      .then((hash) => {
        db.User.create({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: hash,
        })
          .then(() => {
            res.status(200).json({
              message: `User ${req.body.firstname} ${req.body.lastname} created !`,
            });
          })
          .catch(() => {
            !req.body.firstname
              ? res.status(400).json({ error: "missing firstname" })
              : !req.body.lastname
              ? res.status(400).json({ error: "missing lastname" })
              : !req.body.firstname
              ? res.status(400).json({ error: "missing firstname" })
              : !req.body.firstname
              ? res.status(400).json({ error: "missing firstname" })
              : res.status(500).json({
                  error: "User can not be created !",
                });
          });
      })
      .catch((error) => {
        res.status(500).json({
          error: "User can not be created !",
        });
      });
  } else {
    return res.status(500).json({ message: "Invalid email or password !" });
  }
};
