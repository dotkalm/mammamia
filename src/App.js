import React, { useState } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import SignUp from './Register'
import SignIn from './SignIn'
import Home from './Home'

function App(props) {

    const [ uid, setUid ] = useState('')
    const [ truth, setTruth ] = useState(false)
    const [user, setUser ] = useState({
        username:'',
        email:'',
        uid:'',
        ip: '',
        lat: '',
        lng: ''
    }) 
    
    function setUserSynchronous(id, lat, lng, city, state, ip_address, username, uid, email) {
        return new Promise(resolve => {
            setTruth(true)
            setUser({
                ...user,
                id : id,
                lat: lat,
                lng: lng,
                city: city,
                state: state,
                ip: ip_address,
                username: username,
                uid: uid,
                email: email
            })
        }) 
    }
    const grabUid = async (user1, uid, coords, ip) => {
        setUser({...user,
            username: user1.username,
            email: user1.email,
            uid: uid
        })
        const data = {
            lat: coords.latitude,
            lng: coords.longitude,
            username: user1.username,
            uid: uid,
            ip: ip,
            email: user1.email
        }
        try{
                const registerResponse = await fetch(`${
                process.env.REACT_APP_BACKEND_URL}/user/register`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(data),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            const response = await registerResponse.json()
            const { id, lat, lng, city, state, ip_address, username, uid, email } = response.data
            await setUserSynchronous(id, lat, lng, city, state, ip_address, username, uid, email)
            return  
        } catch(err){
            console.log(err)
        }
    }

    console.log(user, truth)

    const onSubmitSignIn = (uid) => {
        setUid(uid)
        console.log(uid)
        props.history.push(ROUTES.HOME)

    } 

  return (
      <main>
        <Switch>
            <Route exact path={ROUTES.SIGN_UP}
                render={(props) => {
                    return<SignUp
                        grabUid={grabUid}
                        />
                }}/>
            <Route exact path={ROUTES.SIGN_IN}
                render={(props) => {
                    return<SignIn
                        onSubmit={onSubmitSignIn}/>
                }}/>
            <Route exact path={ROUTES.HOME}
                render={(props) => {
                    return<Home
                        user={user}
                        uid={uid}/>
                }}/>
        </Switch>
      </main>
  );
}

export default withRouter(App);
