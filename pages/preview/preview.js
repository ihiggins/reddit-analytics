import { render } from "react-dom";
import React, { useState, useEffect } from "react";
import styles from "./preview.module.css";
import { Line } from "react-chartjs-2";

export default function Preview(data) {
  console.log(data);

  const [arr, setArr] = useState({});

  useEffect(() => {
    postData("/api/pull/", { term: data.term.slug }).then((arr) => {
      console.log(arr);
      setArr({
        labels: ['1', '2','3','4','5','6','7','8','9','10','11','12'],
        datasets: [
          {
            label: 'My First dataset',
            data: arr.arr,
          },
          {
            label: 'My Second dataset',
            data: [0, 1, 0]
          },
        ]
    });

    });
  },[]);

  return (
    <div className={styles.preview}>
      {data.term.slug}
      <Line
        data={arr}
        width={500}
        height={100}
      />
    </div>
  );
}

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
