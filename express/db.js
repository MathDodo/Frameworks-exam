const mongoClient = require('mongodb').MongoClient;
const dbUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017';
const dbName = 'FrameworksExam';
let client = {};

module.exports.connect = connect;
module.exports.Getreviews = Getreviews;
module.exports.removeData = removeData;
module.exports.generateTestData = generateTestData;
module.exports.countData = countData;
module.exports.insertData = insertData;
module.exports.GetUsers = GetUsers;
module.exports.AddUser = AddUser;

function connect() 
{
  return new Promise((resolve,reject) => 
  {
    mongoClient.connect(dbUrl, {useNewUrlParser: true}).then(
      (c) => {
        client = c;
        console.log("Connected successfully to mongodb server");
        resolve();
      }).catch((error) => console.error(error));
  });
}

function Getreviews(query) 
{
  return new Promise((resolve,reject) => 
  {
    client.db(dbName).collection("Reviews").find(query).toArray().then(
      (documents) => {
        console.log("Got Reviews");
        resolve(documents);
      }).catch((error) => console.error(error));
  });

}

function GetUsers(query) 
{
  return new Promise((resolve,reject) => 
  {
    client.db(dbName).collection("Users").find(query).toArray().then(
      (documents) => {
        console.log("Got users");
        resolve(documents);
      }).catch((error) => console.error(error));
  });

}

function AddUser(username, password) 
{
  return new Promise((resolve,reject) => 
  {
    let user = {username : username, password: password};

    client.db(dbName).collection("Users").insertOne(user).then(
      (result) => {
        console.log("Inserted user");
        resolve(result.insertedId);
      }).catch((error) => console.error(error));
  });
}

function insertData(text, details) 
{
  return new Promise((resolve,reject) => 
  {
    let data = {text : text, details: details};
    client.db(dbName).collection("Reviews").insertOne(data).then(
      (result) => {
        console.log("Inserted Review");
        resolve(result.insertedId);
      }).catch((error) => console.error(error));
  });
}

function countData(query) 
{
  return new Promise((resolve,reject) => 
  {
    client.db(dbName).collection("Reviews").countDocuments(query).then(
      (count) => {
        console.log("Counted Reviews");
        resolve(count);
      }).catch((error) => console.error(error));
  });
}

function removeData(query) 
{
  return new Promise((resolve,reject) => {
    client.db(dbName).collection("Reviews").remove(query).then(
      (documents) => {
        console.log("Removed data");
      }).catch((error) => console.error(error));
  });
}

function generateTestData(count) 
{
  return new Promise((resolve,reject) => {
    const data = client.db(dbName).collection("data");

    let insertData = [];
    for (let i = 1; i <= count; i++) {
      insertData.push({
        text: "This is some text " + i,
        details: "Some more details " + i
      });
    }

    data.insertMany(insertData).then((result) => {
      console.log(`Generated ${count} pieces of data`);
      resolve(result);
    }).catch((error) => console.error(error));
  });
}


