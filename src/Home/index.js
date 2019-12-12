import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { MainContentStyle } from './style'
import Post from '../Post'
import NavBar from '../NavBar'
import Selector from './Selector'
import UserBundleWundles from './bundleWundles'

let done = true
const Home = (props) => {
    const [ bundles, setBundles ] = useState([])
    const [ truth, setTruth ] = useState(false)
    const [ user, setUser ] = useState({ 
        username: props.user.username,
        email: '',
        uid: props.uid,
        lat: '',
        lng: '',
        city: '',
        state: '',
        ip: '',
    })

    useEffect(() => {
        if(!truth){
            setUser({...props.user})
            setTruth(true)
        }
    }, [props.user, truth])

    const onSubmit = event => {
        event.preventDefault()
    }
    const onClick = event => {
    }
    const updateBundles = (newBundle) => {
        console.log(bundles, newBundle)
        setBundles([newBundle, ...bundles])
    }
    if(props.category !== 'home'){
        props.changeCategory('home')
    } 
        return(
        <div>
            <MainContentStyle>
            { user.username || props.user.username ? `WELCOME ${user.username || props.user.username}` : ''
            }            
            { props.user.city ? ` Welcome from ${props.user.city}` : ''} 
            <Post bundles={bundles} 
                            updateBundles={updateBundles}
                            user={props.user} dims={props.dims}/> 
                            </MainContentStyle>
            <UserBundleWundles
                user={props.user}
                bundles={bundles}/> 
        </div>

    )
}

const HomeForm = withRouter(withFirebase(Home))
export default HomeForm

