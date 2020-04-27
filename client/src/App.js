import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
const RTCMultiConnection = require("rtcmulticonnection");
function App() {
  let connection = new RTCMultiConnection();
  console.log('connection', connection);
  
  connection.socketURL = '/';

  connection.socketMessageEvent = 'video-conference-demo';

  connection.session = {
    audio:true,
    video:true
  }
  connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio:true,
    OfferToReceiveVideo:true
  }
  const openRoom = () => {
      
  }
  return (
    <div>
      <h1 className="text-center">Video conferencing using RTCMultiConnection</h1>
      <div className="text-center">
          <div>
            <label><input type="checkbox" id="record-entire-conference"/> Record Entire Conference In The Browser?</label>
          <span id="recording-status"></span>
          <button id="btn-stop-recording" style={{display:"none"}}>Stop Recording</button>
          <br></br>
          <input type="text" id="room-id"  value="abcdef" />
          <button id="open-room" onClick={openRoom}>Open Room</button>
          <button id="join-room">Join Room</button>
          <button id="open-or-join-room">Auto Open Or Join Room</button>
        </div>

        <div id="videos-container" style={{margin: "20px 0"}}></div>

        <div id="room-urls" ></div>
      </div>
      
    </div>
  );
}

export default App;
