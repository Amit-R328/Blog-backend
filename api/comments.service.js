const MongoClient = require('mongodb').MongoClient

const dbName = 'blog'

var dbConn = null

async function query(id) {
    try {
        const collection = await getCollection('comments')
        var reviews = await collection.aggregate([
            {
                $match: {
                    post: id
                }
            },
            {
                $addFields: {
                    post: {
                        $toObjectId: "$post"
                    }
                }
            },
            {
                $lookup:
                {
                    localField: 'post',
                    from: 'posts',
                    foreignField: '_id',
                    as: 'ofPost',
                },
            },
            {
                $unwind: '$ofPost',
            },
        ]).toArray()
        return reviews
    } catch (err) {
        console.log('Cannot find reviews ---')
        throw err
    }
}

async function getCollection(collectionName) {
    try {
        const db = await connect()
        const collection = await db.collection(collectionName)
        return collection
    } catch (err) {
        throw err
    }
}

async function connect() {
    if (dbConn) return dbConn
    try {
        const client = await MongoClient.connect(process.env.Mongo_url, { useNewUrlParser: true, useUnifiedTopology: true })
        const db = client.db(dbName)
        const dbConn = db
        return db
    } catch (err) {
        throw err
    }
}


module.exports = {
    query,
}