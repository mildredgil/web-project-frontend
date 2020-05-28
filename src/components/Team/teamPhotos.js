import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import * as colors from '../../constants/colors';
import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';

const PhotoGrid = (props) => {
    const { classes, equipo, investigadores } = props;

    if(!equipo || !investigadores) 
        return null;

    return (
        <div className="container-fluid bg-3 text-center">    
            <Typography align={'center'} variant={'h2'} classes={{root:classes.sectionTitles}}>
                Equipo Interdisciplinario de Profesores
            </Typography>
            <Grid container item xs spacing={3} direction="row"  justify="space-around"  alignItems="center">
                {equipo.map((user) => {
                    return (
                    <div className={classes.photoGridItem}>
                        <p className="names" align={'center'}>{user.nombre}</p>
                        <img src={user.image} className="img-responsive" alt="Image"/>
                        <p>{user.description}</p>
                        <Grid alignContent="center">
                            <a href={`mailto:${user.username}`} target="_blank" className={classes.contactText}><MailIcon className={classes.iconspace}/>{user.username}</a>
                        </Grid>
                    </div>)
                })}
            </Grid>
            <Typography align={'center'} variant={'h2'} classes={{root:classes.sectionTitles}}>
                Equipo de Investigación 
            </Typography>
            <Grid container item xs spacing={3} direction="row"  justify="space-around"  alignItems="center">
                {investigadores.map((user) => {
                    return (
                    <div className={classes.photoGridItem}>
                        <p className="names" align={'center'}>{user.nombre}</p>
                        <img src={user.image} className="img-responsive" alt="Image"/>
                        <p>{user.description}</p>
                    </div>)
                })}
            </Grid>
        </div>
    );
};

const styles = () => ({
    container: {
        width: '100%',
        backgroundColor: colors.GRAY,
    },

    photoGrid: {
        width: '900px',
        display: 'flex',
        justifyContent: 'flex-start',
    },

    photoGridItem: {
        border: '1px solid #fff',
        width: '300px',
        height: '300px',
        marginTop: '30px !important',
        marginBottom: '150px !important'
    },

    photoGridItemTeacher: {
        border: '1px solid #fff',
        width: '300px',
        height: '300px',
        marginTop: '30px !important',
        marginBottom: '80px !important'
    },

    contactText:{
        display:'flex',
        
    },

    iconspace: {
        marginRight: '5px',
        top: '0px',
        left: '0px',
        cursor: 'pointer',
        color: colors.BLACK,
    },

    [`@media (max-width: ${1000}px)`]: {
        sectionTitles:{
            fontSize: 'xx-large',
        }		
	},
    
});

   
export default withStyles(styles)(PhotoGrid);