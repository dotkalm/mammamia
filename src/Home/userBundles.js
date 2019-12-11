import React, { useState } from 'react'
import { withFirebase } from '../Firebase'
import { BundleStyle } from './style'

let done = true
const UserBundles = (props) => {
    const [bundleTruth, setBundleTruth] = useState(false)

    props.firebase.auth.onAuthStateChanged((user) => {
        if (user && done) {
            console.log('user is logged');
            done = false
            getBundleRefs(user.uid)
        }
    })
    
    const getBundleRefs = (uid) => {
        props.firebase.db.collection("users").doc(uid).get()
            .then(doc => doc.data().bundles)
            .then(bundles => bundles.forEach((e,i) => {
                console.log(e)
                getBundles(e)
            }))
    }
    
    const getBundles = (id) => {
        props.firebase.db.collection("bundles").doc(id).get()
            .then(doc => props.getBundles([...props.bundles, (doc.data())]))
    }
    if(props.bundles.length > 0 && !bundleTruth){
        console.log(props.bundles) 
        setBundleTruth(true)
    }     
    const MapBundles = () => {
        if(props.bundles.length > 0){
            props.bundles.map((e,i) => {
                return(
                    <div> {e.age} </div>
                )
            })
        }else{
            return(
                <div>hi</div>
            )
        }
    } 
    return(
        <div> 
        {MapBundles()}
        </div>
    )
    
}

export default withFirebase(UserBundles)

