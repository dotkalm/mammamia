import React, { useState } from 'react'
import { withFirebase } from '../Firebase'
//import { BundleStyle } from './style'

let done = true
let bundles = false
const UserBundles = (props) => {
    const [bundleTruth, setBundleTruth] = useState(false)
    const [bundleWundles, setBundleWundles] =useState([])
    props.firebase.auth.onAuthStateChanged((user) => {
        if (user && done) {
            done = false
            getBundleRefs(user.uid)
        }
    })
    
    const getBundleRefs = (uid) => {
        props.firebase.db.collection("users").doc(uid).get()
            .then(doc => doc.data().bundles)
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
                    console.log(bundleObj)
                } else if (i+1 === len){
                    bundleObj = [...bundleObj, doc.data()]
                    setBundleWundles(bundleObj)
                    props.getBundles(bundleObj)
                } else {
                    bundleObj = [...bundleObj, doc.data()]
                }
            })
    }
    if(bundleWundles.length > 0 && bundleTruth === false && !bundles){
        setBundleTruth(true)
        bundles = true
    } 
    return(
        <div>{ bundleWundles.map(e => {
                const { description, age, firebaseURLs } = e
                return(
                    <div key={description}>
                        {description}
                        <br/>
                        {age}
                        <br/>
                        {Object.keys(firebaseURLs).map((e,i) => {
                            const url = firebaseURLs[e]
                            const alt = `${description}_${i+1}`
                            return(
                                <img key={i} alt={alt} src={url} 
                                width='30px' height='30px'/>
                            )
                        })
                        } 
                    </div>
                )
            })
        }</div>
    )
    
}
export default withFirebase(UserBundles)

