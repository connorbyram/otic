const Collection = require('../../models/collection')

module.exports = {
    index,
    create,
    delete: deleteCollection
}

async function index(req, res) {
    try{
        const collections = await Collection.find({})
            .populate('user').exec();
        res.json(collections);
    } catch(err) {
        res.status(400).json(err)
    }
}

async function create(req, res) {
    try{
        req.body.user = req.user._id;
        const collection = await Collection.create(req.body);
        res.json(collection);
    } catch(err) {
        console.log(err); 
        res.status(400).json(err);
    }
}

async function deleteCollection(req, res) {
    const removeCollection = await Collection.findOneAndDelete({_id: req.params.id, user: req.user._id});
    res.json(removeCollection)
}