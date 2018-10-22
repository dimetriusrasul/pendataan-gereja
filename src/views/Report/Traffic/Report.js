import React, { Component } from 'react';
import { Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, TabContent, TabPane, Button, CardTitle, CardFooter, ButtonToolbar, ButtonGroup, Progress } from 'reactstrap';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities'
import classnames from 'classnames';
import firebase from 'firebase';






class TrafficReport extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onClick = this.onClick.bind(this);
    this.toggleTab = this.toggleTab.bind(this);
    this.onChange = this.onChange.bind(this);
    const brandSuccess = getStyle('--success')
    const brandInfo = getStyle('--info')
    const brandDanger = getStyle('--danger')

    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }

    var elements = 52;
    var data1 = [];
    var data2 = [];
    var data3 = [];

    for (var i = 0; i <= elements; i++) {
      data1.push(random(1, 20));
      data2.push(random(1, 10));
      data3.push(5);
    }
    this.state = {
      activeTab: '1',
      dropdownOpen: new Array(6).fill(false),
      dropdownValue: 'Bintaro Sektor 2',
      dataMingguan: {},
      dataPersekutuan: {},
      dataIbadah: {},
      weekAkhirPersekutuan: '',
      weekAkhirIbadah: '',
      dateNow: '',
      data1:[1,2,3,4,5,6,7,8,9,10],
      data2:[11,12,3,4,5,6,7,8,9,10],
      mainChartPersekutuan: {
        labels: ['W 1', 'W 2', 'W 3', 'W 4', 'W 5', 'W 6', 'W 7', 'W 8', 'W 9', 'W 10', 'W 11', 'W 12', 'W 13', 'W 14', 'W 15', 'W 16', 'W 17', 'W 18', 'W 19', 'W 20', 'W 31', 'W 32', 'W 33', 'W 34', 'W 35', 'W 36', 'W 37', 'W 38', 'W 39', 'W 40', 'W 41', 'W 42', 'W 43', 'W 44', 'W 45', 'W 46', 'W 47', 'W 48', 'W 49', 'W 50', 'W 51', 'W 52'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: data1,
          },
          {
            label: 'My Second dataset',
            backgroundColor: 'transparent',
            borderColor: brandSuccess,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: data2,
          },
          {
            label: 'My Third dataset',
            backgroundColor: 'transparent',
            borderColor: brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5],
            data: data3,
          },
        ],
      },
      mainChartOptsPersekutuan: {
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
            }
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
            }],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: Math.ceil(20 / 5),
                max: 20,
              },
            }],
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          },
        },
      },
      mainChartIbadah: {
        labels: ['W 1', 'W 2', 'W 3', 'W 4', 'W 5', 'W 6', 'W 7', 'W 8', 'W 9', 'W 10', 'W 11', 'W 12', 'W 13', 'W 14', 'W 15', 'W 16', 'W 17', 'W 18', 'W 19', 'W 20', 'W 31', 'W 32', 'W 33', 'W 34', 'W 35', 'W 36', 'W 37', 'W 38', 'W 39', 'W 40', 'W 41', 'W 42', 'W 43', 'W 44', 'W 45', 'W 46', 'W 47', 'W 48', 'W 49', 'W 50', 'W 51', 'W 52'],
        datasets: [
          {
            label: 'My First dataset',
            backgroundColor: hexToRgba(brandInfo, 10),
            borderColor: brandInfo,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: data1,
          },
          {
            label: 'My Second dataset',
            backgroundColor: 'transparent',
            borderColor: brandSuccess,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 2,
            data: data2,
          },
          {
            label: 'My Third dataset',
            backgroundColor: 'transparent',
            borderColor: brandDanger,
            pointHoverBackgroundColor: '#fff',
            borderWidth: 1,
            borderDash: [8, 5],
            data: data3,
          },
        ],
      },
      mainChartOptsIbadah: {
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function (tooltipItem, chart) {
              return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
            }
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false,
              },
            }],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: Math.ceil(20 / 5),
                max: 20,
              },
            }],
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3,
          },
        },
      },
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
                null
            }
          }   
        }
      
      cariWeekAkhir('dataPersekutuan');
      cariWeekAkhir('dataIbadah');
      
      const chartData = (param) => {
        const brandSuccess = getStyle('--success')
        const brandInfo = getStyle('--info')
        const brandDanger = getStyle('--danger')

        let data = this.state[param];
        var totalChart = [];
        var data2 = [];
        var data3 = [];
        for (var key in data) {
          if (data.hasOwnProperty(key)) {
            totalChart.push(data[key][this.state.dropdownValue].pria +
              data[key][this.state.dropdownValue].wanita +
              data[key][this.state.dropdownValue].obPria +
              data[key][this.state.dropdownValue].obWanita);
            }
        }

        
        (param === 'dataPersekutuan') ?
          this.setState({
            mainChartPersekutuan: {
              labels: ['W 1', 'W 2', 'W 3', 'W 4', 'W 5', 'W 6', 'W 7', 'W 8', 'W 9', 'W 10', 'W 11', 'W 12', 'W 13', 'W 14', 'W 15', 'W 16', 'W 17', 'W 18', 'W 19', 'W 20', 'W 31', 'W 32', 'W 33', 'W 34', 'W 35', 'W 36', 'W 37', 'W 38', 'W 39', 'W 40', 'W 41', 'W 42', 'W 43', 'W 44', 'W 45', 'W 46', 'W 47', 'W 48', 'W 49', 'W 50', 'W 51', 'W 52'],
              datasets: [
                {
                  label: 'Total traffic',
                  backgroundColor: hexToRgba(brandInfo, 10),
                  borderColor: brandInfo,
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 2,
                  data: totalChart,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: brandSuccess,
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 2,
                  data: data2,
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: brandDanger,
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: data3,
                },
              ],
            },
            mainChartOptsPersekutuan: {
              tooltips: {
                enabled: false,
                custom: CustomTooltips,
                intersect: true,
                mode: 'index',
                position: 'nearest',
                callbacks: {
                  labelColor: function (tooltipItem, chart) {
                    return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
                  }
                }
              },
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      drawOnChartArea: false,
                    },
                  }],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(20 / 5),
                      max: 20,
                    },
                  }],
              },
              elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }
          }):
          this.setState({
            mainChartIbadah: {
              labels: ['W 1', 'W 2', 'W 3', 'W 4', 'W 5', 'W 6', 'W 7', 'W 8', 'W 9', 'W 10', 'W 11', 'W 12', 'W 13', 'W 14', 'W 15', 'W 16', 'W 17', 'W 18', 'W 19', 'W 20', 'W 31', 'W 32', 'W 33', 'W 34', 'W 35', 'W 36', 'W 37', 'W 38', 'W 39', 'W 40', 'W 41', 'W 42', 'W 43', 'W 44', 'W 45', 'W 46', 'W 47', 'W 48', 'W 49', 'W 50', 'W 51', 'W 52'],
              datasets: [
                {
                  label: 'Total traffic',
                  backgroundColor: hexToRgba(brandInfo, 10),
                  borderColor: brandInfo,
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 2,
                  data: totalChart,
                },
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: brandSuccess,
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 2,
                  data: data2,
                },
                {
                  label: 'My Third dataset',
                  backgroundColor: 'transparent',
                  borderColor: brandDanger,
                  pointHoverBackgroundColor: '#fff',
                  borderWidth: 1,
                  borderDash: [8, 5],
                  data: data3,
                },
              ],
            },
            mainChartOptsIbadah: {
              tooltips: {
                enabled: false,
                custom: CustomTooltips,
                intersect: true,
                mode: 'index',
                position: 'nearest',
                callbacks: {
                  labelColor: function (tooltipItem, chart) {
                    return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
                  }
                }
              },
              maintainAspectRatio: false,
              legend: {
                display: false,
              },
              scales: {
                xAxes: [
                  {
                    gridLines: {
                      drawOnChartArea: false,
                    },
                  }],
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                      maxTicksLimit: 5,
                      stepSize: Math.ceil(20 / 5),
                      max: 20,
                    },
                  }],
              },
              elements: {
                point: {
                  radius: 0,
                  hitRadius: 10,
                  hoverRadius: 4,
                  hoverBorderWidth: 3,
                },
              },
            }
          })
      }

      chartData('dataPersekutuan');
      chartData('dataIbadah');
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
            null
          //ERROR:setState di atas kasih value week double
        }
      }
      data = this.state[param2];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          (this.state[param2][key][this.state.dropdownValue]) ? (
            this.setState({ weekAkhirIbadah: key })
          ) :
            null
          //ERROR:setState di atas kasih value week double
        }
      }   
    }
    const chartData = (param) => {
      const brandSuccess = getStyle('--success')
      const brandInfo = getStyle('--info')
      const brandDanger = getStyle('--danger')

      let data = this.state[param];
      var totalChart = [];
      var data2 = [];
      var data3 = [];
      for (var key in data) {
        if (data.hasOwnProperty(key)) {
          if (data[key][this.state.dropdownValue] !== undefined) {
            totalChart.push(data[key][this.state.dropdownValue].pria +
              data[key][this.state.dropdownValue].wanita +
              data[key][this.state.dropdownValue].obPria +
              data[key][this.state.dropdownValue].obWanita);
          }
          else {
            return null
          }
        }
      }

      (param === 'dataPersekutuan') ?
        this.setState({
          mainChartPersekutuan: {
            labels: ['W 1', 'W 2', 'W 3', 'W 4', 'W 5', 'W 6', 'W 7', 'W 8', 'W 9', 'W 10', 'W 11', 'W 12', 'W 13', 'W 14', 'W 15', 'W 16', 'W 17', 'W 18', 'W 19', 'W 20', 'W 31', 'W 32', 'W 33', 'W 34', 'W 35', 'W 36', 'W 37', 'W 38', 'W 39', 'W 40', 'W 41', 'W 42', 'W 43', 'W 44', 'W 45', 'W 46', 'W 47', 'W 48', 'W 49', 'W 50', 'W 51', 'W 52'],
            datasets: [
              {
                label: 'Total traffic',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: totalChart,
              },
              {
                label: 'My Second dataset',
                backgroundColor: 'transparent',
                borderColor: brandSuccess,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: data2,
              },
              {
                label: 'My Third dataset',
                backgroundColor: 'transparent',
                borderColor: brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 1,
                borderDash: [8, 5],
                data: data3,
              },
            ],
          },
          mainChartOptsPersekutuan: {
            tooltips: {
              enabled: false,
              custom: CustomTooltips,
              intersect: true,
              mode: 'index',
              position: 'nearest',
              callbacks: {
                labelColor: function (tooltipItem, chart) {
                  return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
                }
              }
            },
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    drawOnChartArea: false,
                  },
                }],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(20 / 5),
                    max: 20,
                  },
                }],
            },
            elements: {
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
              },
            },
          }
        }) :
        this.setState({
          mainChartIbadah: {
            labels: ['W 1', 'W 2', 'W 3', 'W 4', 'W 5', 'W 6', 'W 7', 'W 8', 'W 9', 'W 10', 'W 11', 'W 12', 'W 13', 'W 14', 'W 15', 'W 16', 'W 17', 'W 18', 'W 19', 'W 20', 'W 31', 'W 32', 'W 33', 'W 34', 'W 35', 'W 36', 'W 37', 'W 38', 'W 39', 'W 40', 'W 41', 'W 42', 'W 43', 'W 44', 'W 45', 'W 46', 'W 47', 'W 48', 'W 49', 'W 50', 'W 51', 'W 52'],
            datasets: [
              {
                label: 'Total traffic',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: totalChart,
              },
              {
                label: 'My Second dataset',
                backgroundColor: 'transparent',
                borderColor: brandSuccess,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: data2,
              },
              {
                label: 'My Third dataset',
                backgroundColor: 'transparent',
                borderColor: brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 1,
                borderDash: [8, 5],
                data: data3,
              },
            ],
          },
          mainChartOptsIbadah: {
            tooltips: {
              enabled: false,
              custom: CustomTooltips,
              intersect: true,
              mode: 'index',
              position: 'nearest',
              callbacks: {
                labelColor: function (tooltipItem, chart) {
                  return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor }
                }
              }
            },
            maintainAspectRatio: false,
            legend: {
              display: false,
            },
            scales: {
              xAxes: [
                {
                  gridLines: {
                    drawOnChartArea: false,
                  },
                }],
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(20 / 5),
                    max: 20,
                  },
                }],
            },
            elements: {
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
              },
            },
          }
        })
    }

    this.setState({ 
      dropdownValue: e.target.innerText }, 
      () => (cariWeekAkhir('dataPersekutuan', 'dataIbadah'), chartData('dataPersekutuan'),chartData('dataIbadah'))
    );

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
  
  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Traffic Report
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="2">
                    <Dropdown isOpen={this.state.dropdownOpen[0]} toggle={() => {this.toggle(0);
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
                  <Col md="4">
                    <h3 style={{
                      verticalAlign:'middle', 
                      textAlign:'center'
                    }}>
                      {this.state.dropdownValue}
                    </h3>
                  </Col>
                  <Col md="6" />
                </Row>
                <br />
                
                <Row>
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
                        
                        <Row>
                          <Col>
                            <Card>
                              <CardBody>
                                <Row>
                                  <Col sm="5">
                                    <CardTitle className="mb-0">Traffic</CardTitle>
                                    <div className="small text-muted">2018</div>
                                  </Col>
                                  <Col sm="7" className="d-none d-sm-inline-block">
                                    <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                                  </Col>
                                </Row>
                                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                                  <Line data={this.state.mainChartPersekutuan} options={this.state.mainChartOptsPersekutuan} height={300} />
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                        </Row>

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
                                </tr>
                              ) :
                              (
                                null
                              )
                            )
                          )
                            } 
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
                      <TabPane tabId="2">

                        <Row>
                          <Col>
                            <Card>
                              <CardBody>
                                <Row>
                                  <Col sm="5">
                                    <CardTitle className="mb-0">Traffic</CardTitle>
                                    <div className="small text-muted">2018</div>
                                  </Col>
                                  <Col sm="7" className="d-none d-sm-inline-block">
                                    <Button color="primary" className="float-right"><i className="icon-cloud-download"></i></Button>
                                    <ButtonToolbar className="float-right" aria-label="Toolbar with button groups">
                                      <ButtonGroup className="mr-3" aria-label="First group">
                                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.radioSelected === 1}>Day</Button>
                                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.radioSelected === 2}>Month</Button>
                                        <Button color="outline-secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.radioSelected === 3}>Year</Button>
                                      </ButtonGroup>
                                    </ButtonToolbar>
                                  </Col>
                                </Row>
                                <div className="chart-wrapper" style={{ height: 300 + 'px', marginTop: 40 + 'px' }}>
                                  <Line data={this.state.mainChartIbadah} options={this.state.mainChartOptsIbadah} height={300} />
                                </div>

                              </CardBody>
                              <CardFooter>
                                <Row className="text-center">
                                  <Col sm={12} md className="mb-sm-2 mb-0">
                                    <div className="text-muted">Visits</div>
                                    <strong>29.703 Users (40%)</strong>
                                    <Progress className="progress-xs mt-2" color="success" value="40" />
                                  </Col>
                                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                                    <div className="text-muted">Unique</div>
                                    <strong>24.093 Users (20%)</strong>
                                    <Progress className="progress-xs mt-2" color="info" value="20" />
                                  </Col>
                                  <Col sm={12} md className="mb-sm-2 mb-0">
                                    <div className="text-muted">Pageviews</div>
                                    <strong>78.706 Views (60%)</strong>
                                    <Progress className="progress-xs mt-2" color="warning" value="60" />
                                  </Col>
                                  <Col sm={12} md className="mb-sm-2 mb-0">
                                    <div className="text-muted">New Users</div>
                                    <strong>22.123 Users (80%)</strong>
                                    <Progress className="progress-xs mt-2" color="danger" value="80" />
                                  </Col>
                                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                                    <div className="text-muted">Bounce Rate</div>
                                    <strong>Avrg. Rate (40.15%)</strong>
                                    <Progress className="progress-xs mt-2" color="primary" value="40" />
                                  </Col>
                                </Row>
                              </CardFooter>
                            </Card>
                          </Col>
                        </Row>

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
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(this.state.dataIbadah).reverse().map( key=>(
                              (this.state.dataPersekutuan[key][this.state.dropdownValue]) ?
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
                              </tr> 
                              ):
                              null
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
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TrafficReport;
