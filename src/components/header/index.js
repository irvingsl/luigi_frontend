import React from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Navbar, Container, Icon } from 'rbx';
//import LogoImage from '../../assets/images/logo-v1-horizontal.png';
import LogoImage from '../../assets/images/luigi.jpg';
import SearchBox from '../search_box_component';
import { showModal } from "../../actions/modal";
import { FaUserAlt, FaShoppingBasket } from 'react-icons/fa';
import history from '../../history';

import "../../styles/header.scss";

const Header = (props) => (
  <div className="top-navbar">
    <Container>
      <Navbar>
          <Navbar.Brand  onClick={e => history.push('/')}>
            <img src={LogoImage} />
          </Navbar.Brand>

          <Navbar.Menu>
            <Navbar.Segment as="div" align="start" className="navbar-item navbar-center">
              <SearchBox />
            </Navbar.Segment>
            <Navbar.Segment as="div" align="end">
              <Navbar.Item onClick={() => props.showModal('LOGIN_MODAL')}>
                <Icon color="white" >
                  <FaUserAlt />
                </Icon>
                <p>Login</p>
              </Navbar.Item>
              <Navbar.Item onClick={ () => history.push('/orders/new') }>
                <Icon color="white" >
                  <FaShoppingBasket />
                </Icon>
                <p>Sacola</p>
              </Navbar.Item>
            </Navbar.Segment>
          </Navbar.Menu>
      </Navbar>
    </Container>
  </div>
);

const mapDispatchToProps = dispatch => bindActionCreators({ showModal }, dispatch);

export default connect(null, mapDispatchToProps)(Header);