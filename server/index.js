const mongoose = require("mongoose")
const connectToDataBase = require('./db/connectToDb.js')
const Document = require('./models/document.js')

connectToDataBase()

const defaultValue = ""

const io = require('socket.io')(5050, {
    cors: {
        origin :"http://localhost:5174",
        methods: ['GET', 'POST']
    },
}); 

 io.on("connection", socket => {
  socket.on("get-document", async documentId => {
    const document = await findOrCreateDocument(documentId)
    socket.join(documentId)
    socket.emit("load-document", document.data)
 
    socket.on("send-changes", delta => {
      socket.broadcast.to(documentId).emit("receive-changes", delta)
    })

    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

async function findOrCreateDocument(id) {
  if (id == null) return

  const document = await Document.findById(id)
  if (document) return document
  return await Document.create({ _id: id, data: defaultValue })
}
