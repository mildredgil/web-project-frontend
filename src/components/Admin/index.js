import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/';
import Footer from '../Footer/';
import * as colors from '../../constants/colors';
import { Helmet } from 'react-helmet';
import PanelTabs from './PanelTabs';

const AdminPanel = ({classes}) => {

  return (
    <div>
      <Helmet>
          <title>Panel | MexiCOVID</title>
      </Helmet>
      <div className={classes.container}>
        <Header fixed={true}/>
        <div className={classes.panelContainer}>
          <header className={classes.header}>
              <Typography className={classes.h1} variant={'h1'}>Panel de Administrador</Typography>	
          </header>
          <PanelTabs/>
        </div>
        <Footer/>
      </div>
    </div>
    );
}

const styles = () => ({
  section: {
		margin: '20px 0px',
    borderRadius: '5px',
    padding: '20px',
    backgroundColor: colors.GRAY,
	},
  
  container: {
    width: '100%',
    backgroundColor: colors.GRAY,
  },

  panelContainer: {
    width: '85%',
		margin: 'auto',
		padding: '25px',
    paddingTop: '128px',
    backgroundColor: colors.WHITE
  },
  
  header: {
		borderBottom: `1px solid ${colors.BLACK}`,
		display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },

  h1: {
		fontSize: '36px'
	},
  
  textclass: {
    marginTop: '0px',
    marginBottom: '0px'
  }, 

  [`@media (max-width: ${1000}px)`]: {
		panelContainer: {
			width: '100%',
			padding: '10px',
			paddingTop: '60px'
		},
		header: {
			alignItems: 'flex-end'
		},
		h1: {
			fontSize: '24px'
		},
  }
  
});
 
export default withStyles(styles)(AdminPanel);