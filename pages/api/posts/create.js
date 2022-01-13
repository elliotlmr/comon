import db from "../../../api/index";
import withProtect from "../../../api/middlewares/withProtect";

const handler = async (req, res) => {
  db.Post.create({
    userId: req.user.dataValues.id,
    title: req.body.title,
    description: req.body.description,
  })
    .then((post) => {
      res.status(200).json({ message: "Post created !", post });
    })
    .catch(() => {
      res.status(500).json({ error: "Impossible to create post !" });
    });
};

export default withProtect(handler);
