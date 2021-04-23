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
        [themes.breakpoints.between('xs', 'sm')]: {
            width: 67 + '%',
            marginTop: 8 + 'em',
        },
        [themes.breakpoints.between('md', 'xl')]: {
            width: 70 + '%',
            marginTop: 10 + 'em',
        },
        [themes2.breakpoints.up('tablet')]: {
            width: 45 + '%',
            marginTop: 11 + 'em',
            padding: 20 + '%',
        },
        [themes2.breakpoints.up('laptop')]: {
            width: 60 + '%',
            padding: 0 + '%',
            marginTop: 20 + 'em',
            marginLeft: 20 + 'em',
        },
    }
}))

const formStyle = makeStyles(theme => ({
    root: {
        position: 'relative',
        margin: 'auto',
        top: -5 + 'em',
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
        '& Button': {
            margin: 'auto',
        },
        [themes2.breakpoints.up('tablet')]: {
            top: -13.5 + 'em',
            left: -10.5 + 'em',
            width: 38 + 'em',
            padding: 10 + '%',
            position: 'relative',

            '& .MuiFormControl-root': {
                flexDirection: 'row',
                marginLeft: 5 + 'em',
                margin: theme.spacing(0.5),
                width: 33 + 'em',
                backgroundColor: '#FBF7F7',
            },
            '& .MuiInputBase-root': {
                display: 'contents',
                position: 'relative',
                alignItems: 'center',
                left: 8 + 'em',
            },
            '& .MuiInputLabel-formControl':{
                left: -6 +'em',
                color: '#000000'
            },
 
            '& Button': {
                left: 2 + 'em',
            }
        },
        [themes2.breakpoints.up('laptop')]: {
            width: 50 + 'em',
            padding: 4 + '%',
            top: -13 + 'em',
            marginLeft: 5 + 'em',
            margin: theme.spacing(0.5),

            '& .MuiFormControl-root': {
                flexDirection: 'row',
                position: 'relative',
                top: -2 + 'em',
                width: 45 + 'em',
                marginLeft: 6 + 'em',
                
            },
            '& .MuiInputLabel-formControl': {
                left: -6 + 'em',
            },
            '& .MuiInput-formControl': {
                width: 50 + 'em',
                height: 2.5 + 'em',
                margin: 0.5 + 'em',
            },
            '& Button': {
                top: -2 + 'em',
            },
        },
    }

}))

function Forms(props) {


    const modalClass = modalStyle()
    const formClass = formStyle()
    const webForm = useMediaQuery(themes2.breakpoints.up('tablet'))

    const signUpLabels = ['username', 'email', 'address', 'city', 'zipcode', 'password']
    const signInLabels = ['email', 'password']


    //SET SIGN UP/ SIGN IN MODAL STATE
    const [openModal, setOpenModal] = React.useState(false)

    const onSubmitClose = (e) => {
        console.log(e.target)
        return props.closeModal
    }


    return (
        <div>
            {!webForm ?
            //This is the Mobile form version for sign up
                <Modal open={props.clickedBtn !== null ? true : openModal} onClose={props.closeModal} className={modalClass.root}> 
                    <form className={formClass.root} onSubmit={onSubmitClose}>
                        {props.clickedBtn === 'SIGN UP' ? signUpLabels.map(label => (
                            <TextField id={`${label}field`} 
                                key={label} 
                                label={label === 'zipcode' ?  'zip code': label}
                                type={label === 'password'? "password": null}
                                variant="outlined" 
                                size="small" 
                                name={label}
                                value= {props.userVals.label}
                                defaultValue =""
                                required
                                onChange= {props.signupChange}
                            />
                        )):
                        signInLabels.map(label => (
                            <TextField id={`${label}field`} 
                                key={label} 
                                label={label}
                                type={label === 'password'? "password": null}
                                variant="outlined" 
                                size="small" 
                                name={label}
                                value= {props.loginVals.label}
                                required
                                onChange= {props.signinChange}
                            />
                        ))
                        }
                        <button variant="contained" size='small' type="submit" onClick={props.clickedBtn === 'SIGN UP' ? props.submitUser : props.submitLogin}>
                            {props.clickedBtn === 'SIGN UP' ? 'SIGN UP' : 'SIGN IN'}
                        </button>
                    </form>
                </Modal> :
                //This is the Desktop form version for sign up
                (<Modal open={props.clickedBtn !== null ? true : openModal} onClose={props.closeModal} className={modalClass.root}> 
                    <form className={formClass.root}>
                        {props.clickedBtn === 'SIGN UP' ? signUpLabels.map(label => (
                            <FormControl htmlFor={label} key={label} required>
                                <InputLabel>{label === 'zipCode' ? 'zip code' : label}</InputLabel>
                                <OutlinedInput
                                    id={label}
                                    size="small"
                                    name={label}
                                    className='MuiInput-formControl' 
                                    value={props.userVals.label} 
                                    onChange= {props.signupChange}
                                    type={label === 'password'? "password": null}
                                />
                            </FormControl>
                        )):
                        signInLabels.map(label => (
                            <FormControl htmlFor={label} key={label} required>
                                <InputLabel>{label === 'zipCode' ? 'zip code' : label}</InputLabel>
                                <OutlinedInput
                                    id={label}
                                    size="small"
                                    name={label}
                                    className='MuiInput-formControl' 
                                    value={props.loginVals.label} 
                                    onChange= {props.signinChange}
                                    type={label === 'password'? "password": null}
                                />
                            </FormControl>
                        ))
                        }
                        <Button variant="contained" size='small' onClick={props.clickedBtn === 'SIGN UP' ? props.submitUser : props.submitLogin}>
                            {props.clickedBtn === 'SIGN UP' ? 'SIGN UP' : 'SIGN IN'}
                        </Button>
                    </form>
                </Modal>) 
            }
        </div>
    );
}

export default Forms;

