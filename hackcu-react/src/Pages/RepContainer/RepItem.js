import React from 'react'
import { Card, Button, CardTitle, CardText, CardGroup, Row, Col } from 'reactstrap';

const RepItem = (props) => {
    return (
        <Card body>
            <Row>
                <Col xs="1">
                    <div className="centerButton">
                        <img className="image" src={"/images/" +props.info.image}/>
                        {/* <Button onClick={props.addBillToTracking.bind(this,props.billInfo)}>Track</Button> */}
                    </div>
                </Col>
                <Col sm="11">
                    <CardTitle><h4>{props.info.firstname + " " + props.info.lastname}</h4></CardTitle>
                    <CardText>{props.info.state + " - " + props.info.party}</CardText>
                </Col>
            </Row>
        </Card>
    )
}

export default RepItem