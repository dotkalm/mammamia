import React from 'react'
import { withFirebase } from '../Firebase'
import { RootStyle } from './style'

const Root = (props) => {
    const sampleBundles = Object.keys(props.sampleBundles).map((e,i, array) => {
        const user = props.sampleBundles[e]
        return (
        <div key={e}>
            {user.address}<br/>
            {user.imageURL ? <img src={user.imageURL} width="200px" alt={user.bundles[0].description} /> : ''}
            <br/>
            kids {user.bundles[0].description}
        </div> 
        )
    })
    console.log(props.sampleBundles) 
    return(
        <div> 
        {sampleBundles}
        </div>
    )
}
export default withFirebase(Root)
