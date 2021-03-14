
const Reddit = require("reddit");

var reddit = new Reddit({


});

export default async (req, res) => {
      var temp = await reddit.get("/api/subreddit_autocomplete", {query: req.body.query });
      res.statusCode = 200;
      res.json({ data: temp});
};
