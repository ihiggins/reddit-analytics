import styles from "./subreddit.module.css";
import timeago from "epoch-timeago";

export default function subReddit(data) {
  data = data.data;
  var previewImg = data.icon_img;
  if (previewImg == null) {
    previewImg = data.header_img;
  }
  const time = timeago(data.created_utc * 1000);

  return (
    <div className="card">
      <div className={styles.header}>
        <img className={styles.img} src={previewImg} />

        <h4 className={styles.title}>{data.title}</h4>
      </div>
      <p className={styles.desc}>{data.public_description}</p>

      {data.created_utc}
      {data.subscribers}
      {data.whitelist_status}

      {data.advertiser_category}
      <div className={styles.footer}>
        <div className={styles.subs}> Members: {data.subscribers}</div>
        <div className={styles.age}>Created: {time} </div>
      </div>
    </div>
  );
}
