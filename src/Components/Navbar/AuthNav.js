import React from 'react';
import styled from 'styled-components'
import { Button, Tabs ,Avatar} from '@material-ui/core';
import Tab from '@material-ui/core/Tab';
import { Link } from 'react-router-dom';
import {mobileStyle, tablet} from './meulist'

function AuthNav(props){
    const mobile = mobileStyle()
    const desktop = tablet()
    console.log(!desktop)

    const menuList = ['HOME', 'LIST', 'FAVORITES', 'PROFILE', 'SIGNOUT']

    const [value, setValue] = React.useState(0);

    function LinkTab(props) {
        return (
          <Tab
            component="a"
            onClick={(event) => {
              event.preventDefault();
              console.log('Im clicking Tab')
              console.log(props)
              setValue(props.value);
            }}
            {...props}
          />
        );
      }

    const a11yProps = (index) => {
        return {
          id: `vertical-tab-${index}`,
          'aria-controls': `vertical-tabpanel-${index}`,
        };
      }

    const handleChange = (event, newValue) => {
        console.log(newValue)
        setValue(newValue);
    };
    console.log(value)

    return (
        //mobile  nav  then deskto nav
        <div className={mobile.root}>
            <Avatar  className={mobile.name}variant = "square" onClick={() => (console.log('im clicking avatar'))}>USERNAME</Avatar>
            <Tabs orientation="vertical" variant="scrollable" value={value} onChange={handleChange}  selected>
                {
                    menuList.map((option, index) => (
                        <Link to={option === 'SIGNOUT' ? '/HOME' : option} className={mobile.link}>
                            <LinkTab label = {option} value={index} >{option}</LinkTab>
                        </Link>
                    ))
                }
            </Tabs>
        </div>
        
    )

}

export default AuthNav;