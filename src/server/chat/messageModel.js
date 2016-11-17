import mongoose from 'mongoose';


let Schema = mongoose.Schema;

let messageSchema = new Schema ({
  api: String,
  text: String,
  types: Array
},
{
  timestamps: true
});


export default mongoose.model('Message', messageSchema)
