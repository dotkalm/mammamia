import React from 'react'
import { withFirebase } from '../Firebase'
import { RootStyle } from './style'

const Root = (props) => {
    const httpsImages = Object.keys(props.httpsImages).map((e,i, array) => {
        console.log(props.httpsImages[e])
        const user = props.sampleBundles[e]
        return (
        <div key={e}>
            {user.address}    
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
