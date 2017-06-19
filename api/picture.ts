import * as express from 'express';
import Picture from '../models/pictures';
import * as mongoose from 'mongodb';

let router = express.Router();

//get all pictures
router.get('/', (req, res) => {
  Picture.find().then((pictures) => {
    res.json(pictures);
  }).catch((err) => {
    res.status(500);
    console.error(err);
  })
});

//get a single picture by id
router.get('/:id', (req, res) => {
  Picture.findById(req.params['id']).then((picture) => {
    res.json(picture);
  });
});

//Create new picture
router.post('/', (req, res) => {
  let picture = new Picture();

  picture.filename = req.body.filename;
  picture.description = req.body.description;
  picture.ImageUrl = req.body.ImageUrl;

  //save new picture
  console.log('test');
  picture.save().then((newPicture) => {
    res.json(newPicture);
  }).catch((err) => {
    console.log('test1');
    res.status(400).json(err);
  });
});

//Update existing picture
router.post('/:id', (req, res) => {
  let pictureId = req.params.id;

  Picture.findById(pictureId).then((picture) => {
    picture.filename = req.body.filename;
    picture.description = req.body.filename;
    picture.ImageUrl = req.body.ImageUrl;

    //save updated picture
    picture.save().then((updatedPicture) => {
      res.json(updatedPicture);
    }).catch((err) => {
      res.status(400).json(err);
    });

  }).catch(() => {
    res.sendStatus(404);
  });
});

//delete picture

router.delete('/:id', (req,res) => {
  let pictureId = req.params.id;
  Picture.remove({_id:pictureId}).then(() => {
    res.sendStatus(200);
  }).catch((err) => {
    res.status(500);
    console.log(err);
  });
});

export default router;
