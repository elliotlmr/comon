import React from "react";
import styles from "../styles/Login.module.scss";
import { withRouter } from "next/router";
import axios from "axios";

export default withRouter(
  class Login extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        email: "",
        password: "",
      };

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
      this.props.setTitle("Com'On | Login");
    }

    handleSubmit(e) {
      e.preventDefault();
      axios
        .post(`api/auth/login`, {
          email: this.state.email,
          password: this.state.password,
        })
        .then((user) => {
          localStorage.clear();
          localStorage.setItem("comon-token", JSON.stringify(user.data));
          console.log(localStorage);
          this.props.router.push("/");
        })
        .catch((error) => console.log(error));
    }

    render() {
      return (
        <form className={styles.container}>
          <h2 className={styles.title}>Connexion :</h2>
          <input
            type="text"
            id="email-input"
            className={styles.textInput}
            value={this.state.email}
            onChange={(e) => this.setState({ email: e.target.value })}
            placeholder="Email.."
          />
          <input
            type="text"
            id="password-input"
            className={styles.textInput}
            value={this.state.password}
            onChange={(e) => this.setState({ password: e.target.value })}
            placeholder="Password.."
          />
          <button
            type="submit"
            className={styles.submitBtn}
            onClick={this.handleSubmit}
          >
            Let's go !
          </button>
        </form>
      );
    }
  }
);

export async function getServerSideProps(context) {
  const { req, res, params } = context;

  return {
    props: {
      test: "test",
    },
  };
}
