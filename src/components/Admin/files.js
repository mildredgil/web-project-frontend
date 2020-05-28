import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import AddBox from '@material-ui/icons/AddBox';
import * as colors from '../../constants/colors';
import PublishIcon from '@material-ui/icons/Publish';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { axiosUsers } from "../../Utils/axiosApi";

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

let formatDate = (date) => {
  console.log("date", date, typeof(date))
  if(typeof(date) === "string") {
    return date.split("/").join("-");
  } else {
    return (date.getMonth() + 1) + "-" + date.getDate()  + "-" + date.getFullYear();
  }
}

const Files = ({classes}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [state, setState] = React.useState({
    columns: [],
    data: [],
  });
  const [selectedFile, setSelectedFile] = React.useState(null);

  React.useEffect(() => {
    get();
  }, [])

  let get = () => {
    axiosUsers.get(`/region/states/csv`)
    .then( (response) => {
      let columns = [];
      for (const col of response.data.columns) {
        let colu;  
        if(col == "date") {
            colu = {
              title: 'Fecha', field: 'date', readonly: true, type: 'date'
            }
          } else {
            colu = {
              title: col, field: col, type: 'numeric'
            }
          }
        columns.push(colu);
      }
      setIsLoading(false)
      setState({columns: columns, data: response.data.rows})
    }).catch((err) => {
      console.log(err)
    });
  }

  // On file select (from the pop up) 
  let onFileChange = event => { 
    setSelectedFile(event.target.files[0]);
  }; 
   
  let onFileUpload = () => { 
    // Create an object of formData 
    const formData = new FormData(); 
   
    // Update the formData object 
    formData.append( 
      "myFile", 
      selectedFile, 
      "edos_date.csv" 
    ); 
   
    // Details of the uploaded file 
    console.log(selectedFile); 
   
    // Request made to the backend api 
    // Send formData object 
    axiosUsers.post("/region/upload/csv", formData)
    .then((result) => {
      console.log(result)
      get();
    }).catch((err) => {
      console.log(err)
    });
  };

  return (
    <React.Fragment>
      <MaterialTable
        isLoading={isLoading}
        icons={tableIcons}
        title="CSV Regiones"
        columns={state.columns}
        style={{ padding: '0px'}}
        data={state.data}
          localization={{
            pagination: {
                labelDisplayedRows: '{from}-{to} de {count}',
                labelRowsSelect: 'líneas',
                firstTooltip: 'Primera Página',
                previousTooltip: 'Página anterior',
                nextTooltip: 'Próxima página',
                lastTooltip: 'Última página'
            },
            toolbar: {
                nRowsSelected: '{0} usuario(s) seleccionados',
                searchPlaceholder: "Buscar",
                labelRowsSelect: "usuarios"
            },
            header: {
                actions: 'Acciones'
            },
            body: {
                addTooltip: 'Nuevo',
                deleteTooltip: 'Borrar',
                editTooltip: 'Editar',
                emptyDataSourceMessage: 'No hay usuarios que mostrar',
                filterRow: {  
                    filterTooltip: 'Filtro'
                },
                editRow: {
                  saveTooltip: 'Acepto',
                  cancelTooltip: 'Cancelar',
                  deleteText: '¿Estás seguro que deseas borrarlo?'
                }
            }
        }}
        editable={{
          onRowAdd: (newData) =>
            axiosUsers.post(`/region/add/csv/${formatDate(newData.date)}`, newData)
              .then( (response) => {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data.push(response.data);
                  return { ...prevState, data };
                });
              }).catch((err) => {
                return null;
              }),
          onRowUpdate: (newData, oldData) =>
            axiosUsers.put(`/region/update/csv/${formatDate(newData.date)}`, {
              data: {
                ...newData,
                date: formatDate(newData.date)
              }
            })
            .then( (response) => {
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = response.data;
                  return { ...prevState, data };
                });
              }
            }).catch((err) => {
              return null;
            }),
          onRowDelete: (oldData) =>
          axiosUsers.delete(`/region/delete/csv/${formatDate(oldData.date)}`)
          .then( (response) => {
            setState((prevState) => {
              const data = [...prevState.data];
              data.splice(data.indexOf(oldData), 1);
              return { ...prevState, data };
            });
          }).catch((err) => {
            return null;
          }),
        }}
      />
      <div className={classes.uploadContainer}> 
          {
            selectedFile ?
            <div> 
              <p>Nombre: {selectedFile.name}</p> 
              <p>Tipo: {selectedFile.type}</p> 
            </div> 
            :
            <Typography className={classes.h1} variant={'p'}>
              Sube el archivo csv que remplazará todos los datos de regiones.
            </Typography>	 
          }
          <div> 
              <input accept=".csv,.xls,.xlsx" id="contained-button-file" type="file" onChange={onFileChange} className={classes.input}/> 
              <label htmlFor="contained-button-file">
                <Button className={classes.uploadButton} variant="contained" color="primary" component="span">
                  Escoger Archivo
                </Button>
              </label>
              <IconButton className={classes.publishIcon} aria-label="subir-csv" disabled={selectedFile == null} onClick={onFileUpload}>
                <PublishIcon />
              </IconButton>
          </div> 
      </div> 
    </React.Fragment>
  );
}

const styles = () => ({
  publishIcon: {

  },

  table: {
    padding: '5px'
  },
  
  uploadButton: {
    backgroundColor: colors.BLACK,
    '&:hover': {
      backgroundColor: colors.GRAY_LIGHTER,
    }
  },

  uploadContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '50px'
  },

  input: {
    display: 'none',
  },

  [`@media (max-width: ${1000}px)`]: {
		uploadContainer: {
      alignItems: 'flex-start',
      flexDirection: 'column',
      marginTop: '50px'
    },
  }
  
});

export default withStyles(styles)(Files);