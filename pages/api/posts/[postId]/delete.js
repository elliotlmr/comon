import db from "../../../../api/index";
import withProtect from "../../../../api/middlewares/withProtect";

const handler = async (req, res) => {
  console.log(req.query);
  let { postId } = req.query;
  db.Post.destroy({
    where: { id: postId },
  })
    .then((post) => {
      console.log(post);
      if (post === 0 || post === null) {
        res.status(500).json({ error: "This post does not exist !" });
      } else {
        res.status(200).json({ message: "Post deleted !" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Impossible to delete this post !" });
    });
};

export default withProtect(handler);
