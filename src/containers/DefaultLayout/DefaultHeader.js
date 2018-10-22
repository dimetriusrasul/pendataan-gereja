import React, { Component } from 'react';
import { Badge, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';

import { AppAsideToggler, AppHeaderDropdown, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logoGkkd.PNG';
import gkkd from '../../assets/img/brand/gkkdlogo1.PNG';
import firebase from 'firebase';
const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {

  onClick(e) {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand full={{ src: logo, width: 89, height: 25, alt: "GKKD Logo" }} minimized={{ src: gkkd, width: 30, height: 30, alt: "GKKD Logo" }} />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Users</NavLink>
          </NavItem>
          <NavItem className="px-3">
            <NavLink href="#">Settings</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-bell" />
              <Badge pill color="danger">
                5
              </Badge>
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-list" />
            </NavLink>
          </NavItem>
          <NavItem className="d-md-down-none">
            <NavLink href="#">
              <i className="icon-location-pin" />
            </NavLink>
          </NavItem>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img src={"assets/img/avatars/6.png"} className="img-avatar" alt="admin@gkkd.com" />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem onClick={this.onClick.bind(this)}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
        <AppAsideToggler className="d-md-down-none" />
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>;
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
