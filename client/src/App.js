import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {Button} from 'react-bootstrap';
const RTCMultiConnection = require("rtcmulticonnection");

function App() {
  // const elmPeers = [];
  const [peers, setPeers]  = useState();
  const roomId = useRef();
  let connection = new RTCMultiConnection();
  connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';
  connection.session = {
    audio:true,
    video:true
  }
  connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio:true,
    OfferToReceiveVideo:true
  }
  const openOrJoinRoom = () => {
    connection.openOrJoin(roomId.current.value || 'pre-id');
    console.log('roomId', roomId.current.value);
  }
  let videosContainer = document.getElementById("videos-container");
  connection.onstream = (event) => {
    console.log('element', event.userid);
    videosContainer.appendChild(event.mediaElement);
  }
  useEffect(()=>{
    let  peerss = connection.peers;
    
    setPeers(peerss);
  },[])
  console.log('connection', connection);
  console.log('peers',peers);
  
  return (
    <div>
      <input ref={roomId}/>
      <Button onClick={openOrJoinRoom}>Open or join room</Button>
      <div id="videos-container"></div>
    </div>
    
  );
}

export default App;
