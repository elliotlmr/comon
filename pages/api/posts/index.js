import db from "../../../api/index";
import withProtect from "../../../api/middlewares/withProtect";

const handler = async (req, res) => {
  db.Post.findAll()
    .then((posts) => {
      res.status(200).json({ posts, success: 200 });
    })
    .catch(() => {
      res.status(500).json({ error: "Impossible to fetch posts !" });
    });
};

export default withProtect(handler);
