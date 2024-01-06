import axios from "axios";
import { useState, useEffect } from "react";
import { getUsername } from "../helper/helper.jsx";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

/**custom hook */
export default function useFetch(query) {

  const [getData, setData] = useState({
    
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null
  });

  useEffect(() => {

    const fetchData = async () => {


      try {
        setData(prev => ({ ...prev, isLoading: true })); 

        console.log('api/user  '+ 'status '+getData.status);

        const { username } = !query ? await getUsername() : { username: '' };
        const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);


        if (status === 200) {
          setData(prev => ({ ...prev, isLoading: false, apiData: data, status: status }));
        } else {
          setData(prev => ({ ...prev, isLoading: false, serverError: data }));
        }


      } catch (error) {
        setData(prev => ({ ...prev, isLoading: false, serverError: error }));
      }
    };


    fetchData();

  }, [query]);

  return [getData, setData];
}
 