import React, {useState, useEffect} from 'react'
import { withFirebase } from '../Firebase'
import { BundleStyle, BundleGroup } from './style'
const UserBundleWundles = (props) => {
    const [bundles, setBundles] = useState([])
   console.log(props.user) 
    useEffect(() => {
        setBundles(props.user.bundles)
    },[props.user.bundles]) 
    return (
        <BundleGroup> YOUR BUNDLES <br/> 
            {bundles ? 
            bundles.map((e,i) => {
            return(<BundleStyle key={i}
                img={`url(${e.primaryImage})`}/> 
                )
            }) : ''
        }</BundleGroup>
    )
}

export default withFirebase(UserBundleWundles)
