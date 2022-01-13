import db from "../../../../api/index";
import withProtect from "../../../../api/middlewares/withProtect";

const handler = async (req, res) => {
  let { postId } = req.query;
  db.Post.findOne({
    where: { id: postId },
  })
    .then((post) => {
      if (post === null) {
        res.status(500).json({ error: "This post does not exist !" });
      } else {
        res.status(200).json({ success: 200, post });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Impossible to find this post !" });
    });
};

export default withProtect(handler);
