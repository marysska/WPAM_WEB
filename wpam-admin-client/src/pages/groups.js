import React, { Component , Fragment} from 'react'
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import DateFnsUtils from '@date-io/date-fns';
import Table from '@material-ui/core/Table';
import Radio from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/Checkbox';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import { refreshGroupInfo, deleteGroup,  addParticipantToGroup, deleteParticipantFromGroup, createNewGroup} from '../redux/actions/dataAction';


const styles = (theme) => ({
  ...theme.spreadthis
})


function Item(props) {
  
  const value = props.value;

  //const dateString = Date.parse(value.godzina.sec);
  var newDate = new Date(value.godzina).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
 
  return (
  
<TableRow >
<TableCell >
            <Radio
               value={value.documentId}
               checked={value.documentId != props.chosen ? false : true}
               onChange={props.onChange}
            />
         </TableCell>

  <TableCell>{value.prowadzaca}</TableCell>
  <TableCell>{newDate}</TableCell>
  <TableCell>{value.dzien}</TableCell>
  <TableCell>{value.rodzaj}</TableCell>
  <TableCell>{value.poziom}</TableCell>
  <TableCell>{value.liczbaKursantek}</TableCell>
</TableRow>
  );
}

export class groups extends Component {

  constructor(){
    super();
    this.state = {
        prowadzaca:'',
        rodzaj: "pole dance",
        poziom: 0,
        email:'',
        startDate: new Date(),
        startHour: new Date(),
        groupList :  [],
        selectedGroup : null

    }
  }

  handleEndGroups = (event) => {
    event.preventDefault();

    if(this.state.selectedGroup != null){
      this.props.deleteGroup(this.state.selectedGroup);
    }
   
  };

  handleAddToGroup = (event) => {
    event.preventDefault();

    if(this.state.email != null  && this.state.selectedGroup != null){
      this.props.addParticipantToGroup(this.state.email, this.state.selectedGroup);
    }
  }
 
  handleCreateNewGroup = (event) => {
    event.preventDefault();

    var date = this.state.startDate.getDay();
    var day = ""
    if(date == 0){
      day = "niedziela"
    }else  if(date == 1){
      day = "poniedziałek"
    }else  if(date == 2){
      day = "wtorek"
    }else  if(date == 3){
      day = "środa"
    }else  if(date == 4){
      day = "czwartek"
    }else  if(date == 5){
      day = "piątek"
    }else  if(date == 6){
      day = "sobota"
    }

    var currentDate = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate())
    var startClassesDate = new Date(this.state.startDate.getFullYear(),this.state.startDate.getMonth() , this.state.startDate.getDate())
    var time = this.state.startHour.getTime() - currentDate.getTime()
    var destinationDate = (startClassesDate.getTime() + time)

