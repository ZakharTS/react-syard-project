import React, {useContext} from "react";
import {Card, Col, Image} from "react-bootstrap";
import {Context} from "../index";

const UserProfile = () => {
    const {user} = useContext(Context);
    return (
        <Card style={{cursor: "pointer"}} className="d-flex align-items-center">
            <Col>
                <Image alt="avatar" style={{height: 48, width: 48}}
                       src={process.env.REACT_APP_API_URL + "/" + user.user.avatar}/>
                {user.user.email}
            </Col>
        </Card>
    );
}

export default UserProfile;