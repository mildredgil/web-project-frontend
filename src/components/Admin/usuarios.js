import React from 'react';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import { axiosUsers } from "../../Utils/axiosApi";
import AddBox from '@material-ui/icons/AddBox';
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

const columns = [
  { title: 'Nombre', field: 'nombre' },
  { title: 'Correo', field: 'username' },
  { title: 'Imagen', field: 'image', render: rowData => <img src={rowData.image} style={{width: 50, borderRadius: '50%'}}/>},
  {
    title: 'Rol',
    field: 'rol',
    lookup: { 0: 'Administrador', 1: 'Investigación', 2:'Equipo Interdisciplinario' },
  },
  { title: 'Descripción', field: 'description', 
    cellStyle: {
      overflow: 'hidden',
      minWidth: '200px',
    }
  },
  { title: 'Contraseña', field: 'password', readonly: true}

]
const Usuarios = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [state, setState] = React.useState({
    columns: columns,
    data: []});

  let get = () => {
    axiosUsers.get(`/user/all`)
    .then( (response) => {
      let data = response.data.map(user => {
        return {...user, password: '*********'}
      });
      setState({columns: columns, data: data})
      setError(null);
      setIsLoading(false)
    }).catch((err) => {
      setState({...columns});
      setError({message: err.response.statusText})
    });
  }

  React.useEffect(() => {
    get();
  }, [])
  
  return (
    <MaterialTable
        isLoading={isLoading}
        icons={tableIcons}
        title="Usuarios"
        columns={state.columns}
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
      editable={{onRowAdd: (newData) => 
        axiosUsers.post(`/user/create`, newData)
        .then( (response) => {
          response.data.password = '*********';
          setState((prevState) => {
            const data = [...prevState.data];
            data.push(response.data);
            return { ...prevState, data };
          });
          setError(null);
        }).catch((err) => {
          setError({message: err.response.statusText})
          return null;
        }),
        onRowUpdate: (newData, oldData) =>
        axiosUsers.put(`/user/update`, {
          query: {username: newData.username},
          data: {
            nombre: newData.nombre,
            image: newData.image,
            rol: newData.rol,
            description: newData.description
          }
        })
        .then( (response) => {
          response.data.password = '*********';
          if (oldData) {
            setState((prevState) => {
              const data = [...prevState.data];
              data[data.indexOf(oldData)] = response.data;
              return { ...prevState, data };
            });
          }
        }).catch((err) => {
          setError({message: err.response.statusText})
          return null;
        }),
        onRowDelete: (oldData) =>
          axiosUsers.delete(`/user/delete`, {
            data: {
              query: {username: oldData.username}
            }
          })
          .then( (response) => {
            setState((prevState) => {
              const data = [...prevState.data];
              data.splice(data.indexOf(oldData), 1);
              return { ...prevState, data };
            });
          }).catch((err) => {
            setError({message: err.response.statusText})
            return;
          })
      }}
    />
  );
}

export default Usuarios;