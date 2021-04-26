import React from 'react';
import { Modal, TextField, Button, useMediaQuery } from '@material-ui/core';
import { themes, themes2, modalStyle, formStyle } from './formStyle';
import ShowSuccess from '../Others/successful';



function Form(props) {
    console.log(props.loginVals)
    const modalClass = modalStyle()
    const formClass = formStyle()

    const signUpLabels = ['username', 'email', 'address', 'city', 'zipcode', 'password']
    const signInLabels = ['email', 'password']


    //SET SIGN UP/ SIGN IN MODAL STATE
    const [openModal, setOpenModal] = React.useState(false)

    return (
        <div>
            <Modal open={props.clickedBtn !== null ? true : openModal} onClose={props.closeModal} className={modalClass.root}>
                <form className={formClass.root} >
                    {props.clickedBtn === 'SIGN UP' ? signUpLabels.map(label => (
                        <TextField id={`${label}field`}
                            key={label}
                            // label={label === 'zipcode' ? 'zip code' : label}
                            placeholder={label}
                            type={label === 'password' ? "password" : null}
                            variant="outlined"
                            size="small"
                            name={label}
                            value={props.userVals.label}
                            required
                            onChange={props.onChangeSignup}
                        />
                    )) :
                        signInLabels.map(label => (
                            <TextField id={`${label}field`}
                                key={label}
                                // label={label}
                                placeholder={label}
                                type={label === 'password' ? "password" : null}
                                variant="outlined"
                                size="small"
                                name={label}
                                value={props.loginVals.label}
                                required
                                onChange={props.onChangeSignin}
                            />
                        ))
                    }
                    <Button variant="contained" size='small' type="submit" onClick={props.clickedBtn === 'SIGN UP' ? props.submitUser : props.submitLogin}>
                        {props.clickedBtn === 'SIGN UP' ? 'SIGN UP' : 'SIGN IN'}
                    </Button>
                </form>
            </Modal>
        </div>
    )
}

export default Form