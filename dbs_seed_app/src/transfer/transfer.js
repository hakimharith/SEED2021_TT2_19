import React from "react";
import { render } from "react-dom";
import {Route, BrowserRouter as Router} from "react-router-dom";
import { Col, Divider, Row, } from 'antd';
import 'antd/dist/antd.css';

export default class Transfer extends React.Component{
  state = {
    loading: true,
    person: null
  };

  async componentDidMount(){
    const url = " ";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ person : data, loading: false});
  }

  render() {
    return(
      <div className="abc">
        <h1>Transfer Page</h1>
        <form>
        <fieldset>
          <label>
            <p>Name:</p>
            <p>Bank Account:</p>
            <input accountNumber="Bank Account"/>
            <p>Transfer Amount:</p>
            <input TransferAmount="Transfer Amount"/>
          </label>
        </fieldset>
        <Router>
        <Route path="/transferdone" exact component={transferdone} />  <button type="Submit">Transfer</button>
        </Router>
        </form>
      </div>
    )
  }