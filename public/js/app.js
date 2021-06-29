
let socket = io()

// 7. Front-End Side: If event is received in socket
socket.emit('join', "someRoomName" )


// 8. After receiving event on front-end do something
// orderUpdated --> eventName
socket.on("orderUpdated", (data) =>{
     console.log("Front-End: "+JSON.stringify(data))
      alert("Hello I'm realtime event")
      console.log("I received realtime event")
} )


// function emitEvent(){
    

// }
