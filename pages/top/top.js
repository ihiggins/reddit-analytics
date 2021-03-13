import React, { useState, useEffect } from "react";
import styles from "./top.module.css";
import Subreddit from "../subreddit/subreddit";

export default function Top() {
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    postData("/api/data/top", {}).then((arr) => {
      for (var i in arr.data) {
        setSubs((searches) => [
          searches,
          <Subreddit key={i} data={arr.data[i].data} />,
        ]);
      }
    });
  }, []);

  return <div className={styles.wrapper}>{subs}</div>;
}

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}
