import React from "react";
import { v1 as uuid } from "uuid";
import {InputGroup, FormControl, Button,
        Row, Col} from 'react-bootstrap';
const CreateRoom = (props) => {
    const [defaultButton, setDefaultButton]
    // function create() {
    //     const id = uuid();
    //     props.history.push(`/room/${id}`);
    // }

    return (
        <div>
            <Row>
                <Col>
                    <p>Create Video Conference</p>
                    <InputGroup className="mb-3">
                        <FormControl
                        placeholder="Username"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        />
                        <InputGroup.Append>
                        <Button variant="outline-secondary">Create</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Col>
                <Col>
                    <p>Join Video Rooms</p>
                </Col>
            </Row>
            
        </div>
    );
};

export default CreateRoom;
