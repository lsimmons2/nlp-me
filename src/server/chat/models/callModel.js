
import mongoose from 'mongoose';


let Schema = mongoose.Schema;

let callSchema = new Schema ({
  api: String,
  url: String,
  text: String,
  type: String,
  response: Object,
  error: Object
},
{
  timestamps: true
});


export default mongoose.model('Call', callSchema)
