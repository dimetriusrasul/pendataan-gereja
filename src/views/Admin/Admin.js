import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import firebase from 'firebase';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      email:'',
      password:'',
      confirmPassword:'',
      accessLevel:'persekutuan',
      dataAdmin:{},
      indexAdmin:null,
    };
  }
  componentDidMount() {
    var ref = firebase.app().database().ref('/admin');
    ref.once('value')
      .then(json => {
        this.setState({ dataAdmin: json.val() });
        
        for (var key in this.state.dataAdmin) {
          if (this.state.dataAdmin.hasOwnProperty(key)) {
            this.setState({ indexAdmin: key })
          }
        }

      });
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
    if (this.state.modal === false)
      this.setState({
        email: '',
        password: '',
        confirmPassword: '',
        accessLevel: 'persekutuan',
      })
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onSubmit(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const auth = firebase.auth();

    if(this.state.password !== this.state.confirmPassword)
    {
      alert('password did not match');
      this.setState({
        password: '',
        confirmPassword: '',
      })
    }else{
      const promise = auth.createUserWithEmailAndPassword(email, password);
      promise
      .then(() => {
        let adminId = +this.state.indexAdmin + 1;

        firebase.database().ref(`admin/${adminId}`).set({
          email:this.state.email,
          accessLevel:this.state.accessLevel,
        })
        window.location.reload();
      })
      .catch(e => console.log(e));
    }
  }

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Admin
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="6" xs="12" />
                  <Col md="6" xs="12">
                    <Button onClick={this.toggleModal} className="mr-1 float-right" color="success">
                      Add admin&nbsp;
                      <i className="nav-icon icon-pencil" />
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                      <ModalHeader toggle={this.toggleModal}>Register</ModalHeader>
                      <ModalBody>
                        <Row>
                          <Col>
                            <Card>
                              <CardHeader>
                                <strong>
                                  New Admin
                                </strong>
                              </CardHeader>
                              <CardBody>
                                <FormGroup row className="my-0">
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="obPria">Email</Label>
                                      <Input required type="email" id="email" name="email" onChange={this.onChange} />
                                    </FormGroup>
                                  </Col>
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="accessLevel">Access Level</Label>
                                      <Input type="select" name="accessLevel" id="accessLevel" onChange={this.onChange}>
                                        <option value="persekutuan">Persekutuan</option>
                                        <option value="master">Master</option>
                                      </Input>
                                    </FormGroup>
                                  </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="password">Password</Label>
                                    <Input required type="password" id="password" name="password" onChange={this.onChange} />
                                    </FormGroup>
                                  </Col>
                                  <Col xs="6">
                                    <FormGroup>
                                    <Label htmlFor="confirmPassword"> Confirm Password</Label>
                                    <Input required type="password" id="confirmPassword" name="confirmPassword" onChange={this.onChange} />
                                    </FormGroup>
                                  </Col>
                                </FormGroup>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="success" onClick={this.onSubmit}>Save</Button>&nbsp;
                        <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col xs="12" md="12" className="mb-4">
                    <Table hover bordered striped responsive size="sm">
                      <thead>
                        <tr style={{ backgroundColor: '#20a8d8', color: '#ffffff' }}>
                          <th>Id</th>
                          <th>Email</th>
                          <th>Level</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          (this.state.dataAdmin) ?
                            Object.keys(this.state.dataAdmin).reverse().map(key => (
                              (this.state.dataAdmin[key]) ?
                                (
                                  <tr key={key}>
                                    <td>{key}</td>
                                    <td>{this.state.dataAdmin[key].email}</td>
                                    <td>{this.state.dataAdmin[key].accessLevel}</td>
                                  </tr>
                                ):(null)
                              )
                            ): (null)
                        }
                      </tbody>
                    </Table>
                  </Col>
                  </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Admin;
