import React, { useState } from 'react'
import { BundlesStyle } from './style'
import * as CATEGORIES from '../constants/selectorCategories.js'

const Bundles = (props) => {
    const [ form, setForm ] = useState({
        
    })
    const onSubmit = event => {
        event.preventDefault()
    }
    const onChange = event => {
       setForm({ ...form, 
           [event.target.name]: event.target.value
       })
    }
    const selectorCategories = CATEGORIES.selector.map((e,i) => {
        console.log(e)
    }) 
    return(
        <BundlesStyle>
        <div id="description">
        10-20 items - photographed as a group, up to 10 pics allowed
        </div>
            <div className="form">
                <form onSubmit={onSubmit}>
                    <select name="cars" size="2">
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="fiat">Fiat</option>
                        <option value="audi">Audi</option>
                    </select>
                    <input type='text' placeholder='placeholder'></input>
                    <button type='submit'>
                        Add
                    </button>
                </form>
            </div>
        </BundlesStyle>
    )
}

export default Bundles
