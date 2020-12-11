import React from "react";
import { render } from "react-dom";
import {Route, BrowserRouter as Router} from "react-router-dom";
import { Col, Divider, Row, } from 'antd';
import 'antd/dist/antd.css';

export default class TransferPage extends React.Component{
  state = {
    loading: true,
    person: null
  };

  async componentDidMount(){
    const url = "";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ person : data, loading: false});
  }

  render() {
    return (
      <div style={{ padding: 50 }}>
        <Row>
          <Col>
            <Divider>Transaction Receipt</Divider>
          </Col>
        </Row>

        <Row style={{ marginTop: 1 }}>
          <Col span={20} offset={0}>
            <table>
              <tr>
                <th>Name:</th>
                <td>{this.state.person.accountName}</td>
              </tr>
              <p></p>
              <tr>
                <th>Bank Account No:</th>
                <td>{this.state.person.accountNumber}</td>
              </tr>
              <p></p>
              <tr>
                <th>Transfer Amount:</th>
                <td>${this.state.person.Amount}</td>
              </tr>
              <p></p>
              <tr>
                <th>Account Balance:</th>
                <td>${this.state.person.availableBal}</td>
              </tr>
              <p></p> 
              <tr>
                <th>Transaction No:</th>
                <td>{Math.random}</td>
              </tr>
              <p></p>
              <tr>
                <th>Status:</th>
                <td> </td>
              </tr>
            </table>
          </Col>
        </Row>
        <Router>
        <Route path="/" exact component={Home} /><button type="Submit">Home</button>
        </Router>
      </div>
    )
  }
}