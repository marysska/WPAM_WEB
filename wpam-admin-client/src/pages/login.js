import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import AppIcon from '../logo.png';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { loginUser } from '../redux/actions/userAction';

const styles = (theme) => ({
    ...theme.spreadthis
})

class login extends Component {
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps) {
    
        if (nextProps.UI.errors) {
          this.setState({ errors: nextProps.UI.errors });
        }
      }
    handleSubmit = (event) => {
        event.preventDefault();
 
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)

      };
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
        
      };
    
    render() {
        const {classes,   UI: { loading }, authenticated, history = []} = this.props;
        
        const {errors} = this.state;
        if(authenticated === true ){
          window.location.href = "/home";
        }
        return (
        
          
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
            
                    <img src={AppIcon}  alt="monkey" className={classes.image} />
                    <Typography variant="h4" className={classes.pageTitle}>
                    Zaloguj się jako administrator
                    </Typography>
            <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
                    <Button type="submit" variant= "contained" color="secondary" className ={classes.button} disabled={loading}>
                        Zaloguj się
                        {loading && (
                            <CircularProgress size={30} className={classes.progress} />
                        )}
                    </Button>
                    
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        )
    }
}
login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI,
    user: state.user,
    authenticated: state.user.authenticated
})


const mapActionsToProps = {
    loginUser
}
  
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));