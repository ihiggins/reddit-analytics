import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import timeago from "epoch-timeago";
import Side from "../side/side";
import Preview from "../preview/preview.js";

const Reddit = require("reddit");

// [/r/subreddit]/about/moderators

export default function View(subreddit) {
  const router = useRouter();
  const { pid } = router.query;
  const [data, setData] = useState({});
  const [build, setBuild] = useState([]);
  var time = "";

  const [ws, setWs] = useState(0);
  useEffect(() => {
    setWs(window.innerWidth);
    const interval = setInterval(() => {
      postData(`/api/data/${pid}`, {}).then((data) => {
        // time = timeago(data.created_utc * 1000)
        setData(data.data)
        setBuild([<Preview key={data} data={data.data.url} />]);
      });
    }, 500);
    return () => clearInterval(interval);
  });

  return (
    <div className="page">
      <div className="nav"></div>
      <div className="content">
        <div>
          <div className="card">
            <div className="card-content">
              <h4 className="card-title">{data.title}</h4>
              <div className="card-desc">
                Active Users: {data.active_user_count}
                <br />
                ID: {data.id} <br />
                Language: {data.lang}
                <br />
                Add Status: {data.whitelist_status}
              </div>
            </div>
          </div>
          <div className="card">
            {" "}
            <div className="card-content">
              <h4 className="card-title">Subscribers:</h4>
              {data.subscribers}
            </div>
          </div>
          {build}
        </div>
        {ws >= 700 && <Side term={"/api/data/new"} />}
      </div>
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
