import { useEffect, useState } from 'react';
import { BASE_URL } from '../../Constant';

const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    callApi();
  }, []);

  async function callApi() {
    setLoading(true);
    const data = await fetch(BASE_URL + url);
    const response = await data.json();
    setLoading(false);
    setData(response);
  }

  return { data, loading };
};

export default useFetch;
