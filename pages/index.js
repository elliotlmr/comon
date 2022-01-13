import React from "react";
import PostList from "../components/posts/PostList";
import styles from "../styles/Home.module.scss";
//import data from "../api/data.json";
import PostCreator from "../components/posts/PostCreator";
import axios from "axios";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.setTitle("Com'On | Welcome");
  }

  render() {
    return (
      <div className={styles.container}>
        {this.props.isAdmin && <PostCreator />}
        <PostList posts={this.props.posts} />
      </div>
    );
  }
}

export async function getServerSideProps(context) {
  const URL = process.env.URL_NAME;
  const { req, res, params } = context;
  let red = false;

  if (req.cookies.comonToken === undefined) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const data = await axios
    .get(`${URL}/posts`, {
      withCredentials: true,
      headers: {
        Cookie: req.cookies.comonToken,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.log(error.response.status);
      if (error.response.status === 500) {
        red = true;
      }
    });

  if (red === true) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const isUserAdmin = await axios
    .get(`${URL}/auth/profile`, {
      withCredentials: true,
      headers: {
        Cookie: req.cookies.comonToken,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data.user.admin;
    });

  return {
    props: {
      posts: data.posts,
      isAdmin: isUserAdmin,
    },
  };
}
