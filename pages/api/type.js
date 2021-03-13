
const Reddit = require("reddit");

var reddit = new Reddit({
  username: "ihiggins090",
  password: "_ar()7NU8QM~mh2",
  appId: "dblQT9NcNBLz6Q",
  appSecret: "eNdMyAxLQmy5JL5fW-Ydg_HA1aXGMQ",
});

export default async (req, res) => {
      var temp = await reddit.get("/api/subreddit_autocomplete", {query: req.body.query });
      res.statusCode = 200;
      res.json({ data: temp});
};
