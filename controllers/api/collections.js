const uploadFile = require('../../config/upload-file');
const deleteFile = require('../../config/delete-file');
const Image = require('../../models/image');
const Collection = require('../../models/collection');

module.exports = {
    index,
    create,
    delete: deleteCollection,
    update,
    upload,
    uploadTrack,
    updateTrack,
    deleteTrack
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

    // Delete Tracks from S3 & MongoDB
    for(let i = 0; i < collection.tracks.length; i++) {
        const track = collection.tracks[i];
        await deleteFile(track.url);
        collection.tracks.remove(track._id);
    }

    // Delete Image from S3 & MongoDB
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
        if (req.file) {
          const imageURL = await uploadFile(req.file);
          const imageDoc = await Image.create({
            url: imageURL,
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

async function uploadTrack(req, res) {
    try {
        const collection = await Collection.findById(req.params.id).populate('user');
        if (req.file) {
            console.log(req.file);
            const trackUrl = await uploadFile(req.file);
            const trackDoc = collection.tracks.create({
                title: req.body.title,
                url: trackUrl,
            });
            collection.tracks.push(trackDoc);
            await collection.save();
            res.json(collection);
        } else {
            throw new Error('Must select a file');
          }
      } catch (err) {
          res.status(400).json(err.message);
      }
  }

async function updateTrack(req, res) {
   try{
       const collection = await Collection.findOne({'tracks._id': req.params.id}).populate('user');
       const updatedTrack = collection.tracks.id(req.params.id);
       
       updatedTrack.listens += 1;
       const updatedCollection = await collection.save();
   
       res.json(updatedCollection)
   } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Failed to update track" });
   }
}

async function deleteTrack(req, res) {
    const collection = await Collection.findOne({'tracks._id': req.params.id}).populate('user');
    const track = collection.tracks.id(req.params.id);
    const trackUrl = track.url;
    
    collection.tracks.remove(req.params.id);

    // Delete from AWS S3
    await deleteFile(trackUrl);

    await collection.save();
    res.json(collection);
}