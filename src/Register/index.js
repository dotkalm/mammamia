import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { withFirebase } from '../Firebase'
import { SignUpStyle } from './style.js'


const SignUpFormBase = (props) => {
    const [user, setUser] = useState({
        username:'',
        passwordOne:'',
        passwordTwo:'',
        email:'',
        error:''});
    
    const onChange = event => {
        setUser({...user, [event.target.name]: event.target.value})
        console.log(user)
    }

    const onSubmit = event => {
        const { username, email, passwordOne } = user
        event.preventDefault()
        
        props.firebase.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            console.log(authUser.user.uid)
        return props.firebase.db.collection('users')
            .doc(authUser.user.uid).set({
                username,
                email
            })
        }) 

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
    
    )


}


const SignUpForm = withRouter(withFirebase(SignUpFormBase))

export default SignUpForm
