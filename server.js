const path = require('path')
const express = require('express')
const Emitter = require('events')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')

const app = express()
const PORT = 3000

// 4. Creating event emitter with node.js inbuilt moduel events
const eventEmitter = new Emitter()

// set eventEmitter
// app.set("eventEmitter",eventEmitter)

app.use(express.static('public'))


// Routes
app.get("/", (req,res)=>{
    res.render("hello")
})

app.get("/updateSomething/:id",(req,res)=>{
    console.log(req.params.id)
    if(req.params.id == 5){
        console.log("Emitting OrderUpdated Event")
        // 5. Emitting the event 
        eventEmitter.emit("orderUpdated", { somedata: "Hello Socket" })
    }

    res.send("updated")
})

//===== Set Template Engine ==========
app.use(expressLayout)
app.set('views',path.join(__dirname, 'resources/views')) // sets views
app.set('view engine', 'ejs')  // Tell app to use ejs template engine



const server = app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})

// 1. Socket.io setup
const io = require('socket.io')(server)

// 2. Setting up connection
io.on('connection', (socket) => {
    console.log("Socket id: "+socket.id)
    //3. Join the room
    socket.on('join', (roomName) => {
        console.log("Room Name: "+roomName)
        socket.join(roomName)
    })
})


// 6. When received an event from eventEmitter then emit the event using socket.io
eventEmitter.on("orderUpdated", (data) => {
    // emitting realtime event with socket to roomName
    // orderUpdated --> is event name
    console.log("data: "+JSON.stringify(data))
    io.to("someRoomName").emit("orderUpdated", data)
})