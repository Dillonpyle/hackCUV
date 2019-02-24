import React, { Component } from 'react';                                 
import './App.css';                                                       
import TrackingContainer from './Pages/TrackingContainer/TrackingContainer';    
import Navigation from './Navigation/Navigation';                             
import BillContainer from './Pages/BillContainer/BillContainer';             
import RepContainer from './Pages/RepContainer/RepContainer';                
import SearchBar from './SearchBar/SearchBar';                            
import { Route, Switch } from 'react-router-dom';                         
import { Container, Row, Col } from 'reactstrap';                                                                                                      
const civicFeedKey = "1bb55445d6mshd047e0a2e423461p1a0366jsn4e4bc674f13f";              
const port = process.env.REACT_APP_BACKEND                                

// =================================
// ERROR 404
// =================================
const My404 = () => {
  return (
    <div>
      You are lost!!!
    </div>
  )
}

class App extends Component {
  constructor(){
    super();

    this.state = {
      dropdownOpen: false,
      logged: false,
      failedLogin: false,
      failedRegister: false,
      _id: null,
      userState: "co",
      activePage: 'tracking',
      query: '',
      queryBtn: 0,
      bills: [],
      trackedBills: [],
      trackedReps: [],
      reps: []
      }
  }

  // ================================================================================================================
  //                                            TOGGLE DROPDOWN
  // ================================================================================================================
  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  // ================================================================================================================
  //                                 CHANGE STATE BASED ON USER BUTTON CLICK
  // ================================================================================================================
  changeState = (e) => {
    this.setState({
      userState: e.target.name
    }, function(){
      console.log(`USER'S STATE IS NOW: ${this.state.userState}`)
    });
  }

  // ================================================================================================================
  //                                  CHANGE QUERY STATE WHEN USER TYPES
  // ================================================================================================================ 
  handleInput = (e) => {
    this.setState({
      query: e.target.value
    }, function(){
      console.log(`SEARCHBAR SHOWS: ${this.state.query}`)
    });
  }

  // ================================================================================================================
  //                               CHANGE QUERY BUTTON STATE WHEN USER CLICKS
  // ================================================================================================================ 
  onRadioBtnClick = (btn) => {
    this.setState({ 
      queryBtn: btn
    }, function() {
      console.log(`Radio Button should now be: ${this.state.queryBtn}`);
    });
  }

  // ================================================================================================================
  //                                CHANGE ACTIVE PAGE WHEN USER NAVIGATES
  // ================================================================================================================ 
  updateNav = (page) => {
    this.setState({ 
      activePage: page
    });
  }

  // ================================================================================================================
  //                                  UPDATE STATE WITH SUCCESSFUL LOGIN
  // ================================================================================================================ 
  loginSuccess = (userId, trackedBills) => {
    let tracked = [];
    if (trackedBills) {
      tracked = trackedBills
    }
    this.setState({
      logged: true,
      failedEntry: false,
      _id: userId,
      trackedBills: tracked
    }, function() {
      console.log(`LOGGED IN. ID: ${this.state._id}, BILLS: ${this.state.trackedBills}`);
    });
  }

