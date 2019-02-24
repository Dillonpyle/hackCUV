import React from 'react'
import { Card, Button, CardTitle, CardText, CardGroup, Row, Col } from 'reactstrap';

const RepItem = (props) => {
    return (
        <Card body>
            <Row>
                <Col xs="2" md="1">
                    <div className="centerButton">
                        <img className="image" src={"#"} />
                        {/* <Button onClick={props.addBillToTracking.bind(this,props.billInfo)}>Track</Button> */}
                    </div>
                </Col>
                <Col xs="10" md="11">
                    <CardTitle className="legislatorsName"><h4>{props.info.firstName + " " + props.info.lastName}</h4></CardTitle>
                    <CardText>{props.info.state.toUpperCase() + " - " + props.info.party.slice(0, 1).toUpperCase()}</CardText>
                </Col>
            </Row>
        </Card>
    )
}

export default RepItem