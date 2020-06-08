import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { logoutUser } from '../redux/actions/userAction';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Navbar extends Component {
    handleLogout = () => {
        this.props.logoutUser(this.props.history);
      };

    render() {
        const { authenticated } = this.props;
  
        return (
            <AppBar position = "fixed">
                <Toolbar className = "nav-container">
                {authenticated ? (
                   <Button onClick={this.handleLogout}>Wyloguj się</Button>         
            ) : 
                    <h3>Hell Yeeeah Pole Dance Studio</h3>
    }
                </Toolbar>
            </AppBar>
        )
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