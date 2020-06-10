import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';



export class users extends Component {
    render() {
        const { authenticated } = this.props;
        if(authenticated === false ){
            window.location.href = "/";
          }
        return (
            <div>
                Users
            </div>
        )
    }
    
}

users.propTypes = {

    authenticated: PropTypes.bool.isRequired
  };

  users.propTypes = {
    authenticated: PropTypes.bool.isRequired
  };

  const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
  });


export default connect( mapStateToProps)(users);