import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import firebase from "firebase";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'email': '',
      'password': '',
      'isLogin': '',
      'token': '',
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // console.log(firebaseUser);
        this.setState({
          'email': firebaseUser.email,
          'isLogin' : true,
          'token' : firebaseUser.l

        });
        console.log('INI DATA USER LOGIN');
        console.log(this.state);
        console.log(this.props);
        this.props.history.push("/");
      } else {
        console.log('LOGGGGGOUTTTT!!!');
        // this.props.history.push("/login")
      }
    });
  }

  handleChange(e) {
    let newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
    // console.log(this.state);
  }

  onSubmit(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const auth = firebase.auth();

    const promise = auth.signInWithEmailAndPassword(email, password);
    promise.catch(e => console.log(e));
  }

  render() {
    return <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" name="email" onChange={e => this.handleChange(e)} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock" />
                        </InputGroupText>
                      </InputGroupAddon>
                    <Input type="password" placeholder="Password" name="password" onChange={e => this.handleChange(e)} />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                      <Button name="btnLogin" color="primary" className="px-4" onClick={this.onSubmit.bind(this)}>
                          Login
                        </Button>
                      </Col>
                      <Col xs="6" className="text-right">
                      <Button color="link" className="px-0">
                          Forgot password?
                        </Button>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + "%" }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>
                        Please contact admin@gkkd.com or +62 812 8390 0102 to register your account.
                      </p>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>;
  }
}

export default Login;
