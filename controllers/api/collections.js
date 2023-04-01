const uploadFile = require('../../config/upload-file');
const deleteFile = require('../../config/delete-file');
const Image = require('../../models/image');
const Collection = require('../../models/collection');

module.exports = {
    index,
    create,
    delete: deleteCollection,
    update,
    upload
}

async function index(req, res) {
    try{
        const collections = await Collection.find({})
            .populate('user')
            .sort('-createdAt');
        res.json(collections);
    } catch(err) {
        res.status(400).json(err)
    }
}

async function create(req, res) {
    try{
        req.body.user = req.user._id;
        const collection = await Collection.create(req.body);
        await collection.populate('user');
        res.json(collection);
    } catch(err) {
        console.log(err); 
        res.status(400).json(err);
    }
}

async function deleteCollection(req, res) {
    const collection = await Collection.findById(req.params.id);

    // Delete image from S3 & MongoDB
    const image = await Image.findOneAndDelete({url: collection.imageUrl});
    await deleteFile(image.url);

    const removeCollection = await Collection.findOneAndDelete({_id: req.params.id, user: req.user._id});
    res.json(removeCollection)
}

async function update(req, res) {
    try {
        const collection = await Collection.findById(req.params.id);

        // Get the old image URL from the database
        const oldImageUrl = collection.imageUrl;

        // Update the collection
        const updatedCollection = await Collection.findOneAndUpdate(
            { _id: req.params.id, user: req.user._id },
            req.body,
            { new: true }
        ).populate('user');

        // Delete the old image if the new image URL is different
        if (oldImageUrl !== updatedCollection.imageUrl) {
            await deleteFile(oldImageUrl);
            await Image.findOneAndDelete({ url: oldImageUrl });
        }

        res.json(updatedCollection);
    } catch (err) {
        console.log(err.message);
    }
}

async function upload(req, res) {
    try {
        console.log('upload');
        if (req.file) {
          // TODO: Remove the console.log after you've verified the output
          console.log(req.file);
          // The uploadFile function will return the uploaded file's S3 endpoint
          const imageURL = await uploadFile(req.file);
          const imageDoc = await Image.create({
            url: imageURL,
            // As usual, other inputs sent with the file are available on req.body
            title: req.body.title
          });
          res.json(imageDoc);
        } else {
          throw new Error('Must select a file');
        }
      } catch (err) {
        res.status(400).json(err.message);
      }
     
}