import ReactDOM from "react-dom";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import React, { useState } from "react";

import Preview from "./preview/preview.js";

export default function Home() {
  const [term, setTerm] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  const [searches, setSearches] = useState([]);
  var search = async () => {
    async function postData(url = "", data = {}) {
      // Default options are marked with *
      const response = await fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }

    postData("/api/search/", { term: term }).then((data) => {
      console.log(data);
      setSearches((searches) => [searches, <Preview term={data} />]);
    });
  };

  return (
    <div>
      <Head>
        <title>Reddit-Analytics</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <div className={styles.nav}></div>
      <main className={styles.landing}>
        <div className={styles.search}>
          <div className={styles.wrapper}>
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={"Search SubReddit"}
          />
          <div className={styles.searchButton}></div>
          </div>
        </div>

        <div id="searched">{searches}</div>
      </main>
    </div>
  );
}
