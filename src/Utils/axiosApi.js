import axios from 'axios';

const axiosUsers = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  headers: {
    'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
    'sessiontoken': localStorage.getItem( 'token' )
  }
});

axiosUsers.interceptors.response.use(function (response) {
      // Do something with response data
      return response;
    }, function(err) {
      if(err.response.status === 401) {
        console.log('logout');
        window.location.reload();
        localStorage.removeItem("token");
      }

      return Promise.reject(err);
  }
);


const axiosDefault = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
    }
  });


export {
    axiosUsers,
    axiosDefault
}