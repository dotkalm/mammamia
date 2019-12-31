import React from 'react'
import { withFirebase } from '../Firebase'
import { RootStyle } from './style'

const Root = (props) => {
    const httpsImages = Object.keys(props.httpsImages).map((e,i, array) => {
        console.log(props.httpsImages[e])
    })
    const images = props.sampleBundles.map((e,i) => {
        const bundles = e.bundles[0]
        const fileURL = bundles.image_paths[0]
        //const thumbURL = props.firebase.storage.ref(fileURL).getDownloadURL().then(promises => console.log(promises))
        return(<div key={e.uid} id={e.uid}>
                {e.username}{' of '}{`${e.city}, ${e.state} `}
                 is selling a {' kids '} 
                {bundles.description}
            </div>)
    })

    return(
        <div id="rootroot">
        {images}
        </div>
    )
}
export default withFirebase(Root)
