import React, { useState } from 'react'
import { StylePost } from './style'
import Categories from './categories'
import Bundles from './bundles'
const Post = (props) => {
    const [ category, setCategory ] = useState('')
    const onClick = event => {
        if(event.target.id === 'backArrow'){
            setCategory('')
        } else {
            setCategory(event.target.id)
        }
    }
    return(
    <StylePost> 
        <div className='selling'>
            <span className="sellling_spacer"> 
                
        { category === '' ? '' : <span id="backArrow" onClick={onClick}>◀ BACK</span>}</span>
            <span id="selling_left">{category !== '' ? `Sell ${category}` : 'Sell'}</span>
            <span className="sellling_spacer"></span>
        </div>
        {category === ''? <Categories dims={props.dims} onClick={onClick}/> : '' }
        {category === 'Baby Bundles' ? <Bundles user={props.user}/> : ''}
    </StylePost>
    )
}

export default Post
