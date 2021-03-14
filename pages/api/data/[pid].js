// import subreddits from '../data-out.json'

const Reddit = require("reddit");

var reddit = new Reddit({


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
