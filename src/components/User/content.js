import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import * as colors from '../../constants/colors';
import LoaderView from '../Loader';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';

const Content = ( props ) => {
    const { classes, userData, error } = props;

    if ( !userData )
        return (
            <div className={classes.loader}>
                <LoaderView size={150}/>
            </div>
        )

    const { username, nombre, description, rol, image } = userData;
    
        
    return (
        <div className={classes.container}>
            <div className="container text-justify">      
                <section className={classes.section}>
                    <Typography className={classes.h2} variant={'h2'}>Datos</Typography>
                    <div className={classes.content}>
                        <div className={classes.imageContainer}>
                            <img className={classes.img} src={image} alt={image}/>
                        </div>
                        <div className={classes.dataContainer}>
                            <div className={classes.infogroup}>
                                <Typography align = {"justify"} className={classes.textclass}>
                                    <div className={classes.titlesection}><PersonRoundedIcon/> Nombre:</div> {nombre}
                                </Typography>
                            </div>
                            <div className={classes.infogroup}>
                                <Typography align = {"justify"} className={classes.textclass}>
                                    <div className={classes.titlesection}><MailRoundedIcon/> Correo:</div> {username}
                                </Typography>
                            </div>
                            <div className={classes.infogroup}>
                                <Typography align = {"justify"} className={classes.textclass}>
                                    <div className={classes.titlesection}><GroupRoundedIcon/> Equipo:</div> {rol == 1 ? "Investigación" : "Equipo Interdisciplinario"}
                                </Typography>
                            </div>
                            <div>
                                <Typography align = {"justify"} className={classes.textclass}>
                                    <div className={classes.titlesection}><DescriptionRoundedIcon/> Descripción:</div>
                                </Typography>
                            </div>
                            <div className={classes.infogroup}>
                                <Typography align = {"justify"} className={classes.textclass}>
                                    {description}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </section>   
            </div>
        </div>
        );
}

const styles = () => ({

    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    img:{
        maxWidth: '250px',
    },

    titlesection: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    dataContainer: {
        display: 'inline',
        marginLeft: '15px',
        width: '100%',
    },

    section: {
        margin: '20px 0px',
        borderRadius: '5px',
        padding: '20px',
        backgroundColor: colors.GRAY,
    },
  
    container: {
        width: '100%',
    },
  
    textclass: {
        marginTop: '0px',
        marginBottom: '0px'
    }, 

    h2: {
        fontSize: '20px',
        fontWeight: '800'
    },

    loader: {
        textAlign: "center",
        margin: '30px'
    },

    infogroup:{
        marginBottom: '15px',
    },

    [`@media (max-width: ${1000}px)`]: {
        content: {
            display: 'inherit',
            width: '100%',
        },

        imageContainer:{
            width: '100%',
            justifyContent: 'center',
            display: 'flex',
        },

        img: {
            maxWidth: '40%',
        },

        titlesection:{
            borderBottom: '1px solid',
        },
        
    }
  
});
 
export default withStyles(styles)(Content);