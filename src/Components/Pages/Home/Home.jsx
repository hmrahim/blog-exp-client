import React, { useContext } from 'react';
import { authContext } from '../../ContextApi/ContextProvider';


const Home = () => {
    const {user} = useContext(authContext)
 
    return (
        <div>
            <h1>home page</h1>
           
        
        </div>
    );
};

export default Home;