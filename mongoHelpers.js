const mongo = require("mongodb");

const MongoClient = mongo.MongoClient;
const mongoUrl = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.mrwko.mongodb.net?retryWrites=true&w=majority`;

let mongoClient;

const mongoConnect = async function() {
    mongoClient = await MongoClient.connect(mongoUrl);
    const db = mongoClient.db("myFirstDatabase");

    return db;
}

const addUser = function (db, code, mobile, age) {
    const collection = db.collection("notificationList");
    const updateOp = {};
    updateOp[code] =  { mobile: mobile, age: age };
    return collection.updateOne({ "name": "mobiles" }, { "$addToSet": updateOp });
};

module.exports = {mongoClient: mongoClient, connect: mongoConnect, addUser: addUser};