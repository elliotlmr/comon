import db from "../../../api/index";
import withProtect from "../../../api/middlewares/withProtect";

const handler = async (req, res) => {
  await db.User.findOne({
    where: { id: req.user.dataValues.id },
    attributes: {
      exclude: ["password"],
    },
  })
    .then((user) => {
      res.status(200).json({ user: user.dataValues });
    })
    .catch(() => {
      res.status(500).json({ error: "No user found !" });
    });
};

export default withProtect(handler);
