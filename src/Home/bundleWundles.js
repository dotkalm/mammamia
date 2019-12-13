import React, {useState, useEffect} from 'react'
import { withFirebase } from '../Firebase'

const UserBundleWundles = (props) => {
    const [bundles, setBundles] = useState([])
   console.log(props.user) 
    useEffect(() => {
        setBundles(props.user.bundles)
    },[props.user.bundles]) 
    return (
        <div> YOUR BUNDLES <br/> 
            {bundles ? 
            bundles.map((e,i) => {
            return(<img key={i}
                alt={e.description}
                src={e.primaryImage}
                width='200px'
                height="200px"/>)
            }) : ''
        }</div>
    )
}

export default withFirebase(UserBundleWundles)
