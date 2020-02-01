import {AsyncStorage} from 'react-native';
import axios from 'axios';

me = async () =>
{
const token = await AsyncStorage.getItem('auth_token');
return axios.get(global.host+'/api/users/me/',
                  {
                          headers: {
                                  'Content-Type': 'application/json',
                                  'Authorization': 'Token ' + token

                          },
		  }).then((response) => {
			  if(response.status==200){
			 	return response.data;
			  }
		  }, (error) => {
		console.log(error);
		  });
};
