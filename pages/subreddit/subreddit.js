import styles from "./subreddit.module.css";

export default function subReddit(data){
    data = data.data;
    var previewImg = data.icon_img;
    if (previewImg == null){
        previewImg = data.header_img
    }

    return(

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
            </div>
    )
}