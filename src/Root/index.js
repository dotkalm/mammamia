import React from 'react'

const Root = (props) => {

    const images = props.sampleBundles.map((e,i) => {


        const bundles = e.bundles[0]
        const key = e.username + i
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
export default Root
