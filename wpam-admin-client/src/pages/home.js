import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { logoutUser } from '../redux/actions/userAction';

import { updateDates, updateCancelledData , updateCatchUp, uploadCancelledData} from '../redux/actions/dataAction';

import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import DatePicker from "react-datepicker";

import Grid from '@material-ui/core/Grid';
import "react-datepicker/dist/react-datepicker.css";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  ...theme.spreadthis
})


const Item = ({value}) => (
  <div>
    {value.prowadzaca}
  </div>

  //<div onClick={() => doSomething(value)}>Click Me</div>
);

class home extends Component {

  constructor(){
    super();
    const me = this
    this.state = {
      startDate: new Date(),
      classesCancelled : []
    }
    
  
}
     componentWillReceiveProps(nextProps) {
    
        if (nextProps.data.classesCancelled) {
          
          this.setState({ classesCancelled: nextProps.data.classesCancelled });
          
        }
      }

      handleChange= (date) => {
        this.setState({
          startDate: date
        })
      }
      
    // state = {
    //     screams: null
    // }

//     <React.Fragment>
//     <Button onClick={this.handleCatchUpdater}>Zaktualizuj odrabiane</Button>

//    <Button onClick={this.handleDateUpdater}>Zaktualizuj terminy</Button>
// </React.Fragment>
    handleSubmitOdrobione = (event) => {
      event.preventDefault();
      this.props.updateCatchUp();
    };

    handleSubmitTerminy = (event) => {
      event.preventDefault();
      this.props.updateDates();
    };

    handleSubmitOdwolaj = (event) => {
      event.preventDefault();
      var date = this.state.startDate.getTime() / 1000
      console.log({'sec' : date})
      const termin = {
        'sec': date
      };
      this.props.updateCancelledData(termin);
    };

    handleSubmitRefresh = (event) => {
      event.preventDefault();

      this.props.uploadCancelledData();
    };


    render() {
   
      
        const { classes, authenticated, data: {classesCancelled}} = this.props;
        const bull = <span className={classes.bullet}>•</span>;

        const {startDate} = this.state;
        if(authenticated === false ){
            window.location.href = "/";
          }
          const Foo = (function(...args) {
            var dateString = new Date(args[0]).toLocaleDateString('pl-PL');  return <h2 key = {args} className = {classes.cancelTextfield}>{dateString}</h2>   
        });
  
        return (
        
          <React.Fragment>
              
           <Card className={classes.root} variant="outlined" >
      <CardContent >
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Odwoływanie zajęć
        </Typography>
        <Grid container spacing={10} >
        <Grid item sm={8} xs={12}>
        <Typography variant="h5" component="h2">
          Wybierz termin zajęć do odwołania
        </Typography>

        <div id="div1">
        <CardActions>
       <Button onClick={this.handleSubmitOdwolaj} variant= "contained" color="secondary" className = {classes.button}>Odwołaj wybrane zajęcia</Button>

      </CardActions>
      </div>
      <div id="div2">
        <DatePicker  className={classes.calendar}
        selected={startDate }
       onChange={ this.handleChange }
      
    />   
 </div>
        </Grid>
        <Grid item sm={4} xs={12}>
        <Typography variant="h5" component="h2">
         Lista odwołanych zajęć
        </Typography>
        <Button onClick={this.handleSubmitRefresh} variant= "contained" color="secondary" className = {classes.button}>Odśwież</Button>
        <Fragment>

        {classesCancelled && classesCancelled.map(item => Foo(item)
          )}
        </Fragment>
           
        </Grid>
        
      </Grid>

      </CardContent>

    </Card>


    <Card className={classes.root} variant="outlined">
      <CardContent>
      <Typography variant="h5" component="h2">
          Aktualizacja danych
        </Typography>
     
        <CardActions>
       <Button onClick={this.handleSubmitTerminy} variant= "contained" color="secondary"  className = {classes.button}>Dodaj kolejne terminy</Button>
       <Button onClick={this.handleSubmitOdrobione} variant= "contained" color="secondary" className = {classes.button}>Zaktualizuj odrabiane zajęcia</Button>
      </CardActions>

      </CardContent>

    </Card>
    
         </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data,
    authenticated: state.user.authenticated
  });
  
home.propTypes = {
  classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    updateDates: PropTypes.func.isRequired,
    updateCancelledData: PropTypes.func.isRequired,
    updateCatchUp: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    uploadCancelledData:  PropTypes.func.isRequired
    
  };


const mapActionsToProps = {
    logoutUser,
    updateDates,
    updateCancelledData,
    updateCatchUp,
    uploadCancelledData
}




  
export default connect( mapStateToProps, mapActionsToProps)(withStyles(styles)(home));
