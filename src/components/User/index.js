import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Header from '../Header/';
import Footer from '../Footer/';
import * as colors from '../../constants/colors';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import Edit from './edit';
import Content from './content';
import { AppContext } from "../../contexts/AppContext";
import { axiosUsers } from '../../Utils/axiosApi';

const User = ({classes}) => {
  const { username, token, logout } = React.useContext(AppContext);
  const [ userData, setUserData ] = React.useState(null);
  const [ error, setError ] = React.useState(null);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    if ( username && token) {
      console.log("userInfo call")
      userInfo();
    }
      
  }, [username]);
  
  let userInfo = () => {
    console.log(axiosUsers)
    axiosUsers.post(`/user/find`, {
      username
    })
    .then( (response) => {
      setUserData(response.data)
      setError(null)
    }).catch((err) => {
      setUserData(null);
      setError({message: err.response.statusText})
    });
  }

  let update = (data) => {
    console.log(data)
    setIsEditing(true)
    axiosUsers.put(`/user/update`, {
      query: {username},
      data: data
    })
    .then( (response) => {
      setUserData(response.data)
      setError(null)
      setIsEditing(false)
    }).catch((err) => {
      setIsEditing(false)
      setError({message: err.response.statusText})
    });
  }

  let onChange = () => {
    setIsEdit(!isEdit)
  }

  return (
    <div>
      <Helmet>
          <title>Perfil | MexiCOVID</title>
      </Helmet>
      <div className={classes.container}>
        <Header fixed={true}/>
        <div className={classes.teamsContainer}>
          <header className={classes.header}>
              <Typography className={classes.h1} variant={'h1'}>Mi Perfil</Typography>	
              <Button className={classes.label} onClick={onChange}> 
								{isEdit ? 'Ver Perfil' : 'Editar'} 
                {isEdit ? <VisibilityRoundedIcon/> : <EditRoundedIcon/>}
							</Button>
          </header>
          {!isEdit ?
            <Content userData={userData} error={error}/>
          : 
            <Edit userData={userData} update={update} isEditing={isEditing} error={error}/>}
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

  teamsContainer: {
    width: '70%',
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
		teamsContainer: {
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
 
export default withStyles(styles)(User);