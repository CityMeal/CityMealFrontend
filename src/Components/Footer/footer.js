import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="h6" style={{ color: "#D9D9D9" }} >
      ©2021CityMeal
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: '1%',
    paddingBottom: '1%',
    backgroundColor: '#325288',
    color: '#D9D9D9',
    bottom: '0px',
  },
  copyright: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}));


function Footer() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container></Container>
      <div className={classes.copyright} >
        <Container maxWidth="xl">
          <Copyright />
        </Container>
      </div>
    </div>
  );
}
export default Footer;
