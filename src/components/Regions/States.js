import React from 'react';
import { withStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import * as colors from '../../constants/colors';
import MyResponsiveLine from './LineChart';
import { RegionContext } from '../../contexts/RegionContext';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import {ArrowBack} from '@material-ui/icons';
import Chip from '@material-ui/core/Chip';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from '../Loaders/';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	padding: {
		padding: theme.spacing(3)
	},
	demo1: {
		backgroundColor: theme.palette.background.paper
	},
	demo2: {
		backgroundColor: "#2e1534"
	}
}));

const States = ({ classes }) => {
	const {
		selectedStates, 
		statesToChart,
		states, 
		handleClick, 
		stateValue, 
		stateChange, 
		handleDelete,
		addAll,
		deleteAll,
		isState, 
		changeState
	} = React.useContext(RegionContext);
	  
	const isMobile = window.innerWidth < 1000;

	const [value, setValue] = React.useState(0);

	const [view, setView] = React.useState(0)
	const [sidebarVisible, setSidebarVisible] = React.useState(true);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const handleChangeIndex = (index) => {
		setValue(index);
	};
	const title = `Seguimiento por ${isState ? 'Estado' : 'Municipio'}`;
	const subtitle = !isState ? 'Estado' : 'Municipio';


	const sections = [
		{
			title: 'Número de Confirmados Positivos por Estado y por 100,000 Habitantes',
			subtitle: '<u>Instrucciones</u>: Se seleccionan automáticamente los cinco estados con las tasas de confirmados-positivos más altas a nivel nacional. Tú puedes interactuar con el tablero, seleccionando y deseleccionando las comparaciones entre estados que quieras realizar.',
			render: ()=>(
				selectedStates.length == 0 ? <Loader/> :
					<div className={classes.graphContainer}>
						<div className={classes.selectorContainer}>
							<div className={classes.selector}>
								<Autocomplete
									id="estados-mexico-100k"
									options={states}
									getOptionLabel={(option) => option.title}
									style={{ width: isMobile ? '100%' : '200px' }}
									inputValue={stateValue}
									onInputChange={(event, newValue) => {stateChange( newValue);}}
									renderInput={(params) => <TextField {...params} label="Estados" />}
								/>
								<Button onClick={handleClick} startIcon={<AddRoundedIcon />}>Agregar</Button>
								<Button onClick={addAll} startIcon={<AddRoundedIcon />}> Todos</Button>
								<Button onClick={deleteAll} startIcon={<DeleteIcon />}>Eliminar</Button>
							</div>
							<div className={classes.chipContainer}>
								{selectedStates.length > 0 && selectedStates.map((state, index) => (
									<Chip
										size="small"
										label={state.title}
										onDelete={(e) => {handleDelete(state.id)}}
										style={{ backgroundColor: state.id === "NACIONAL" ? colors.WHITE : state.color }}
									/>
								))}
							</div>
						</div>
						<div className={classes.chart}>
							{statesToChart && <MyResponsiveLine data={statesToChart} isSmall={isMobile} className={{root: classes.chartatyle}}/>}
						</div>
					</div>
			)
		},
		{
			title: 'Disponibilidad de camas para hospitalización y en unidades de cuidado intensivo (UCI)',
			subtitle: 'Mediante esta visualización se da seguimiento a la evolución del número de casos de COVID19 a nivel estatal que han requerido hospitalización, así como los casos graves que se encuentran en cuidado intensivo. Su objetivo es identificar las entidades federativas en las cuales, dada la evolución de los casos, será necesario destinar mayores recursos e infraestructura para lograr atender la demanda de atención médica. Para identificar el número y tipo de casos se utiliza la información más desagregada que el Gobierno Federal empezó a publicar a partir del 13 de abril. Respecto al número de camas a nivel estatal se utiliza la información de la Secretaría de Salud de 2018.',
			render: ()=>(
				<iframe src="https://public.tableau.com/views/mexicovid19_camasv2/Dashboard1?:embed=y&amp;:showVizHome=no&amp;:host_url=https%3A%2F%2Fpublic.tableau.com%2F&amp;:embed_code_version=3&amp;:tabs=no&amp;:toolbar=yes&amp;:animate_transition=yes&amp;:display_static_image=no&amp;:display_spinner=no&amp;:display_overlay=yes&amp;:display_count=yes&amp;publish=yes&amp;:loadOrderID=0" className={classes.graphContainer}></iframe>
			)
		},
		{
			title: 'Casos confirmados acumulados de COVID-19 por rango de edad',
			subtitle: 'Mediante esta visualización se da seguimiento a la evolución del número de casos de COVID19 a nivel Estatatal.',
			render: ()=>(
				<iframe src="https://public.tableau.com/views/mexicovid19_edades/Dashboard1?:embed=y&:embed_code_version=3&:loadOrderID=0&:display_count=y&publish=yes&:origin=viz_share_link" className={classes.graphContainer}></iframe>
			)
		}
	]

	return (
		// <React.Fragment>
		<div className={classes.container}>
			{sidebarVisible || !isMobile ? (
				<div className={classes.sidebar}>
					<header id="header" className={classes.header}>
						<Typography className={classes.h1} variant={'h1'}> {title} </Typography>	
						<Button className={classes.label} onClick={changeState}> 
							{subtitle} <ArrowForwardIosRoundedIcon/>
						</Button>
					</header>

					{sections.map((section, i)=>(
						<section className = {classes.section} style={{borderColor: view==i? colors.BLUE : '', background: view==i? colors.GRAY : 'rgb(240,240,240)'}} onClick={()=>{
							setView(i);
							setSidebarVisible(false);
						}}>
							<Typography className={classes.h2} variant={'h2'}>{section.title}</Typography>
							<p className={classes.textcontainer1} dangerouslySetInnerHTML={{__html: section.subtitle}}></p>
							<p className={classes.textcontainer1} dangerouslySetInnerHTML={{__html: section.description}}></p>
						</section>
					))}
				</div>
			):null}
			<div className={classes.content}>
				<div style={{display: 'flex', alignItems: 'center', paddingLeft: isMobile? '16px': 0, paddingRight: isMobile? '16px': 0}}>
					{isMobile ? (
						<ArrowBack onClick={()=>{ setSidebarVisible(true) }} classes={{root: classes.backIcon}}></ArrowBack>
					):null}
					<Typography className={classes.h2} variant={'h2'}>{sections[view].title}</Typography>
				</div>
				{sections[view].render()}
			</div>
		</div>
	);
}

