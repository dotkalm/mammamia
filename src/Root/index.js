import React from 'react'
import { withFirebase } from '../Firebase'
import { RootStyle } from './style'

const Root = (props) => {
    const httpsImages = Object.keys(props.httpsImages).map((e,i, array) => {
        const imageURL = props.httpsImages[e]
        const user = props.sampleBundles[e]
        return (
        <div key={e}>
            {user.address}<br/>
            <img src={imageURL} width="200px" alt={user.bundles[0].description} />
            <br/>
            kids {user.bundles[0].description}
        </div> 
        )
    })
    console.log(props.sampleBundles) 
    return(
        <div> 
        {httpsImages}
        </div>
    )
}
export default withFirebase(Root)
