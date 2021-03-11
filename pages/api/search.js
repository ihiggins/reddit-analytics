
import subreddits from './data-out.json'


export default (req, res) => {

console.log(req.body.term);
    var term = req.body.term;
    if(term in subreddits){
        res.statusCode = 200
        res.json(subreddits[term])  
    }else{
        res.statusCode = 404
        res.json({test:'test'} );
    }

  }