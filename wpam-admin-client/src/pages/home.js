import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { logoutUser } from '../redux/actions/userAction';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class home extends Component {
    
    handleLogout = () => {
        this.props.logoutUser(this.props.history);
      };
    // state = {
    //     screams: null
    // }
    // componentDidMount(){
    //     axios.get('/screams').then( res => { 
    //         this.setState({
    //             screams: res.data
    //         })

    //     }).catch(err => console.log(err))
    // }
    render() {
        const { authenticated } = this.props;
        if(authenticated === false ){
            window.location.href = "/";
          }
        return (
  
            <div>
                <h1>Home page</h1>      
                <Button onClick={this.handleLogout}>Wyloguj się</Button>          
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    authenticated: state.user.authenticated
  });

  
home.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
  };


const mapActionsToProps = {
    logoutUser
}
  
export default connect( mapStateToProps, mapActionsToProps)(home);
