import { useEffect, useState } from "react"

const UseToken = user =>{
    const [token, setToken] = useState('');
    useEffect(() =>{
        const email = user?.user?.email;
        const currentUser = {email: email};
        if(email){
            fetch(`http://localhost:5000/api/v1/users/${email}`,{
                method:'PUT',
                headers:{
                    'content-type': 'application/json'
                },
                body:JSON.stringify(currentUser)
            })
            .then(res => res.json())
            .then(data => {
              //  console.log('data inside token', data);
                const accessToken = data.token;
                localStorage.setItem('accessToken',accessToken);
                setToken(accessToken);
            })
        }

    }, [user]);
    return [token];
}

export default UseToken;