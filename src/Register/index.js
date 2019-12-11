import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { SignUpStyle, ImgContainer } from './style.js'
import * as ROUTES from '../constants/routes'

const SignUpFormBase = (props) => {

    const [user, setUser] = useState({
        username:'',
        passwordOne:'',
        passwordTwo:'',
        email:'',
        uid:'',
        error:''});

    const [ ip, setIp ] = useState('')

    const [ coords, setCoords ] = useState({
        accuracy: '',
        latitude: '',
        longitude: '',
    })
    
    const onChange = event => {
        setUser({...user, [event.target.name]: event.target.value})
    }
    if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                setCoords({
                    accuracy: position.coords.accuracy,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    })
            })
        }

    useEffect(() => {
        fetch('https://jsonip.com').then(function(response){
            return response.json()
        }).then(function(response) {
                setIp(response.ip)
                return response.ip
            })
    })

    const onSubmit = event => {
        const { username, email, passwordOne } = user
        event.preventDefault()
        props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            props.grabUid(user, authUser.user.uid, coords, ip)
            return authUser.user.uid})
        .then(uid => {
        return props.firebase.db.collection('users')
            .doc(uid).set({
                username,
                email,
                ip
            })
        }).then(
            props.history.push(ROUTES.HOME)
        )

        .catch(error => {
            setUser({...user, [error]:error})
        })
    }
    
    const isInvalid = 
        user.passwordOne !== user.passwordTwo || 
        user.passwordOne === '' ||
        user.email === '' ||
        user.username === ''

    return(
    <ImgContainer>
        <div id="eek">
            <div id="box">
                <img src="./61155_BCW.jpg" alt="placeholder box"/>
            </div>
            SIGN UP
        </div>
    <SignUpStyle>

        <form onSubmit={onSubmit}>
            <input name='username'
                value={user.username}
                onChange={onChange}
                type='text'
                placeholder='username'
            />

            <input 
                name='email'
                value={user.email}
                onChange={onChange}
                type='text'
                placeholder='Email Address'
            />

            <input 
                name="passwordOne"
                value={user.passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Password"
            />

            <input 
                name="passwordTwo"
                value={user.passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
            />


            <button type='submit' disabled={isInvalid}>
                Register
            </button>

            {user.error && user.error.message}
        
        </form>
    </SignUpStyle>
    </ImgContainer>
    )


}


const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUpForm
