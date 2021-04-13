import React from 'react';
import {Modal, TextField} from '@material-ui/core';

import {Button, makeStyles, createMuiTheme, OutlinedInput, InputLabel, FormControl, useMediaQuery} from '@material-ui/core';



const themes = createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 340, 
        md: 360,
        lg: 411,
        xl: 700,
      },
    },
  })
  const themes2 = createMuiTheme({
    breakpoints: {
      values: {
        tablet: 760,
        laptop: 1024,
        desktop: 1280,
      },
    },
  })

  const modalStyle = makeStyles(() => ({
      root: {
        borderRadius: 2 + 'px',
        position: 'relative',
        margin: 'auto',
        padding: 10 + '%',
        [themes .breakpoints.between('xs', 'sm')]: { 
            width: 67 + '%',
            height: 22 + 'em',
            marginTop: 8 + 'em', 
        },
        [themes .breakpoints.between('md', 'xl')]: { 
            width: 70 + '%',
            height: 22 + 'em',
            marginTop: 10 + 'em',
        },
        [themes2.breakpoints.up('tablet')]: { 
            width: 45 + '%',
            marginTop: 11 + 'em',
            padding: 20 + '%',
            height: 5 + 'em',
        },
        [themes2.breakpoints.up('laptop')]: { 
            width: 50 + '%',
            marginTop: 8 + 'em',
            padding: 15 + '%',
        },
      }
  }))

  const formStyle = makeStyles(theme => ({
      root: {       
        position: 'relative',
        margin: 'auto',
        top: -1 + 'em',
        left: 0 + 'em',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        backgroundColor: ' #D9D9D9',
        color: '#000000',
        '& .MuiTextField-root': {
            margin: theme.spacing(0.8),
            width: 15 + 'em',
            backgroundColor: '#FBF7F7',
        },
        [themes2.breakpoints.up('tablet')]: { 
            top: -9.5 +'em',
            left: -9 + 'em',
            width: 35 + 'em',
            height: 20 + 'em',
            padding: 10 + '%',
            position: 'relative',
            justifyContent: 'flex-end',

            '& .MuiFormControl-root': {
                flexDirection: 'row',
                top: -1 + 'em',
                margin: 0.6 + 'em',
            },
            '& .MuiInputLabel-formControl': {
                left: -5.5 + 'em',
                top: -0.5 + 'em',
            },
            '& .MuiInput-formControl': {
                width: 29 + 'em',
                height: 2 + 'em',
            },
            '& Button' :{
                width: 25 +'%',
                margin: 'auto',
                left: 2 + 'em',
            }
        },
        [themes2.breakpoints.up('laptop')]: {
            left: -6.5 + 'em',
            width: 50 + 'em',
            height: 22 + 'em',
            padding: 10 + '%',
            top: -12 + 'em',
            left: -8 + 'em',
            justifyContent: 'flex-end',

            '& .MuiFormControl-root': {
                flexDirection: 'row',
                position: 'relative',
                top: -4 + 'em',
                left: 2 + 'em',
            },
            '& .MuiInputLabel-formControl': {
                left: -5 + 'em',
                top: 0.5 + 'em',
            },
            '& .MuiInput-formControl': {
                width: 50 + 'em',
                height: 2.5 + 'em',
                margin: 0.5  + 'em',
            },
            '& Button' :{
                width: 25 +'%',
                margin: 'auto',
                top: -5 + 'em',
            },
        },
    }
      
}))

function Forms(props) {

    const modalClass = modalStyle()
    const formClass = formStyle()
    const webForm = useMediaQuery(themes2.breakpoints.up('tablet'))
    

    return (
        <div>
            {webForm !== true ?
            //This is the Mobile form version for sign up
                <Modal open={props.modalOpen} onClose={props.modalClose} className={modalClass.root}> 
                    <form className={formClass.root}>
                        {props.formLabels.map(label => (
                            <TextField id={`${label}field`} 
                                key={label} 
                                label={label === 'ZipCode' ?  'Zip Code': label}
                                type={label === 'Password'? "password": null}
                                variant="outlined" 
                                size="small" 
                                name={label}
                                value= {props.formLabels.length > 2 ? props.userVals.label : props.loginVals.label}
                                required={label === 'Zip Code' ? false : true}
                                onChange={props.formLabels.length > 2 ? props.userChange : props.loginChange}
                            />
                        ))}
                        <Button 
                            variant="contained" 
                            size='small'
                            onClick={props.formLabels.length > 2 ? props.onSubmitUserDetails : props.onSubmitLoginDetails}
                        >
                            {props.formLabels.length > 2 ? 'SIGN UP' : 'SIGN IN'}
                        </Button>
                    </form>
                </Modal> : 
                //This is the Desktop form version for sign up
                (<Modal open={props.modalOpen} onClose={props.modalClose} className={modalClass.root}> 
                    <form className={formClass.root}>
                        {props.formLabels.map(label => (
                            <FormControl htmlFor={label} key={label} required={label === 'Zip Code' ? false : true}>
                                <InputLabel>{label === 'ZipCode' ?  'Zip Code': label}</InputLabel>
                                <OutlinedInput 
                                    id={label}  
                                    size="small" 
                                    name={label}
                                    className='MuiInput-formControl' 
                                    value={props.formLabels.length > 2 ? props.userVals.label : props.loginVals.label} 
                                    onChange={props.formLabels.length > 2 ? props.userChange : props.loginChange}
                                    type={label === 'Password'? "password": null}
                                />
                            </FormControl>
                        ))}
                        <Button 
                            variant="contained" 
                            size='small'
                            onClick={props.formLabels.length > 2 ? props.onSubmitUserDetails : props.onSubmitLoginDetails}
                        >
                            {props.formLabels.length > 2 ? 'SIGN UP' : 'SIGN IN'}
                        </Button>
                    </form>
                </Modal>) 
            }
        </div>
    );
}

export default Forms;

