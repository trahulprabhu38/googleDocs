const mongoose = require('mongoose')



const DocumentSchema = new mongoose.Schema({
  _id: String,
  data: Object,
})

const Document = mongoose.model("Document", DocumentSchema)
module.exports = Document;