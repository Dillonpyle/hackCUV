import React from 'react'
import { Button, ButtonGroup, Container, Col, Row, Input, InputGroup, Form, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const SearchBar = (props) => {
    return (
        <Row>
            {/* FILTER BUTTONS */}
            <Col xs={{ size: 'auto', offset: 0 }}>
                <ButtonGroup>

                    <ButtonDropdown isOpen={props.dropdownOpen} toggle={props.toggle.bind(this)}>
                        <DropdownToggle caret color="primary">
                            {/* THIS VALUE SHOULD PULL FROM USERS HOME STATE */}
                            {props.userState}
                        </DropdownToggle>
                        <DropdownMenu onClick={props.changeState.bind(this)}>
                            <DropdownItem></DropdownItem>
                            <DropdownItem name="ALL" active={props.userState === "ALL"}>ALL</DropdownItem>
                            <DropdownItem name="AL" active={props.userState === "AL"}>AL</DropdownItem>
                            <DropdownItem name="AK" active={props.userState === "AK"}>AK</DropdownItem>
                            <DropdownItem name="AZ" active={props.userState === "AZ"}>AZ</DropdownItem>
                            <DropdownItem name="AR" active={props.userState === "AR"}>AR</DropdownItem>
                            <DropdownItem name="CA" active={props.userState === "CA"}>CA</DropdownItem>
                            <DropdownItem name="CO" active={props.userState === "CO"}>CO</DropdownItem>
                            <DropdownItem name="CT" active={props.userState === "CT"}>CT</DropdownItem>
                            <DropdownItem name="DE" active={props.userState === "DE"}>DE</DropdownItem>
                            <DropdownItem name="DC" active={props.userState === "DC"}>DC</DropdownItem>
                            <DropdownItem name="FL" active={props.userState === "FL"}>FL</DropdownItem>
                            <DropdownItem name="GA" active={props.userState === "GA"}>GA</DropdownItem>
                            <DropdownItem name="HI" active={props.userState === "HI"}>HI</DropdownItem>
                            <DropdownItem name="ID" active={props.userState === "ID"}>ID</DropdownItem>
                            <DropdownItem name="IL" active={props.userState === "IL"}>IL</DropdownItem>
                            <DropdownItem name="IN" active={props.userState === "IN"}>IN</DropdownItem>
                            <DropdownItem name="IA" active={props.userState === "IA"}>IA</DropdownItem>
                            <DropdownItem name="KS" active={props.userState === "KS"}>KS</DropdownItem>
                            <DropdownItem name="KY" active={props.userState === "KY"}>KY</DropdownItem>
                            <DropdownItem name="LA" active={props.userState === "LA"}>LA</DropdownItem>
                            <DropdownItem name="ME" active={props.userState === "ME"}>ME</DropdownItem>
                            <DropdownItem name="MD" active={props.userState === "MD"}>MD</DropdownItem>
                            <DropdownItem name="MA" active={props.userState === "MA"}>MA</DropdownItem>
                            <DropdownItem name="MI" active={props.userState === "MI"}>MI</DropdownItem>
                            <DropdownItem name="MN" active={props.userState === "MN"}>MN</DropdownItem>
                            <DropdownItem name="MS" active={props.userState === "MS"}>MS</DropdownItem>
                            <DropdownItem name="MO" active={props.userState === "MO"}>MO</DropdownItem>
                            <DropdownItem name="MT" active={props.userState === "MT"}>MT</DropdownItem>
                            <DropdownItem name="NE" active={props.userState === "NE"}>NE</DropdownItem>
                            <DropdownItem name="NV" active={props.userState === "NV"}>NV</DropdownItem>
                            <DropdownItem name="NH" active={props.userState === "NH"}>NH</DropdownItem>
                            <DropdownItem name="NJ" active={props.userState === "NJ"}>NJ</DropdownItem>
                            <DropdownItem name="NM" active={props.userState === "NM"}>NM</DropdownItem>
                            <DropdownItem name="NY" active={props.userState === "NY"}>NY</DropdownItem>
                            <DropdownItem name="NC" active={props.userState === "NC"}>NC</DropdownItem>
                            <DropdownItem name="ND" active={props.userState === "ND"}>ND</DropdownItem>
                            <DropdownItem name="OH" active={props.userState === "OH"}>OH</DropdownItem>
                            <DropdownItem name="OK" active={props.userState === "OK"}>OK</DropdownItem>
                            <DropdownItem name="OR" active={props.userState === "OR"}>OR</DropdownItem>
                            <DropdownItem name="PA" active={props.userState === "PA"}>PA</DropdownItem>
                            <DropdownItem name="RI" active={props.userState === "RI"}>RI</DropdownItem>
                            <DropdownItem name="SC" active={props.userState === "SC"}>SC</DropdownItem>
                            <DropdownItem name="SD" active={props.userState === "SD"}>SD</DropdownItem>
                            <DropdownItem name="TN" active={props.userState === "TN"}>TN</DropdownItem>
                            <DropdownItem name="TX" active={props.userState === "TX"}>TX</DropdownItem>
                            <DropdownItem name="UT" active={props.userState === "UT"}>UT</DropdownItem>
                            <DropdownItem name="VT" active={props.userState === "VT"}>VT</DropdownItem>
                            <DropdownItem name="VA" active={props.userState === "VA"}>VA</DropdownItem>
                            <DropdownItem name="WA" active={props.userState === "WA"}>WA</DropdownItem>
                            <DropdownItem name="WV" active={props.userState === "WV"}>WV</DropdownItem>
                            <DropdownItem name="WI" active={props.userState === "WI"}>WI</DropdownItem>
                            <DropdownItem name="WY" active={props.userState === "WY"}>WY</DropdownItem>
                        </DropdownMenu>
                    </ButtonDropdown>

                    <Button color="primary" onClick={props.onRadioBtnClick.bind(this, 3)} active={props.selected === 1}>US</Button>
                </ButtonGroup>
            </Col>

            {/* SEARCH BAR */}
            <Col xs={{ size: 'auto' }}>
                <Form className='searchBar' onSubmit={props.getBillsFromQuery.bind(this)}>
                    <InputGroup>
                        <Input placeholder="Search Bills" onChange={props.handleInput.bind(this)} />
                    </InputGroup>
                    <Input type="Submit" value="Search" />
                </Form>
            </Col>
        </Row>
    )
}

export default SearchBar