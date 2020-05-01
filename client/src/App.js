import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
const RTCMultiConnection = require("rtcmulticonnection");
function App() {

  return (
    <div>
      <header style={{marginBottom: "20px"}}>
        <span class="logo-text">Dashboard Example</span>

      <div style={{float: "right",marginTop: "15px"}}>
        <button class="btn btn-primary" data-toggle="modal" data-target="#startRoomModel">Create A New Room</button>
        <button id="btn-show-join-hidden-room" class="top-span btn btn-secondary" data-toggle="modal" data-target="#joinRoomModel">Join A Room</button>
        <span class="top-span">Active rooms: <span id="active-rooms">0</span></span>
      </div>
      </header>
      
      <div class="modal fade" id="startRoomModel" tabindex="-1" role="dialog" aria-labelledby="startRoomModelLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="startRoomModelLabel">Create A New Room</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body" style={{paddingBottom:"0"}}>
              <form>
                <div class="form-group">
                  <p>
                    <label for="txt-roomid" class="col-form-label">Enter Room ID:</label>
                    <input type="text" class="form-control" id="txt-roomid"/>
                  </p>

                  <p>
                    <label for="txt-user-name" class="col-form-label">Enter Your Name:</label>
                    <input type="text" class="form-control" id="txt-user-name"/>
                  </p>

                  <p style={{display:"none"}}>
                    <label for="txt-room-password" class="col-form-label">Enter Room Password:</label>
                    <input type="text" class="form-control" id="txt-room-password"/>
                  </p>

                  {/* <a href="" 
                  style={{float:"right", marginBottom:"10px", fontSize:"14px"}} 
                  onClick={event.preventDefault(),$('.more-options').show(),$(this).hide()}>Show More Options</a> */}

                  <p class="more-options" style={{marginBottom:"0"}}>
                    <label class="col-form-label"><input type="checkbox" id="chk-room-password"/> Set Room Password?</label>
                  </p>

                  <p class="more-options" style="margin-top: 0; margin-bottom: 0; display: none;"
                  style={{marginTop:"0", marginBottom:"0"}}>
                    <label class="col-form-label"><input type="checkbox" id="chk-hidden-room"/> Hidden Room? (Hide from the list)</label>
                  </p>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="btn-create-room">Create</button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="joinRoomModel" tabindex="-1" role="dialog" aria-labelledby="joinRoomModelLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="joinRoomModelLabel">Join A Room</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <p>
                    <label for="txt-roomid-hidden" class="col-form-label">Enter Room ID:</label>
                    <input type="text" class="form-control" id="txt-roomid-hidden"/>
                  </p>

                  <p>
                    <label for="txt-user-name-hidden" class="col-form-label">Enter Your Name:</label>
                    <input type="text" class="form-control" id="txt-user-name-hidden"/>
                  </p>

                  <p style={{display:"none"}}>
                    <label for="txt-room-password-hidden" class="col-form-label">Enter Room Password:</label>
                    <input type="text" class="form-control" id="txt-room-password-hidden"/>
                  </p>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="btn-join-hidden-room">Join</button>
            </div>
          </div>
        </div>
      </div>

      {/* <div id="confirm-box-topper" style="display:none;z-index:99999999;top:0;left:0;bottom:0;right:0;width:100%;height:100%;position:fixed;background:#000000ad;"></div> */}
      <div id="alert-box" class="modal fade" style={{display:"none", zIndex:"999999999999999"}}>
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="alert-title">Alert</h5>
                            <button type="button" class="close btn-alert-close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div id="alert-message" class="model-list"></div>
                        </div>

                        <div class="modal-footer">
                            <p id="alert-special"></p>
                            <button class="btn btn-primary btn-alert-close">Close</button>
                        </div>
                    </div>
                </div>
      </div>
        

      <div id="confirm-box" class="modal fade" style={{display:"none", zIndex:"999999999999999"}}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirm-title">Please Confirm</h5>
                        <button type="button" class="close btn-confirm-close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div id="confirm-message" class="modal-body"></div>

                    <div class="modal-footer">
                        <button class="btn btn-confirm-close" id="btn-confirm-close">Cancel</button>
                        <button class="btn btn-primary" id="btn-confirm-action">Confirm</button>
                    </div>
                </div>
            </div>
      </div>


      <section style={{minHeight:"400px"}}>
        <table class="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Room ID</th>
              <th>Owner ID</th>
              <th>Session</th>
              <th>Extra</th>
              <th>Participants</th>
              <th>Join</th>
            </tr>
          </thead>
          <tbody id="rooms-list"><tr><td colspan="9">No active room found for this demo.</td></tr></tbody>
        </table>
      </section>
                  
    </div>
  );
}

export default App;
