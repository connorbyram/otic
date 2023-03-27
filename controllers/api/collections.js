const Collection = require('../../models/collection')

module.exports = {
    index,
    create
}

async function index(req, res) {
    try{
        const collections = await Collection.find({})
            .populate('creator').exec();
        res.json(collections);
    } catch(err) {
        res.status(400).json(err)
    }
}

async function create(req, res) {
    try{
        req.body.creator = req.user._id;
        console.log('Create Function', req.body);
        const collection = await Collection.create(req.body);
        res.json(collection)
    } catch(err) {
        res.status(400).json(err)
    }
}