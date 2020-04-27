import React, { useState, useEffect, useRef } from "react";
import {v1 as uuid} from "uuid";
import {InputGroup, FormControl, Button,
        Row, Col} from 'react-bootstrap';
import io from 'socket.io-client';
import { Socket } from "net";
const CreateRoom = (props) => {
    const [defaultButton, setDefaultButton] = useState("Create");
    const [defaultUuid, setDefaultUuid] = useState("");
    const [roomIds, setRoomIds] = useState([]);
    const [socketCurrent, setSocketCurrent] = useState();

    const socket = useRef();
    useEffect(()=>{
        socket.current = io.connect("/");
        setSocketCurrent(socket.current);
        socket.current.on("roomIds", roomIds => {
            setRoomIds(roomIds);
        })
    },[])

    const create = ()=>{
        if (defaultButton === "Create"){
            const id = uuid();
            setDefaultUuid(id);
            socketCurrent.emit('create new uuid', id);
            setDefaultButton("Connect");
        }
        else {
            props.history.push(`/room/${defaultUuid}`);
        }
    }
    const elmRoomIds = roomIds.map(roomId => {
        return(
            <div>Join <Button>{roomId}</Button></div>
        )
    })
    return (
        <div>
            <Row>
                <Col>
                    <p>Create Video Conference</p>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Create new rooms video conference"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        defaultValue={defaultUuid}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={create}>{defaultButton}</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                <Col>
                    <p>Join Video Rooms</p>
                    <div>
                        {elmRoomIds}
                    </div>
                </Col>
            </Row>
            
        </div>
    );
};

export default CreateRoom;
