import React from 'react';
import { Button } from '@material-ui/core';
import { btnstyles } from './BtnStyle';
import Form from '../Forms/Form'



function UnAuthNav(props) {
    const btnClasses = btnstyles()

    const buttons = ['Sign Up', 'Sign In']

    const [clickedBtn, setClickedBtn] = React.useState(null)


    const handleSignUpClick = () => {
        console.log('clicking sign up')
        setClickedBtn('SIGN UP')
    }

    const handleSignInClick = (e) => {
        console.log('clicking sign in')
        setClickedBtn('SIGN IN')
    }

    //CLOSE MODAL FUNCTION
    const handleModalClose = () => {
        setClickedBtn(null)
    }

    return (
        <div className={btnClasses.signBtn}>
            {buttons.map((button, index) => (
                <Button
                    id={`button${index}`}
                    key={button}
                    // className={styles.space}
                    className={btnClasses.root}
                    size="small"
                    onClick={button === 'Sign Up' ? handleSignUpClick : handleSignInClick}
                >{button}</Button>))
            }
            <Form
                clickedBtn={clickedBtn}
                closeModal={handleModalClose}
                onChangeSignup={props.signupChange}
                onChangeSignin={props.signinChange}
                userVals={props.userVals}
                loginVals={props.loginVals}
                submitUser={props.submitUser}
                submitLogin={props.submitLogin}
            />
        </div>

    )

}

export default UnAuthNav;