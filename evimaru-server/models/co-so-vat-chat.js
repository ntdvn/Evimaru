const mongoose = require('mongoose');
const coSoVatChatSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  type: {
      type: String,
      required: true
  },
  detail: {
      type: String,
      default: 'Không có'
  },
  quantity: {
      type: Number,
      default: 0
  },
  condition: {
      type: String,
      default: 'Không có'
  },
  coSoDaoTao:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"CoSoDaoTao"
  }
});

CoSoVatChat = mongoose.model('CoSoVatChat', coSoVatChatSchema);
module.exports = CoSoVatChat;
