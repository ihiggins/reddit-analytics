import styles from "./side.module.css";
import React, { useState, useEffect } from "react";
import timeago from "epoch-timeago";

import timeStamp from "unix-timestamp";

export default function Side() {
  const [newest, setNew] = useState([]);
  const time = timeStamp.now();

  useEffect(() => {
    postData("/api/data/new", {}).then((arr) => {
      for (var i in arr.data) {
        var temp = arr.data[i].data.title;
        const last = timeago(arr.data[i].data.created_utc * 1000);

        setNew((newest) => [
          newest,
          <div key={i}>
            <div className={styles.title}>{temp}</div>

            <div className={styles.time}> {last} </div>

            <hr />
          </div>,
        ]);
      }
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className="card">
        here parameter chooses which subreddits are returned as follows:
        subscriber - subreddits the user is subscribed to contributor -
        subreddits the user is an approved user in moderator - subreddits the
        user is a moderator of streams - subscribed to subreddits that contain
        hosted video links
      </div>

      <div className={`card ${styles.newest}`}>{newest}</div>
    </div>
  );
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
