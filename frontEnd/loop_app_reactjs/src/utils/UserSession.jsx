const API_URL = import.meta.env.VITE_API_URL;

const userSession = async () => {
  try{
    const response = await fetch(`${API_URL}/session`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const res = await response.json();
    return {res, status : response.status}
  }
  catch(err){
    throw err
  }
};

export default userSession;