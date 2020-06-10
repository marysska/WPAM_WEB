import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { logoutUser } from '../redux/actions/userAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser(this.props.history);
      };

    render() {
        const { authenticated } = this.props;
        if(authenticated === false ){
          return (
            <AppBar position = "fixed">
            <Toolbar className = "nav-container">
<h3>Hell Yeeeah Pole Dance Studio</h3>
</Toolbar>
            </AppBar>
          )
        }else{
          return(
            <AppBar position = "fixed">
            <Toolbar className = "nav-container">
            <Button onClick={this.handleLogout}>Wyloguj się</Button>   
            <Button color="inherit" component={Link} to="/home">
                Home
              </Button>    
              <Button color="inherit" component={Link} to="/groups">
                Zarządzaj grupami
              </Button>  
</Toolbar>
            </AppBar>
          )
        }
    }
}


Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
  };
  
  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  });

  const mapActionsToProps = {
    logoutUser
}
  
  export default connect(mapStateToProps, mapActionsToProps)(Navbar);