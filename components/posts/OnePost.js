import React from "react";
import styles from "../../styles/components/posts/OnePost.module.scss";

export default class OnePost extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
    };

    this.handleLoad = this.handleLoad.bind(this);
  }

  handleLoad() {
    this.setState({ isLoaded: true });
  }

  render() {
    return (
      <div
        id={`img-${this.props.id}`}
        className={
          this.state.isLoaded === true
            ? `${styles.container} ${styles.loaded}`
            : styles.container
        }
      >
        <p className={styles.title}>{this.props.title}</p>
        <p className={styles.description}>{this.props.description}</p>
        {this.props.img && (
          <img
            src={this.props.img}
            alt="Post image"
            className={styles.img}
            onLoad={this.handleLoad}
          />
        )}
        <p className={styles.author}>by {this.props.author}</p>
      </div>
    );
  }
}
