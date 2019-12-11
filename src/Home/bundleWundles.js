import React from 'react'
import { withFirebase } from '../Firebase'

const UserBundleWundles = (props) => {
    
    if(props.bundles.length !== 0){
        console.log(props)
    }
    return (
    <div> {  props.bundles.map((e,i) => {
        return(
            <img key={e.description} 
            alt={e.description}
            src={e.primaryImage} 
            width="100px"
            height="100px"/>
        )
    })}</div>
    )
}

export default withFirebase(UserBundleWundles)