    if(this.state.prowadzaca != null){
      this.props.createNewGroup(this.state.prowadzaca, this.state.poziom,this.state.rodzaj,day, parseInt(destinationDate/1000))
    }
   

  }
  
  handleDeleteFromGroup = (event) => {
    event.preventDefault();

    if(this.state.email != null && this.state.selectedGroup != null){
      this.props.deleteParticipantFromGroup(this.state.email, this.state.selectedGroup);
    }
  }



  componentWillReceiveProps(nextProps) {
    
    if (nextProps.data.groupList) {
      
      this.setState({ groupList: nextProps.data.groupList });
      
    }
  }

  handleChange = (event) => {
    this.setState({
        [event.target.name]: event.target.value
    })};

    
  handleChangeCalendar = (value) => {
    this.setState({
      startDate: value
    })
    
  };

  handleChangeHour = (hour) => {
    this.setState({
      startHour: hour
    })
    
  };
  
  handleRefreshButton = (event) =>{
    event.preventDefault();
    this.props.refreshGroupInfo();
  }

  handleChangeRadio = (event) => {
    console.log(event.currentTarget.value)
    this.setState({
      selectedGroup : event.currentTarget.value}
    )

  }

    render() {
      
  
        const {classes, authenticated, data: {groupList}} = this.props;
        if(authenticated === false ){
            window.location.href = "/";
          }

 


      const listItems = this.state.groupList.map((d) => <Item value={d} chosen={this.state.selectedGroup} onChange={this.handleChangeRadio}  className = {classes.tableRow}  key={d.documentId}></Item>);
    
        return (

          <Grid container spacing={1} >
          <Grid item sm={7} xs={10}>
              <Card className={classes.root} variant="outlined" >
              <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
        Wybierz jedną listę z grupy
        </Typography>
         <Typography variant="h5" component="h2">
             Lista aktualnych grup
           </Typography>

         
         {groupList &&
  <Table className = {classes.table}>
  <TableHead>
      <TableRow>
         <TableCell align="center"></TableCell>
         <TableCell align="center">Prowadzi</TableCell>
         <TableCell align="center">Dzień</TableCell>
         <TableCell align="center">Godzina</TableCell>
         <TableCell align="center">Rodzaj</TableCell>
         <TableCell align="center">Poziom</TableCell>
         <TableCell align="center">Zapisanych</TableCell>
      </TableRow>
   </TableHead>
<TableBody>
{listItems } 

</TableBody>

  </Table>
    }
        
           <CardActions>
              <Button onClick={this.handleRefreshButton} variant= "contained" color="secondary" className ={classes.buttonCenter} >
             Odśwież
                    </Button>
                    </CardActions>
   
         </CardContent>
   
         </Card>

         <Card className={classes.root} variant="outlined" >
              <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
          Zarządzaj kursantami
        </Typography>
         <Typography variant="h5" component="h2">
            Dodaj lub usuń kursanta do wybranej grupy
           </Typography>
           <TextField
              id="email"
              name="email"
              type="email"
              label="E-mail kursanta"
              className={classes.textField2}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
        
           <CardActions>
              <Button onClick={this.handleAddToGroup}  variant= "contained" color="secondary" className ={classes.buttonCenter} >
             Dodaj do zaznaczonej grupy
                    </Button>

                    <Button onClick={this.handleDeleteFromGroup}  variant= "contained" color="secondary" className ={classes.buttonCenter} >
             Usuń z zaznaczonej grupy
                    </Button>
                    </CardActions>
   
         </CardContent>
   
         </Card>
         </Grid>

         <Grid item sm={5} xs={10}>
   
       <Card className={classes.root} variant="outlined">
         <CardContent>
         <Typography className={classes.title} color="textSecondary" gutterBottom>
          Zarządzaj grupami
        </Typography>
         <Typography variant="h5" component="h2">
             Stwórz nową grupę
           </Typography>
        
           <form noValidate onSubmit={this.handleCreateNewGroup}>
          
           <Grid item >
            <TextField
              id="prowadzaca"
              name="prowadzaca"
              type="prowadzaca"
              label="Prowadząca"
              className={classes.textField2}
              value={this.state.prowadzaca}
              onChange={this.handleChange}
              fullWidth
            />
         

           <Grid container className ={classes.grid}  >
        <Grid item sm={5} xs={10}>
        <FormControl >
        <InputLabel id="poziom-label">Poziom</InputLabel>
        <Select
          labelId="poziom-label"
          id="poziom"
          name="poziom"
          value={this.state.poziom}
          onChange={this.handleChange}
          className={classes.dropdown}
        >
            <MenuItem value={0} className = {classes.menuitem}>0</MenuItem>
          <MenuItem value={1} className = {classes.menuitem}>1</MenuItem>
          <MenuItem value={2} className = {classes.menuitem}>2</MenuItem>
        </Select>
      </FormControl>
</Grid><Grid item sm={5} xs={10}>
<FormControl >
                    <InputLabel id="rodzaj-label">Rodzaj zajęć</InputLabel>
                    <Select 
                      labelId="rodzaj-label"
                      id="rodzaj"
                      name="rodzaj"
                      value={this.state.rodzaj}
                      onChange={this.handleChange}
                      className={classes.dropdown}
                    >
                      <MenuItem value={"pole dance"} className = {classes.menuitem}>pole dance</MenuItem>
                      <MenuItem value={"kalistenika"} className = {classes.menuitem}>kalistenika</MenuItem>
                      <MenuItem value={"stretching"} className = {classes.menuitem}>stretching</MenuItem>
                    </Select>
                  </FormControl>
                    </Grid>
      

      </Grid>

      </Grid>  
      
                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                 <Grid container spacing={1} >
                 <Grid item sm={6} xs={10} >
            <DatePicker
            ampm={false}
             format={'MM-dd-yyyy'}
             variant="inline"
        label="Wybierz pierwszy dzień"
        value={this.state.startDate}
        onChange={this.handleChangeCalendar}
          /> </Grid>
     
 <Grid item sm={6} xs={10} >
<TimePicker
variant="inline"
        format={'HH:mm'}
        label="Wybierz godzinę"
        value={this.state.startHour}
        onChange={this.handleChangeHour}
          />  </Grid>
       </Grid>
       </MuiPickersUtilsProvider>
       

            <CardActions>
              <Button type="submit" variant= "contained" color="secondary" className ={classes.buttonCenter} >
             Utwórz grupę
                    </Button>
                    </CardActions>
                    </form>


         <Typography variant="h5" component="h2">
             Likwiduj grupę
           </Typography>

         <CardActions>
           <Button onClick={this.handleEndGroups} variant= "contained" color="secondary" className = {classes.button}>Usuń zaznaczoną grupę</Button>

         </CardActions>
         </CardContent>
  
       </Card>


       
      </Grid>

          </Grid>



        )
    }
}
groups.propTypes = {
  classes: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
    data: PropTypes.object.isRequired,
    refreshGroupInfo: PropTypes.func.isRequired,
    deleteGroup: PropTypes.func.isRequired,
    addParticipantToGroup: PropTypes.func.isRequired,
     deleteParticipantFromGroup: PropTypes.func.isRequired,
     createNewGroup: PropTypes.func.isRequired
  };

  const mapStateToProps = (state) => ({
    data: state.data,
    authenticated: state.user.authenticated
  });

 

const mapActionsToProps = {
  refreshGroupInfo,
  deleteGroup,
  addParticipantToGroup, deleteParticipantFromGroup,
  createNewGroup
}




export default connect( mapStateToProps, mapActionsToProps)(withStyles(styles)(groups));

