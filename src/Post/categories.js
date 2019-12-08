import React from 'react'
import { CategoryStyles } from './style'

const Categories = (props) => {

    return(
        <CategoryStyles height={props.dims.height - 180 + 'px'} onClick={props.onClick}>
            <div className='buffer'>
                <div className='categories-space'></div>
                <div className='categories' id='Baby Bundles'>
                    <div className='button-name'id="Baby Bundles">
                        Baby Bundles
                    </div>
                    <div className='button-spacer'></div>
                    <div className='button-description'>
                    </div>
                </div>
                <div className='categories-space'></div>
                <div className='categories' id="Only The Best">
                    <div className='button-name'id="Only The Best">
                        Only the best for my baby
                    </div>
                    <div className='button-spacer'></div>
                    <div className='button-description'>
                    </div>
                </div>
                <div className='categories-space'></div>
                <div className='categories' id="Baby Gear">
                    <div className='button-name'id="Baby Gear">
                        Gear
                    </div>
                </div>
            </div>
        </CategoryStyles>
    )
}

export default Categories
