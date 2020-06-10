import axios from 'axios';
import { 
    GET_CANCEL, GET_GROUPS
    } from '../types';
     
export const uploadCancelledData = () => (dispatch) =>{
    axios
    .get('/getcanceled')
    .then((res) => {
        console.log(res.data)
        res.data.canceled.sort()
        dispatch({ type: GET_CANCEL,
                payload: res.data });
    })
    .catch((err) => {console.log(err)
    });
};  


export const refreshGroupInfo = () => (dispatch) => {
  axios
  .get('/getgroups')
  .then((res) => {
      console.log(res.data)
      dispatch({ type: GET_GROUPS,
              payload: res.data });
  })
  .catch((err) => {console.log(err)
  });
};

export const updateDates = () => (dispatch) => {
    axios
      .post('/setnewtermins')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
      });
  };


  

  export const deleteGroup = (data)  => (dispatch)=> {

    const newData = {
      'documentId' : data
    }
  

    axios
      .post('/finishclass', newData)
      .then((res) => {
    
      })
      .catch((err) => {
      });
  };


  export const updateCatchUp = ()  => (dispatch)=> {
    axios
      .post('/setimpossible')
      .then((res) => {
    
      })
      .catch((err) => {
      });
  };

  
  export const updateCancelledData = (data)  => (dispatch)=> {
    axios
      .post('/addcanceled', data)
      .then((res) => {
    
      })
      .catch((err) => {
      });
  };

  export const deleteParticipantFromGroup = (email, group)  => (dispatch)=> {

    const newData = {
      'documentId' : group,
      'email' : email
    }
    console.log(newData)
    axios
      .post('/userresigne', newData)
      .then((res) => {
    
      })
      .catch((err) => {
      });
  };

  export const createNewGroup = (prowadzaca, poziom, rodzaj, day, time)  => (dispatch)=> {

    const newData = {
      'teacher' : prowadzaca,
      'level' : poziom,
      'type' : rodzaj,
      'day' : day,
      'sec': time

    }
    axios
      .post('/addgroup', newData)
      .then((res) => {
    
      })
      .catch((err) => {
      });
  };



  export const addParticipantToGroup = (email, group)  => (dispatch)=> {
    const newData = {
      'documentId' : group,
      'email' : email
    }
    console.log(newData)
    axios
      .post('/signuserclass', newData)
      .then((res) => {
    
      })
      .catch((err) => {
      });
  };

