import React from 'react';
import { Button } from '@material-ui/core';
import { btnstyles } from './BtnStyle';



function UnAuthNav (props){

    const styles = btnstyles()

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

    return(
        <div>
            {buttons.map((button, index) => (
            <Button
                variant="contained"
                id={`button${index}`}
                key={button}
                className={styles.root}
                size="small"
                onClick={button === 'Sign Up' ? handleSignUpClick : handleSignInClick}
            >{button}</Button>))
            }
        </div>

    )

}

export default UnAuthNav;