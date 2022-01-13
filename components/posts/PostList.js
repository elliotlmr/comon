import React from "react";
import OnePost from "./OnePost";
import styles from "../../styles/components/posts/PostList.module.scss";

export default class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.getRndInteger = this.getRndInteger.bind(this);
  }

  getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.posts.map((post, i) => (
          <OnePost
            key={i}
            id={post.id}
            title={post.title}
            description={post.description}
            img={`https://picsum.photos/id/${post.id}/${this.getRndInteger(
              200,
              480
            )}/${this.getRndInteger(300, 600)}`}
            author={`${post.firstname} ${post.lastname}`}
          />
        ))}
      </div>
    );
  }
}
