import * as mongoose from 'mongoose';

export interface IPicture extends mongoose.Document {

   filename: string;
   description: string;
   ImageUrl: string;
}

let pictureSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: [true, 'Photo Name is required!'],
    minlength: [2, 'Filename must be 2 or more characters!']
  },

  description: {
    type: String,
    required: [true, 'Description is required!'],
    minlength: [3, 'Description must be 3 or more characters!']
  },

  ImageUrl: {
    type: String,
    minlength: 3
  }
});

export default mongoose.model<IPicture>('Picture', pictureSchema);
