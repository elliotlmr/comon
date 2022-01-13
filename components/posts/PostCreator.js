import React from "react";
import styles from "../../styles/components/posts/PostCreator.module.scss";
import axios from "axios";

export default class PostCreator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      opened: false,
    };

    this.handleDisplay = this.handleDisplay.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDisplay(e) {
    e.preventDefault();
    this.setState({ opened: this.state.opened === true ? false : true });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:3000/api/posts/create`, {
        title: this.state.title,
        description: this.state.description,
      })
      .then((post) => {
        console.log(post);
      })
      .catch((error) => console.log(error));
  }

  render() {
    return this.state.opened ? (
      <div className={styles.container}>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <div className={styles.header}>
            <p className={styles.title}>Create a post :</p>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={this.handleDisplay}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                className="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </button>
          </div>
          <input
            type="text"
            id="description-input"
            className={styles.textInput}
            value={this.state.title}
            onChange={(e) => this.setState({ title: e.target.value })}
            placeholder="Title.."
          />
          <input
            type="text"
            id="description-input"
            className={styles.textInput}
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            placeholder="Description.."
          />
          <div className={styles.btnContainer}>
            <button className={styles.button}>IMG</button>
            <button
              className={styles.button}
              type="submit"
              onClick={this.handleSubmit}
            >
              SEND
            </button>
          </div>
        </form>
      </div>
    ) : (
      <button className={styles.openBtn} onClick={this.handleDisplay}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-pencil-fill"
          viewBox="0 0 16 16"
        >
          <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
        </svg>
      </button>
    );
  }
}
