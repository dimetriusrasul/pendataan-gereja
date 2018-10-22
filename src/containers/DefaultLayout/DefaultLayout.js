import React, { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav,
} from '@coreui/react';
// sidebar nav config
import navigation from '../../_nav';
import navigationPersekutuan from '../../_navUser';
// routes config
import routes from '../../routes';
import DefaultAside from './DefaultAside';
import DefaultFooter from './DefaultFooter';
import DefaultHeader from './DefaultHeader';
import firebase from 'firebase';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessLevel: '',
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        // console.log(firebaseUser);
        this.setState({
          'email': firebaseUser.email,
          'isLogin': true,
          'token': firebaseUser.l
        });
      } else {
        this.props.history.push("/login")
      }
    });
    firebase.app().database().ref(`/admin`).once('value')
      .then(json => {
        this.setState({ dataAdmin: json.val() });

        for (var key in this.state.dataAdmin) {
          if (this.state.dataAdmin.hasOwnProperty(key)) {
            if (this.state.email === this.state.dataAdmin[key].email)
              this.setState({ accessLevel: this.state.dataAdmin[key].accessLevel })
          }
        }
      })
  }
  render() {
    let AppSideBarNavigation;
    if (this.state.accessLevel) {
      const level = this.state.accessLevel;
      if (level === 'master'){
        AppSideBarNavigation = <AppSidebarNav navConfig={navigation} {...this.props} />;
      } else {
        AppSideBarNavigation = <AppSidebarNav navConfig={navigationPersekutuan} {...this.props} />;
      }
    }else{
      null
    }
    
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            { AppSideBarNavigation }
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
          <main className="main">
            <AppBreadcrumb appRoutes={routes}/>
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                    return route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                        <route.component {...props} />
                      )} />)
                      : (null);
                  },
                )}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          {/* <AppAside fixed hidden>
            <DefaultAside />
          </AppAside> */}
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default DefaultLayout;
