const mongodb = require('mongodb')

const MongoClient = mongodb.MongoClient

const ConnectionURL = 'mongodb://127.0.0.1:27017'
const DBName = 'jwadshop'
let DBSet;

const connectDB = (cb) => {
    MongoClient.connect(ConnectionURL, { useNewUrlParser: true })
    .then(client => {
        console.log('connected!')
        DBSet = client.db(DBName)
        cb(client)
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}

const getDB = () => {
    if (DBSet)
        return DBSet
    throw 'DataBase Not Found!!! util/database/line:25'
}

exports.connectDB = connectDB
exports.getDB = getDB