const styles = () => ({
	container: {
		display: 'flex', width: '100%', background: 'blue', height: '100%', overflow: 'hidden'
	},
	sidebar: {
		padding: '16px',
		background: colors.WHITE,
		height: '100%',
		width: '500px',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		overflow: 'auto',
		zIndex: 10,
		boxSizing: 'border-box',
		"& > *": {
			flexShrink: 0
		},
		flexShrink: 0,
		boxSizing: 'border-box'
	},
	sidebarHeader: {
		borderBottom: `1px solid ${colors.BLACK}`,
		display: 'flex',
    	alignItems: 'baseline',
		justifyContent: 'space-between',
		maxWidth: '900px',
		justifySelf: 'flex-start'
	},
	
	h1: {
		fontSize: '36px'
	},

	h2: {
		fontSize: '24px',
		marginBottom: '8px',
		marginTop: '8px',
		fontWeight: 'bold'
	},

	section: {
		margin: '20px 0px',
    	borderRadius: '5px',
    	padding: '20px',
		backgroundColor: colors.GRAY,
		display: 'flex', 
		flexDirection: 'column',
		borderStyle: 'solid', 
		borderWidth: 2,
		borderColor: 'transparent'
	},

	content: {
		flex: 1, 
		backgroundColor: 'white',
		padding: '16px',
		width: '100%',
		flex: 1,
		height: '100%',
		display: 'flex', 
		flexDirection: 'column',
		position: 'relative',
		overflow: 'auto'
	}, 

	graphContainer: {
		width: '100%',
		flex: 1,
		display: 'flex', 
		flexDirection: 'column'
	},

	backIcon: {
		height: '40px',
		width: '40px'
	},

	header: {
		borderBottom: `1px solid ${colors.BLACK}`,
		display: 'flex',
    	alignItems: 'baseline',
    	justifyContent: 'space-between',
	},

	label: {
		color: colors.GRAY_LIGHT
	},

	

	chart: {
		height: '5px',
		width: '100%',
		flex: 1
	},

	button: {
		borderRadius: '0px',
		justifyContent: 'end'
	},

	buttonPlace: {
		color: 'black',
		minHeight: '40px',
		textAlign: 'right',
		alignSelf: 'flex-end',
	},

	icon: {
		marginLeft: '5px'
	},
	
	iconcontainer: {
		height: '100% !important',
		width: '15% !important',
		color: colors.BLACK,
	},

	selector: {
		display: 'flex',
		alignItems: 'normal',
		flexDirection: 'column'
	},

	chipContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		'& > *': {
			margin: '5px',
		},
	},
		
	chartatyle: {
		paddingLeft: '50px',
		paddingRight: '60px',
		paddingBottom: '50px'
	},

	sectioncontainer:{
		display: 'flex',
		flexDirection: 'row',
	},

	agesectioncontainer: {
		width: '100%',
		display: 'inline-grid',
		flexDirection: 'column',
	},


	textcontainer:{
		textAlign:'justify'
	},

	textcontainer1:{
		textAlign:'justify',
		margin: '4px 0px'
	},
	selectorContainer: {
		display: 'flex'
	},
	

	[`@media (max-width: ${1000}px)`]: {
		
		
		sidebar: {
			position: 'fixed',
			width: '100%',
			top: '64px', 
			bottom: 0
		}, 
		content: {
			padding: 0,
		},
		
		sectioncontainer:{
			display: 'flex',
			flexDirection: 'column',
			alignItems:'center',
		},
		
		iconcontainer: {
			height: '100% !important',
			width: '50% !important',
			color: colors.BLACK,
		},
		
		selector:{
			flexDirection: 'column'
		},
		graphContainer: {
			padding: '5px'
		},
		selectorContainer: {
			flexDirection: 'column'
		},
		heat:{
			height: '300px'
		},
		tabsContainer:{
			backgroundColor:'white'
		}
	},
	
});

export default withStyles(styles)(States);