import styles from "./subreddit.module.css";
import timeago from "epoch-timeago";
import { useRouter } from "next/router";

export default function subReddit(data) {
  const router = useRouter();
  data = data.data;
  var previewImg = data.icon_img;
  if (previewImg == null) {
    previewImg = data.header_img;
  }
  const time = timeago(data.created_utc * 1000);

  return (
    <div
      className="card"
      onClick={function (e) {
        router.push("/view/" + data.title);
      }}
    >
      <div className="card-content">
        <div className="card-header">
          <img className="card-img" src={previewImg} />

          <h4 className="card-title">{data.title}</h4>
        </div>
        <p className="card-desc">{data.public_description}</p>
      </div>
      <div className="card-footer">
        <div className={styles.subs}> Members: {data.subscribers}</div>
        <div className={styles.age}>Created: {time} </div>
      </div>
    </div>
  );
}
