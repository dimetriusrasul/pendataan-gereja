import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, TabContent, TabPane, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import classnames from 'classnames';
import firebase from 'firebase';

class Traffic extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModalEdit = this.toggleModalEdit.bind(this);
    this.toggleModalDelete = this.toggleModalDelete.bind(this);
    this.onClickSaveNewData = this.onClickSaveNewData.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onClickEdit = this.onClickEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);

    this.state = {
      activeTab: '1',
      dropdownOpen: new Array(6).fill(false),
      dropdownValue: 'Bintaro Sektor 2',
      modal: false,
      dataMingguan: {},
      dataPersekutuan: {},
      dataIbadah: {},
      weekAkhirPersekutuan: '',
      weekAkhirIbadah: '',
      dateNow: '',
      obPria: 0,
      obWanita: 0,
      pria: 0,
      wanita: 0,
      modalEdit: false,
      weekEdit: '',
      modalDelete: false,
    };
  }

  componentDidMount() {
    var ref = firebase.app().database().ref();
    ref.once('value')
    .then(json => {
      this.setState({ dataMingguan: json.val() });

      const tahun = new Date().getFullYear();
      this.setState({
        dataPersekutuan:this.state.dataMingguan.persekutuan[tahun],
        dataIbadah:this.state.dataMingguan.ibadah[tahun],
      });
      
      const cariWeekAkhir = (param) => {
        let data = this.state[param];
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            (data[key][this.state.dropdownValue]) ? (
                (param === 'dataPersekutuan') ?
                this.setState({ weekAkhirPersekutuan: key }) :
                this.setState({ weekAkhirIbadah: key }) 
              ):
              console.log('NOPE');
          }
        }   
      }
      cariWeekAkhir('dataPersekutuan');
      cariWeekAkhir('dataIbadah');

      console.log(+this.state.weekAkhirPersekutuan + 1);
    });
    
    let d = new Date();
    this.setState({
      dateNow: d.getDate() + '/' + (+d.getMonth() + 1) + '/' + d.getFullYear(),
    });
  }

  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return (index === i ? !element : false);
    });
    this.setState({
      dropdownOpen: newArray,
    });
  }

  onClick = (e) => {
    const cariWeekAkhir = (param1, param2) => {
      let data = this.state[param1];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          (this.state[param1][key][this.state.dropdownValue]) ? (
            this.setState({ weekAkhirPersekutuan: key }) 
          ):
          console.log('error');
          //ERROR:setState di atas kasih value week double
        }
      }
      data = this.state[param2];
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          (this.state[param2][key][this.state.dropdownValue]) ? (
            this.setState({ weekAkhirIbadah: key })
          ) :
            console.log('error');
          //ERROR:setState di atas kasih value week double
        }
      }   
    }

    this.setState({ 
      dropdownValue: e.target.innerText }, () => (console.log(this.state.dataPersekutuan), cariWeekAkhir('dataPersekutuan', 'dataIbadah'))
    );
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
    });
    if (this.state.modal === false)
      this.setState({
        obPria: 0,
        obWanita: 0,
        pria: 0,
        wanita: 0,
      })
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onClickSaveNewData(e) {
    let tabTitle = '';
    (this.state.activeTab === '1') ?
      tabTitle = 'persekutuan' :
      tabTitle = 'ibadah'

    let weekAdd = '';
    (this.state.activeTab === '1') ?
      weekAdd = `${(+this.state.weekAkhirPersekutuan + 1)}/${this.state.dropdownValue}` :
      weekAdd = `${(+this.state.weekAkhirIbadah + 1)}/${this.state.dropdownValue}`


    firebase.database().ref(`${tabTitle}/2018/${weekAdd}`).set({
      obPria: +this.state.obPria,
      obWanita: +this.state.obWanita,
      pria: +this.state.pria,
      wanita: + this.state.wanita
    });
    window.location.reload();
  }

  toggleModalEdit(e) {
    console.log('NAME', e.target.name);
    (e.target.name === undefined || e.target.name === '')?
    this.setState({
      modalEdit: !this.state.modalEdit,
      weekEdit: e.target.name,
    }):
    this.setState({
      modalEdit: !this.state.modalEdit,
      weekEdit: e.target.name,
      pria: this.state.dataPersekutuan[e.target.name][this.state.dropdownValue].pria,
      wanita: this.state.dataPersekutuan[e.target.name][this.state.dropdownValue].wanita,
      obPria: this.state.dataPersekutuan[e.target.name][this.state.dropdownValue].obPria,
      obWanita: this.state.dataPersekutuan[e.target.name][this.state.dropdownValue].obWanita,
    });
  }

  onClickEdit(e) {
    let tabTitle = '';
    (this.state.activeTab === '1') ?
      tabTitle = 'persekutuan' :
      tabTitle = 'ibadah'

    firebase.database().ref(`${tabTitle}/2018/${this.state.weekEdit}/${this.state.dropdownValue}`).set({
      obPria: +this.state.obPria,
      obWanita: +this.state.obWanita,
      pria: +this.state.pria,
      wanita: + this.state.wanita
    });
    window.location.reload();
  }

  toggleModalDelete(e) {
    console.log('NAME', e.target.name);
      this.setState({
        modalDelete: !this.state.modalDelete,
        weekEdit: e.target.name,
      });
  }

  onClickDelete(e) {
    let tabTitle = '';
    (this.state.activeTab === '1') ?
      tabTitle = 'persekutuan' :
      tabTitle = 'ibadah'

    firebase.database().ref(`${tabTitle}/2018/${this.state.weekEdit}/${this.state.dropdownValue}`).remove();
    window.location.reload();
  }
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Traffic
              </CardHeader>
              <CardBody>
                <Row>
                  
                  <Col md="2" xs="12">
                    <Dropdown style={{
                      marginLeft:'15px'
                    }} isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggle(0);
                    }}>
                      <DropdownToggle caret style={{ backgroundColor: '#20a8d8', color: '#ffffff' }}>
                          Wilayah&nbsp;
                      </DropdownToggle>
                      <DropdownMenu style={{
                        overflow: 'auto',
                        maxHeight: 300,
                        }}>
                        <DropdownItem onClick={this.onClick}>Bintaro Sektor 2</DropdownItem>
                        <DropdownItem onClick={this.onClick}>Blok A</DropdownItem>
                        <DropdownItem onClick={this.onClick}>Blok M</DropdownItem>
                        <DropdownItem onClick={this.onClick}>Bukit Indah 1</DropdownItem>
                        <DropdownItem onClick={this.onClick}>Cilandak</DropdownItem>
                        <DropdownItem onClick={this.onClick}>Edutown</DropdownItem>
                        <DropdownItem onClick={this.onClick}>Pejaten</DropdownItem>
                        <DropdownItem onClick={this.onClick}>Pondok Labu</DropdownItem>
                        <DropdownItem onClick={this.onClick}>Serua</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </Col>
                  <Col md="4" xs="12">
                    <h3 style={{
                      verticalAlign:'middle', 
                      textAlign:'center'
                    }}>
                      {this.state.dropdownValue}
                    </h3>
                  </Col>
                  <Col md="6" xs="12"> 
                    <Button onClick={this.toggleModal} className="mr-1 float-right" color="success">
                      Add&nbsp;
                      <i className="nav-icon icon-pencil"/>
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal} className={this.props.className}>
                      <ModalHeader toggle={this.toggleModal}>Add traffic</ModalHeader>
                      <ModalBody>
                        <Row>         
                          <Col>
                            <Card>
                              <CardHeader>
                                  <strong>
                                    {
                                      (this.state.activeTab === '1') ?
                                      'Persekutuan':
                                      'Ibadah'
                                    }
                                  </strong>
                              </CardHeader>
                              <CardBody>
                                <FormGroup>
                                  <Label htmlFor="wilayah">Wilayah</Label>
                                  <Input disabled required type="text" id="wilayah" value={this.state.dropdownValue} />
                                </FormGroup>
                                <FormGroup row className="my-0">
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="week">Week</Label>
                                      <Input disabled required type="text" id="week" 
                                        value={
                                          (this.state.activeTab === '1') ?
                                          (+this.state.weekAkhirPersekutuan + 1) :
                                          (+this.state.weekAkhirIbadah + 1)
                                        }
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="date">Date</Label>
                                      <Input disabled required type="text" id="date" value={this.state.dateNow} />
                                    </FormGroup>
                                  </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="pria">Pria</Label>
                                      <Input required type="number" id="pria" name="pria" onChange={this.onChange}/>
                                    </FormGroup>
                                  </Col>
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="wanita">Wanita</Label>
                                      <Input required type="number" id="wanita" name="wanita" onChange={this.onChange}/>
                                    </FormGroup>
                                  </Col>
                                </FormGroup>
                                <FormGroup row className="my-0">
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="obPria">Orang Baru Pria</Label>
                                      <Input required type="number" id="obPria" name="obPria" onChange={this.onChange}/>
                                    </FormGroup>
                                  </Col>
                                  <Col xs="6">
                                    <FormGroup>
                                      <Label htmlFor="obWanita">Orang Baru Wanita</Label>
                                      <Input required type="number" id="obWanita" name="obWanita" onChange={this.onChange}/>
                                    </FormGroup>
                                  </Col>
                                </FormGroup>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>

                      </ModalBody>
                      <ModalFooter>
                        <Button color="success" onClick={this.onClickSaveNewData}>Save</Button>&nbsp;
                        <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
                      </ModalFooter>
                    </Modal>
                  </Col>
                </Row>

                <br />

                <Col xs="12" md="12" className="mb-4">
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '1' })}
                        onClick={() => { this.toggleTab('1'); }}
                      >
                        Persekutuan
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({ active: this.state.activeTab === '2' })}
                        onClick={() => { this.toggleTab('2'); }}
                      >
                        Ibadah
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <Table hover bordered striped responsive size="sm">
                        <thead>
                          <tr style={{ backgroundColor: '#20a8d8', color: '#ffffff' }}>
                            <th>Week</th>
                            <th>Date created</th>
                            <th>Traffic</th>
                            <th>P</th>
                            <th>W</th>
                            <th>ObP</th>
                            <th>ObW</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          
                          {
                            Object.keys(this.state.dataPersekutuan).reverse().map( key=>(
                            (this.state.dataPersekutuan[key][this.state.dropdownValue]) ?
                            (
                              <tr key={key}>
                                <td>{key}</td>
                                <td>08/07/2018</td>
                                <td>
                                  {
                                    this.state.dataPersekutuan[key][this.state.dropdownValue].obPria +
                                    this.state.dataPersekutuan[key][this.state.dropdownValue].obWanita +
                                    this.state.dataPersekutuan[key][this.state.dropdownValue].pria +
                                    this.state.dataPersekutuan[key][this.state.dropdownValue].wanita
                                  }
                                </td>
                                <td>{this.state.dataPersekutuan[key][this.state.dropdownValue].pria}</td>
                                <td>{this.state.dataPersekutuan[key][this.state.dropdownValue].wanita}</td>
                                <td>{this.state.dataPersekutuan[key][this.state.dropdownValue].obPria}</td>
                                <td>{this.state.dataPersekutuan[key][this.state.dropdownValue].obWanita}</td>
                                <td>
                                  <Button block color="primary" size="sm" name={key} onClick={this.toggleModalEdit}>Edit</Button>
                                </td>
                                <td>
                                  <Button block color="danger" size="sm" name={key} onClick={this.toggleModalDelete}>Del</Button>
                                </td>
                               </tr>
                            ) :
                            (
                              console.log('No')
                            )
                          )
                        )
                          } 
                        </tbody>
                      </Table>
                      <Modal isOpen={this.state.modalEdit} toggle={this.toggleModalEdit} className={this.props.className}>
                        <ModalHeader toggle={this.toggleModalEdit}>Edit traffic</ModalHeader>
                        <ModalBody>
                          <Row>
                            <Col>
                              <Card>
                                <CardHeader>
                                  <strong>
                                    {
                                      (this.state.activeTab === '1') ?
                                        'Persekutuan' :
                                        'Ibadah'
                                    }
                                  </strong>
                                </CardHeader>
                                <CardBody>
                                  <FormGroup>
                                    <Label htmlFor="wilayah">Wilayah</Label>
                                    <Input disabled required type="text" id="wilayah" value={this.state.dropdownValue} />
                                  </FormGroup>
                                  <FormGroup row className="my-0">
                                    <Col xs="6">
                                      <FormGroup>
                                        <Label htmlFor="week">Edited Week</Label>
                                        <Input disabled required type="text" id="week"
                                          value={this.state.weekEdit || ''} 
                                        />
                                      </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                      <FormGroup>
                                        <Label htmlFor="date">Date</Label>
                                        <Input disabled required type="text" id="date" value={this.state.dateNow} />
                                      </FormGroup>
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row className="my-0">
                                    <Col xs="6">
                                      <FormGroup>
                                        <Label htmlFor="pria">Pria</Label>
                                        <Input required type="number" id="pria" name="pria" onChange={this.onChange} value={this.state.pria} />
                                      </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                      <FormGroup>
                                        <Label htmlFor="wanita">Wanita</Label>
                                        <Input required type="number" id="wanita" name="wanita" onChange={this.onChange} value={this.state.wanita} />
                                      </FormGroup>
                                    </Col>
                                  </FormGroup>
                                  <FormGroup row className="my-0">
                                    <Col xs="6">
                                      <FormGroup>
                                        <Label htmlFor="obPria">Orang Baru Pria</Label>
                                        <Input required type="number" id="obPria" name="obPria" onChange={this.onChange}  value={this.state.obPria} />
                                      </FormGroup>
                                    </Col>
                                    <Col xs="6">
                                      <FormGroup>
                                        <Label htmlFor="obWanita">Orang Baru Wanita</Label>
                                        <Input required type="number" id="obWanita" name="obWanita" onChange={this.onChange}  value={this.state.obWanita} />
                                      </FormGroup>
                                    </Col>
                                  </FormGroup>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>

                        </ModalBody>
                        <ModalFooter>
                          <Button color="success" onClick={this.onClickEdit}>Save Changes</Button>&nbsp;
                          <Button color="danger" onClick={this.toggleModalEdit}>Cancel</Button>
                        </ModalFooter>
                      </Modal>


                      <Modal isOpen={this.state.modalDelete} toggle={this.toggleModalDelete} className={this.props.className}>
                        <ModalHeader toggle={this.toggleModalDelete}>Delete traffic</ModalHeader>
                        <ModalBody>
                          <Row>
                            <Col>
                              <Card>
                                <CardHeader>
                                  <strong>
                                    {
                                      (this.state.activeTab === '1') ?
                                        'Persekutuan' :
                                        'Ibadah'
                                    }
                                  </strong>
                                </CardHeader>
                                <CardBody>
                                  <p>Are you sure want to delete data Week {this.state.weekEdit || ''} ?</p>
                                </CardBody>
                              </Card>
                            </Col>
                          </Row>
                        </ModalBody>
                        <ModalFooter>
                          <Button color="danger" onClick={this.onClickDelete}>Delete</Button>&nbsp;
                        <Button color="secondary" onClick={this.toggleModalDelete}>Cancel</Button>
                        </ModalFooter>
                      </Modal>
                      <nav>
                        <Pagination>
                          <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                          <PaginationItem active>
                            <PaginationLink tag="button">1</PaginationLink>
                          </PaginationItem>
                          <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                          <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                        </Pagination>
                      </nav>
                    </TabPane>
                    <TabPane tabId="2">
                      <Table hover bordered striped responsive size="sm">
                        <thead>
                          <tr style={{ backgroundColor: '#63c2de', color: '#ffffff' }}>
                            <th>Week</th>
                            <th>Date created</th>
                            <th>Traffic</th>
                            <th>P</th>
                            <th>W</th>
                            <th>ObP</th>
                            <th>ObW</th>
                            <th>Edit</th>
                            <th>Delete</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.keys(this.state.dataIbadah).reverse().map( key=>(
                            (this.state.dataIbadah[key][this.state.dropdownValue] !== undefined) ?
                              (
                                <tr key={key} details={this.state.dataIbadah[key]} >
                                  <td>{key}</td>
                                  <td>08/07/2018</td>
                                  <td>
                                    {
                                      this.state.dataIbadah[key][this.state.dropdownValue].obPria + 
                                      this.state.dataIbadah[key][this.state.dropdownValue].obWanita + 
                                      this.state.dataIbadah[key][this.state.dropdownValue].pria + 
                                      this.state.dataIbadah[key][this.state.dropdownValue].wanita
                                    }
                                  </td>
                                  <td>{this.state.dataIbadah[key][this.state.dropdownValue].pria}</td>
                                  <td>{this.state.dataIbadah[key][this.state.dropdownValue].wanita}</td>
                                  <td>{this.state.dataIbadah[key][this.state.dropdownValue].obPria}</td>
                                  <td>{this.state.dataIbadah[key][this.state.dropdownValue].obWanita}</td>
                                  <td>
                                    <Button block color="primary" size="sm" name={key} onClick={this.toggleModalEdit}>Edit</Button>
                                  </td>
                                  <td> 
                                    <Button block color="danger" size="sm" name={key} onClick={this.toggleModalDelete}>Del</Button>
                                  </td>
                                </tr> 
                              ):
                              console.log('dont')

                          ))} 
                        </tbody>
                      </Table>
                      <nav>
                        <Pagination>
                          <PaginationItem><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                          <PaginationItem active>
                            <PaginationLink tag="button">1</PaginationLink>
                          </PaginationItem>
                          <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                          <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                        </Pagination>
                      </nav>
                    </TabPane>
                  </TabContent>
                </Col>

                
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

    );
  }
}

export default Traffic;
