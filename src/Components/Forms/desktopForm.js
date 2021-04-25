// import React from 'react';
// import {Modal, TextField} from '@material-ui/core';
// import {Button, makeStyles, createMuiTheme, OutlinedInput, InputLabel, FormControl, useMediaQuery} from '@material-ui/core';
// import ShowSuccess from '../Others/successful';



// function DesktopForm(props) {
//     return(
//         <div>
//             (<Modal open={props.clickedBtn !== null ? true : openModal} onClose={props.closeModal} className={modalClass.root}> 
//                 <form className={formClass.root}>
//                     {props.clickedBtn === 'SIGN UP' ? signUpLabels.map(label => (
//                         <FormControl htmlFor={label} key={label} required>
//                             <InputLabel>{label === 'zipCode' ? 'zip code' : label}</InputLabel>
//                             <OutlinedInput
//                                 id={label}
//                                 size="small"
//                                 name={label}
//                                 className='MuiInput-formControl' 
//                                 value={props.userVals.label} 
//                                 onChange= {props.signupChange}
//                                 type={label === 'password'? "password": null}
//                             />
//                         </FormControl>
//                     )):
//                     signInLabels.map(label => (
//                         <FormControl htmlFor={label} key={label} required>
//                             <InputLabel>{label === 'zipCode' ? 'zip code' : label}</InputLabel>
//                             <OutlinedInput
//                                 id={label}
//                                 size="small"
//                                 name={label}
//                                 className='MuiInput-formControl' 
//                                 value={props.loginVals.label} 
//                                 onChange= {props.signinChange}
//                                 type={label === 'password'? "password": null}
//                             />
//                         </FormControl>
//                     ))
//                     }
//                     <Button variant="contained" size='small' onClick={props.clickedBtn === 'SIGN UP' ? props.submitUser : props.submitLogin}>
//                         {props.clickedBtn === 'SIGN UP' ? 'SIGN UP' : 'SIGN IN'}
//                     </Button>
//                 </form>
//             </Modal>
//             ) 
//         </div>
//     )
// }

// export default DesktopForm