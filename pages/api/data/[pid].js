// import subreddits from '../data-out.json'

const Reddit = require("reddit");

var reddit = new Reddit({
  username: "ihiggins090",
  password: "_ar()7NU8QM~mh2",
  appId: "dblQT9NcNBLz6Q",
  appSecret: "eNdMyAxLQmy5JL5fW-Ydg_HA1aXGMQ",
});

export default async (req, res) => {
  const { pid } = req.query;
  switch (pid) {
    case "top":
      var temp = await reddit.get("/subreddits/popular", { limit: 10 });
      res.statusCode = 200;
      res.json({ data: temp.data.children });
      break;
    case "new":
      var temp = await reddit.get("/subreddits/new", { limit: 10 });
      res.statusCode = 200;
      res.json({ data: temp.data.children });
      break;
    default:
      var temp = await reddit.get(`/r/${pid}/about`);
      res.statusCode = 200;
  
      res.json({ data: temp.data});
  }
};
