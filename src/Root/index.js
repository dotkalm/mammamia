import React from 'react'
import { withFirebase } from '../Firebase'
import { RootStyle } from './style'

const Root = (props) => {

    const images = props.sampleBundles.map((e,i) => {


        const bundles = e.bundles[0]
        const key = e.username + i
        const fileURL = bundles.image_paths[0]
        //const thumbURL = props.firebase.storage.ref(fileURL).getDownloadURL().then(promises => console.log(promises))
        return(<div key={key}>
                {e.username}{' of '}{`${e.city}, ${e.state} `}
                 is selling a {' kids '} 
                {bundles.description}
            </div>)
    })

    return(
        <div>
        {images}
        </div>
    )
}
export default withFirebase(Root)
