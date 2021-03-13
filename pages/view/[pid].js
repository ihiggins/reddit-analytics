import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Preview from "../preview/preview.js";

const Reddit = require("reddit");

// [/r/subreddit]/about/moderators

export default function View(subreddit) {
  const router = useRouter();
  const { pid } = router.query;
  const [data, setData] = useState({});
  const [build,setBuild] = useState([]);

  useEffect(() => {
    postData(`/api/data/${pid}`, {}).then((data) => {
      console.log(data);
      setData(data.data);
      setBuild([<Preview data={data.title}/>])
    });
  }, []);

  return (
    <div className="page">
      <div className="nav"></div>
      <div className="content">
        <div className="card">

        {data.title}
        {data.active_user_count}
        {data.description}
        {data.created_utc}
        {data.id}
        {data.lang}
        {data.over18}
        {data.subscribers}
        {data.whitelist_status}
        
        </div>
        {build}
      </div>
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