  // ================================================================================================================
  //                          ADD TO USER'S TRACKING LIST (MONGO AND REACT STATE)
  // ================================================================================================================
  addBillToTracking = async (billToTrack) => {
    console.log(`THIS IS THE BILL WE'RE TRYING TO TRACK:${JSON.stringify(billToTrack)}`)
    try {
        // ================================================
        // CREATE IN MONGO IF DOESNT EXIST
        // ================================================
        const createBill = await fetch(`${process.env.REACT_APP_BACKEND}bills/`, {
          method: 'POST',
          body: JSON.stringify({
            title: billToTrack.title,   
            state: billToTrack.state,
            bill_id: billToTrack.bill_id,   
            summary: billToTrack.summary,
            proposed: billToTrack.created_at,
            lastAction: billToTrack.updated_at,
          }),
          credentials: 'include',
          headers: {
          'Content-Type': 'application/json'
          }
          });
          if(!createBill.ok){
              throw Error(createBill.statusText)
          }
          const parsedCreateBill = await createBill.json();
          console.log(`TRIED TO CREATE BILL, NODE SENT:${JSON.stringify(parsedCreateBill)}`)

        // ================================================
        // MONGO: ADD TO USER'S TRACKED BILLS (IF POSSIBLE)
        // ================================================
        const isUserTracking = await fetch(`${process.env.REACT_APP_BACKEND}users/${this.state._id}/track/${billToTrack.bill_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            bill: billToTrack,
          }),
          credentials: 'include',
          headers: {
          'Content-Type': 'application/json'
        }});
        if(!isUserTracking.ok){
          throw Error(isUserTracking.statusText)
        }
        const parsedIsUserTracking = await isUserTracking.json();
        console.log("RESPONSE TO TRYING TO TRACK BILL:" + JSON.stringify(parsedIsUserTracking));
        // ==========================================
        // UPDATE COUNT IN MONGO IF USER JUST TRACKED
        // ==========================================
        if (parsedIsUserTracking.status == 200) {
          const updateBill = await fetch(`${process.env.REACT_APP_BACKEND}bills/track/${billToTrack.bill_id}`, {
          method: 'PUT',
          body: JSON.stringify({
            increment: 1,
          }),
          credentials: 'include',
          headers: {
          'Content-Type': 'application/json'
          }
          });
          if(!updateBill.ok){
              throw Error(updateBill.statusText)
          }
          const parsedUpdateBill = await updateBill.json();
          console.log(`INCREMENTED BILL ID ${JSON.stringify(parsedUpdateBill.data.bill_id)}`)
          // ================================================
          // ADD TO TRACKEDBILLS IN REACT (BASED ON DB REPLY)
          // ================================================
          let updatedArray = [...this.state.bills];
          for(let i = 0; i < updatedArray.length; i++) {
            if(updatedArray[i].bill_id == billToTrack.bill_id) {
              updatedArray[i].trackingCount ++
            }
          }

          this.setState({ 
            trackedBills: [...this.state.trackedBills, parsedUpdateBill.data],
            bills: updatedArray
          }, function() {
            //console.log(`TRACKING BILL ${this.state.trackedBills[this.state.trackedBills.length-1].bill_id}`);
            //this.getTrendingBills();
          });
        } else {
          console.log(`ALREADY TRACKING BILL ${billToTrack.bill_id}`)
        }
    } catch(err){
      console.log(err)
    }
  }

  // ================================================================================================================
  //                                                   UNTRACK BILL
  // ================================================================================================================
  untrackBill = async (billId) => {
    try {
  // ==================================================================
  // DECREMENT IN MONGO DATABASE
  // ==================================================================
      const updateBill = await fetch(`${process.env.REACT_APP_BACKEND}bills/untrack/${billId}`, {
        method: 'PUT',
        body: JSON.stringify({
            increment: -1,
        }),
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        }
      });
      if(!updateBill.ok){
        throw Error(updateBill.statusText)
      }
      const parsedUpdateBill = await updateBill.json();
      console.log(`Updated bill response from Express API:${parsedUpdateBill}`)
  // ==================================================================
  // REMOVE FROM USER'S TRACKED BILLS
  // ==================================================================
      const userUntrackBill = await fetch(`${process.env.REACT_APP_BACKEND}users/${this.state._id}/untrack/${billId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
        'Content-Type': 'application/json'
        }
      });
      if(!userUntrackBill.ok){
        throw Error(userUntrackBill.statusText)
      }
      const parsedUntrackBill = await userUntrackBill.json();
      console.log(`UNTRACKED BILL ${JSON.stringify(parsedUntrackBill.data.bill_id)}`)
  // ==================================================================
  // REMOVE FROM TRACKEDBILLS IN REACT, IF SUCCESSFUL MONGO DELETION
  // ==================================================================
      if (parsedUntrackBill.status == 200) {
        let billIds = [];
        for (let i=0; i<this.state.trackedBills; i++){
          billIds.push(this.state.trackedBills[i].bill_id)
        }
        console.log(`TRACKED BILLS: ${JSON.stringify(billIds)}`)

        let arr = [];
        this.state.trackedBills.forEach((bill) => {
          if (bill.bill_id !== billId){
            arr.push(bill);
          }
        })

        let updatedArray = [...this.state.bills];
        for(let i = 0; i < updatedArray.length; i++) {
          if(updatedArray[i].bill_id == billId && updatedArray[i].trackingCount) {
            updatedArray[i].trackingCount --
          }
        }

        this.setState({
          trackedBills: arr,
          bills: updatedArray
        }, function() {
          let billIds = [];
          for (let i=0; i<this.state.trackedBills; i++){
            billIds.push(this.state.trackedBills[i].bill_id)
          }
          console.log(`UNTRACKED BILL ${billId} TRACKED BILLS: ${billIds}.`);
          //this.getTrendingBills();
      });
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  // ================================================================================================================
  //                                           HANDLE REGISTRATION AND LOGIN
  // ================================================================================================================
  handleRegister = async (e) => {
    e.preventDefault();
    try {
        const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND}auth/register`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                trackedBills: [],
                trackedReps: []
            }),
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if(!loginResponse.ok){
            throw Error(loginResponse.statusText)
        }
        const parsedResponse = await loginResponse.json();
        console.log('UNFILTERED RESPONSE FROM EXPRESS', loginResponse);
        console.log('JSON RESPONSE FROM EXPRESS', parsedResponse);
        const jsonString = parsedResponse.data;
        const id = JSON.parse(jsonString).userId;
        const tracked = JSON.parse(jsonString).trackedBills;
        console.log('THIS IS THE ID', id);
        if (parsedResponse.status === 200){
          this.loginSuccess(id, tracked);
        } else {
          this.setState({
            failedRegister: true
          });
        }
    } catch(err){
        console.log(err)
    }
  }
  handleLogin = async (e) => {
    e.preventDefault();
    try {
        const loginResponse = await fetch(`${process.env.REACT_APP_BACKEND}users/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                trackedBills: [],
                trackedReps: []
            }),
            credentials: 'include',
            headers: {
            'Content-Type': 'application/json'
            }
        });
        if(!loginResponse.ok){
            throw Error(loginResponse.statusText)
        }
        const parsedResponse = await loginResponse.json();
        console.log('JSON RESPONSE FROM EXPRESS', parsedResponse);
        const id = parsedResponse.userId;
        const tracked = parsedResponse.trackedBills;
        console.log('THIS IS THE ID', id);
        if (parsedResponse.status === 200){
          this.loginSuccess(id, tracked);
        } else {
          this.setState({
            failedLogin: true
          })
        }
    } catch(err){
        console.log(err)
    }
  }

  // ================================================================================================================
  //                                       UPDATE QUERY STATE WITH USER INPUT
  // ================================================================================================================
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // ====================================================================================================================
  //                                    THIS SHOULD QUERY THE API WITH USER INPUT
  // ====================================================================================================================
  getBillsFromQuery = async (e) => {
    e.preventDefault();
    // ========================
    // HERE WE MAKE AN API CALL
    // ========================
    // API PARAMS
    // ==========
    const state = this.state.userState;
    let q = "";
    if (this.state.query !== ""){
      q = "&q=" + this.state.query
    }
    try {
      const response = await fetch(`https://civicfeed-civicfeed-legislation-v1.p.rapidapi.com/legislation/bills?state=${state}${q}&sort=updated_at&page=1&per_page=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'X-RapidAPI-Key': civicFeedKey
        },
      });
      if(!response.ok){
        throw Error(response.statusText);
      }
      const billsParsed = await response.json();

      // ==============================
      // NOW UPDATE THE STATE WITH DATA
      // ==============================
      let uncleanArray = [...billsParsed];
      let cleanArray = [];
      for(let i = 0; i < uncleanArray.length; i++) {
        let billObj = {
          title: uncleanArray[i].title,
          summary: uncleanArray[i].summary,
          state: uncleanArray[i].state,
          bill_id: uncleanArray[i].bill_id,
          proposed: uncleanArray[i].created_at,
          lastAction: uncleanArray[i].updated_at,
          trackingCount: 0
        };
        cleanArray.push(billObj)
      }

      this.setState({
        bills: cleanArray
      });
      
    } catch(err){
      console.log(err);
      return err
    }
  }

  render() {
    return (
      <div id="container">
        
        {/* NAVIGATION */}
        <Navigation updateNav={this.updateNav}/> <br/>

        {/* SEARCH BAR - DEFAULT 1ST BUTTON */}
        <Container>
        <Row className="justify-content-center">
          <Col xs={{size: 'auto'}}>
            <SearchBar 
              getBillsFromQuery={this.getBillsFromQuery} 
              onRadioBtnClick={this.onRadioBtnClick} 
              selected={this.state.queryBtn} 
              handleInput={this.handleInput}
              dropdownOpen={this.state.dropdownOpen}
              toggle={this.toggle}
              userState={this.state.userState}
              changeState={this.changeState}
            />
          </Col>
        </Row> <br/>

        {/* MAIN CONTENT */}
        <main>
          <Switch>
            <Route exact path="/(|tracking)" render={(routeProps) => (
              <TrackingContainer {...routeProps} 
                logged={this.state.logged} 
                trackedBills={this.state.trackedBills} 
                trackedReps={this.state.trackedReps} 
                untrackBill={this.untrackBill} 
                handleLogin={this.handleLogin} 
                handleChange={this.handleChange}
                handleRegister={this.handleRegister}/>)}
            />

            <Route exact path="/bills" render={(routeProps) => 
              (<BillContainer {...routeProps} 
              untrackBill={this.untrackBill} 
              trackedBills={this.state.trackedBills} 
              bills={this.state.bills} 
              addBillToTracking={this.addBillToTracking}
              logged={this.state.logged}
              />)}
            />

            <Route exact path="/legislators" render={(routeProps) => 
              (<RepContainer {...routeProps} 
              info={this.state.reps} />)}
            />

            <Route component={ My404 }/>
          </Switch>
        </main>
        </Container>

      </div>
    );
  }
}

export default App;
