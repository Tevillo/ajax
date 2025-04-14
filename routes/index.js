var express = require('express');
var router = express.Router();

const MongoClient = require("mongodb").MongoClient;
var url = "mongodb://127.0.0.1:27017/";

const client = new MongoClient(url);

/* GET home page. */
router.get('/', async (req, res) => {
  res.render('index', { title: 'BaseballData', data: [], searchQuery: {}});
  
});

router.post('/search', async (req, res) => {
  const {name, age, age_val, war, war_val, hr, hr_val } = req.body;
  const data = await getData(name, age, age_val, war, war_val, hr, hr_val);
  res.render('data', { title: 'BaseballData', data: data, searchQuery: {name, age, age_val, war, war_val, hr, hr_val }});
});


async function getData(name, age, age_val, war, war_val, hr, hr_val) {
  try {
    await client.connect();
    let searchQuery = {};
    if (name != "" && name != null) {
      searchQuery.Player = { $regex: name + '.*', $options: 'i' };
    }
    if (age != "" && age != null) {
      if (age_val == "gt") {
        console.log("greater than");
        searchQuery.Age = {$gt: Number(age)};
      } else if (age_val == "lt") {
        searchQuery.Age = {$lt: Number(age)};
      } else
        searchQuery.Age = Number(age);
      }
    if (war != "" && war != null) {
      if (war_val == "gt") {
        console.log("greater than");
        searchQuery.WAR = {$gt: Number(war)};
      }
      else if (war_val == "lt") {
        searchQuery.WAR = {$lt: Number(war)};
      } else {
        searchQuery.WAR = Number(war);
      }
    }
    if (hr != "" && hr != null) {
      if (hr_val == "gt") {
        searchQuery.HR = {$gt: Number(hr)};
      } else if (hr_val == "lt") {
        searchQuery.HR = {$lt: Number(hr)};
      } else {
        searchQuery.HR = Number(hr);
      }
    }
    console.log(searchQuery);
    const collection = client.db('test').collection('Batting');
    const data = await collection.find(searchQuery).toArray();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    await client.close();
  }
}


module.exports = router;