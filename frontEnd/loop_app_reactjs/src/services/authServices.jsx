const API_URL = import.meta.env.VITE_API_URL;

const userSignIn = async (user) => {
    try{
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(user),
        });
        const res = await response.json();
        return {res, status : response.status}
    }
    catch(err){
        console.log(err)
        throw err
    }
}

const userSignUP = async (user) => {
    try{
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        const status = response.status;
        const datas = await response.json();
        return({status, data: datas})
    }
    catch(err){
        throw err
    }
    
}

const userLogout = async () => {
    try{
        const response = await fetch(`${API_URL}/logout`, {
            method: 'PUT',
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

const profile = async (userId)=>{
    try{
        const response = await fetch(`${API_URL}/profile`, {
            method: 'GET',
            credentials: 'include', 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const res = await response.json();
        return {res,status : response.status}
    }
    catch(err){
        throw err
    }

}

const navData = async ()=>{
    const response = await fetch(`${API_URL}/loggedinUserdata`, {
        method: 'GET',
        credentials: 'include', 
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const sessionData = await response.json();
    return sessionData;
}

const updateUserData = async (updatedData) => {
   try{
        const response = await fetch(`${API_URL}/profileupdate`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
            credentials : 'include'
        });
        const res = await response.json()
        return {res,status : response.status}
   }
   catch(err){
        throw err
   }
}

const authService = {
    userSignIn,
    userSignUP,
    userLogout,
    profile,
    updateUserData,
    navData
};

export default authService;