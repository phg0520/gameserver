import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  item_code: {
    type: String,
    required: true,
    unique: true
  },
  item_name: {
    type: String,
    required: true
  },
  item_ability: {
    type: String,
    required: true
  }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
