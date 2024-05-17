import mongoose from 'mongoose';

const characterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  health: {
    type: Number,
    default: 500
  },
  power: {
    type: Number,
    default: 100
  }
});

const Character = mongoose.model('Character', characterSchema);

export default Character;
