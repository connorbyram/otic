const uploadFile = require('../../config/upload-file');
const Collection = require('../../models/collection')

module.exports = {
    index,
    create
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
        if (req.file){
            req.body.creator = req.user._id;
            console.log('Create Function', req.body, req.file);

            const artURL = await uploadFile(req.file);

            const collection = await Collection.create({
                art: artURL,
                ...req.body,
            });
            res.json(collection)
        } else {
            throw new Error ('Must select a file');
        }
    } catch(err) {
        res.status(400).json(err)
    }
}