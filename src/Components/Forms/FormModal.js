import React from 'react';
import MobileForm from './mobileForm';
import DesktopForm from './desktopForm'
import {themes2, useMediaQuery} from './formStyle';
import ShowSuccess from '../Others/successful';



function Forms(props) {

    const webForm = useMediaQuery(themes2.breakpoints.up('tablet'))

    

    return (
        <div>
            {!webForm ?
                <MobileForm /> 
            :
                <DesktopForm />
            }
        </div>
    );
}

export default Forms;

