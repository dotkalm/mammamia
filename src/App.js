import React, { useState, useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import SignUp from './Register'
import SignIn from './SignIn'
import Home from './Home'
import Post from './Post'
import Geo from './Geo'
import NavBar from './NavBar'
import Root from './Root'
import { withFirebase } from './Firebase'

let getUidOnce = true

function App(props) {
    const [foundUser, setFoundUser] = useState(false)
    const [ category, setCategory ] = useState('')
    const [dims, setDim] = useState({width: window.innerWidth, height: window.innerHeight})
    const [user, setUser ] = useState(null) 
    const [userBundles, setUserBundles] = useState([])
    const [sampleBundles, setSampleBundles] = useState([]) 

    props.firebase.auth.onAuthStateChanged((user) => {
        if (user && getUidOnce) {
            getUidOnce = false
        }
    })
    
    const signOut = () => {
        props.firebase.auth.signOut()
        setUser(null)
    }

    const getBundleRefs = (uid) => {
        props.firebase.db.collection("users").doc(uid).get()
            .then(doc => setUser(doc.data()) )
    }
    
    const getSampleUsersSnapshot = () => {
               
    }
    if(Object.keys(sampleBundles).length === 0){
        getSampleUsersSnapshot() 
    }
    
    function registerUserGeo(response) {
        const { id, lat, lng, city, state, ip_address, username, uid, email } = response
        props.firebase.db.collection("users").doc(uid).set({
            username,
            email,
            ip_address,
            lat,
            lng,
            city,
            state,
            id,
            bundles: []
        })
        setUser({
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
            await registerUserGeo(response.data)
            return response.data 
        } catch(err){
            console.log(err)
        }
    }
   const  updateUser = (userData) => {
       setUser(userData)
    }

    const passUserInfo = (data) => {
        setUser(data)
    }

    useEffect(() => {
        props.firebase.auth.onAuthStateChanged(user => {
            if (user) {
                setFoundUser(true)
                getBundleRefs(user.uid)

            } else {
                setFoundUser(false)
            }
        });
        const handleResize = () => setDim({width: window.innerWidth, height: window.innerHeight});
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    
    const onSubmit = event => {
        event.preventDefault()
    }
    const onClick = event => {
        const cat = event.currentTarget.id
        if (cat === 'post'){
            props.history.push(ROUTES.POST)
        } else if (cat === 'home'){
            props.history.push(ROUTES.HOME)
        }

    }

    const changeCategory = (cat) => {
        setCategory(cat)
    }
    if(foundUser && user !== null){
        return (
          <main>
            <NavBar 
                dims={dims} 
                onSubmit={onSubmit}
                ROUTES={ROUTES} 
                onClick={onClick}
                signOut={signOut}
                user={user}
                changeCategory={changeCategory}
                category={category}/>
            <Switch>
                <Route exact path={ROUTES.HOME}
                    render={(props) => {
                        return<Home
                                user={user} 
                                changeCategory={changeCategory}
                                dims={dims}
                                userBundles={userBundles}
                                setUserBundles={setUserBundles}
                              />
                    }}/>
                <Route exact path={ROUTES.POST}
                    render={(props) => {
                        return<Post
                                category={category}
                                changeCategory={changeCategory}
                                user={user} 
                                dims={dims}
                                updateUser={updateUser}
                                setUserBundles={setUserBundles}
                                userBundles={userBundles}
                              />
                    }}/>
                <Route exact path={'/geo'} render={(props) => <Geo/>}/>
                <Route exact path={ROUTES.ROOT} 
                    render={(props) => {
                        return<Root
                                dims={dims}
                                setSampleBundles={setSampleBundles}
                                sampleBundles={sampleBundles}/>
                    }}/>
            </Switch>
          </main>
        )
    }else{
        return(
            <main>
                <Switch>
                <Route exact path={ROUTES.SIGN_UP}
                    render={(props) => {
                        return<SignUp
                            grabUid={grabUid}
                            />
                    }}/>
                <Route exact path={'/'}
                    render={(props) => {
                        return<SignIn
                            user={user} 
                            passUserInfo={passUserInfo}
                            grabUid={grabUid}
                            />
                    }}/>
                </Switch>
            </main>
        )
    }
}

export default withRouter(withFirebase(App));
