import React, { useState, useEffect } from 'react';

const CreateSqlUser = (...data) => {
    console.log(...data)
    const fetchData = async () => {
        try{
            const registerResponse  = await fetch(`${
                process.env.REACT_APP_BACKEND_URL}/user/register`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
            }) 
            const response = await registerResponse.json()
            console.log(response)
        } catch(error){
            console.log(error)
        }
    }
    return (
        <div> here it is </div>
    )
} 

export default CreateSqlUser
