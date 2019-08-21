import React, { Component } from "react";
import Page from "../_common/page";
import styles from "./home.module.scss";

class Home extends Component {
  render() {
    return <div className={styles.home} />;
  }
}

export default Page(Home);
