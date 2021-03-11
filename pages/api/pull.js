const Reddit = require('reddit')
const timeStamp = require('unix-timestamp')

const reddit = new Reddit({
    username: 'ihiggins090',
    password: '_ar()7NU8QM~mh2',
    appId: 'dblQT9NcNBLz6Q',
    appSecret: 'eNdMyAxLQmy5JL5fW-Ydg_HA1aXGMQ',
  })



export default async(req, res) => {

  var data = await bukketSubreddit('wallstreetbets');
  res.statusCode = 200
  res.json({ arr: data })

}
  
  
  
  var bukketSubreddit = async(subreddit)=>{ 
  
      var t1 = timeStamp.now('-1h')
      var t2 = timeStamp.now('-2h')
      var t3 = timeStamp.now('-3h')
      var t4 = timeStamp.now('-4h')
      var t5 = timeStamp.now('-5h')
      var t6 = timeStamp.now('-6h')
      var t7 = timeStamp.now('-7h')
      var t8 = timeStamp.now('-8h')
      var t9 = timeStamp.now('-9h')
      var t10 = timeStamp.now('-10h')
      var t11= timeStamp.now('-11h')
      var t12 = timeStamp.now('-12h')
  
      var result = [0,0,0,0,0,0,0,0,0,0,0,0]
      
      var res = await pullThreads(subreddit,t12,"",[]);
  
  
      for(var i in res){
          const thread = res[i].data;
          const time = thread.created_utc;
  
              if(time > t1){result[0] = result[0]+1}else
              if(time > t2){result[1] = result[1]+1}else
              if(time > t3){result[2] = result[2]+1}else
              if(time > t4){result[3] = result[3]+1}else
              if(time > t5){result[4] = result[4]+1}else
              if(time > t6){result[5] = result[5]+1}else
              if(time > t7){result[6] = result[6]+1}else
              if(time > t8){result[7] = result[7]+1}else
              if(time > t9){result[8] = result[8]+1}else
              if(time > t10){result[9] = result[9]+1}else
              if(time > t11){result[10] = result[10]+1}else
              if(time > t12){result[11] = result[11]+1}
  
      }
      return result;
  }
  
  const pullThreads = async(subreddit,time,after,result) =>{
  
      const res = await reddit.get('/r/'+ subreddit +'/new', {limit:100,after:after})
      result = result.concat(res.data.children);
  
      if(result[result.length-1].data.created_utc > time){
          return pullThreads(subreddit,time,res.data.after,result);
      }else{
          console.log(result.length)
          return result;
      }
  }





