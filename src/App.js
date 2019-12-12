import React, { useState, useEffect } from 'react';
import { withRouter, Route, Switch } from 'react-router-dom'
import * as ROUTES from './constants/routes'
import SignUp from './Register'
import SignIn from './SignIn'
import Home from './Home'
import Post from './Post'
import NavBar from './NavBar'
import { withFirebase } from './Firebase'

let getUidOnce = true

function App(props) {
    const [ uiButton, setUIButton] = useState({
    })
    const [ category, setCategory ] = useState('')
    const [dims, setDim] = useState({width: window.innerWidth, height: window.innerHeight})
    const [ uid, setUid ] = useState('')
    const [ truth, setTruth ] = useState(false)
    const [ bundles, setBundles ] = useState([])
    const [user, setUser ] = useState({}) 
    const [userBundles, setUserBundles] = useState([])
    
    props.firebase.auth.onAuthStateChanged((user) => {
        if (user && getUidOnce) {
            getUidOnce = false
            getBundleRefs(user.uid)
            const GeocoderArcGIS = require('geocoder-arcgis');
            const geocoder = new GeocoderArcGIS()
            geocoder.findAddressCandidates('380 New York Street, Redlands, CA 92373',{})
                .then((result) =>{
                  console.log(result);
                })
                .catch(console.log);
        }
    })

    const getBundleRefs = (uid) => {
        props.firebase.db.collection("users").doc(uid).get()
            .then(doc => {
                setUser(doc.data())
                return doc.data().bundles})
            .then(bundles => bundles.forEach((e,i,array) => {
                const {length} = array
                getBundles(e, i, length)
            }))
    }
    let bundleObj = [] 
    const getBundles = (id, i, len) => {
        props.firebase.db.collection("bundles").doc(id).get()
            .then(doc => {
                console.log(doc.data())
                if(i===0){
                    bundleObj = [doc.data()]
                } else if (i+1 === len){
                    bundleObj = [...bundleObj, doc.data()]
                    setBundles(bundleObj)
                } else {
                    bundleObj = [...bundleObj, doc.data()]
                }
            })
    }

    function setUserSynchronous(response) {
        const { id, lat, lng, city, state, ip_address, username, uid, email } = response
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
    const setTheBundles = (arr) => {
        setUserBundles(arr)
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
            await setUserSynchronous(response.data)
            return  
        } catch(err){
            console.log(err)
        }
    }

    const onSubmitSignIn = async (uid1) => {
        setUid(uid1)
        console.log(uid1,truth)
        try{
            const registerResponse = await fetch(`${
                process.env.REACT_APP_BACKEND_URL}/user/logIn`, {
                method: 'POST',
                credentials: 'include',
                body: JSON.stringify(uid1),
                headers: {
                  'Content-Type': 'application/json'
                }
            })
            const response = await registerResponse.json()
            await setUserSynchronous(response.data[0]).then(
                props.history.push(ROUTES.HOME)
            )
            return
        }catch(error){
            console.log(error) 
        }

    } 
    const passUserInfo = (data) => {
        console.log(data)
    }

    useEffect(() => {
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
        console.log(user)
        const cat = event.currentTarget.name 
        if (cat === 'post'){
            props.history.push(ROUTES.POST)
        } else if (cat === 'home'){
            props.history.push(ROUTES.HOME)
        }

    }

    const updateBundles = (newBundle) => {
        console.log(bundles, newBundle)
        setBundles([newBundle, ...bundles])
    }
    const changeCategory = (cat) => {
        setCategory(cat)
    }
    return (
      <main>
        <NavBar onSubmit={onSubmit} ROUTES={ROUTES} 
            onClick={onClick} 
            category={category}
            uiButton={uiButton}/>
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
                        onSubmit={onSubmitSignIn}
                        passUserInfo={passUserInfo}/>
                }}/>
            <Route exact path={ROUTES.HOME}
                render={(props) => {
                    return<Home
                            user={user} 
                            changeCategory={changeCategory}
                            uid={uid}
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
                            uid={uid}
                            dims={dims}
                            updateBundles={updateBundles}
                            setUserBundles={setUserBundles}
                            userBundles={userBundles}
                          />
                }}/>

        </Switch>
      </main>
  );
}

export default withRouter(withFirebase(App));
