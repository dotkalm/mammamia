import React, { useState } from 'react'
import { BundlesStyle } from './style'
import * as CATEGORIES from '../constants/selectorCategories.js'

const Bundles = (props) => {
    const [ form, setForm ] = useState({
        images: [],
        age: '',
        gender: '',
        description: '',
    })
    const onSubmit = event => {
        event.preventDefault()
        console.log(form)
    }
    const onChange = event => {
        if(event.target.name ==='image'){
           const imgs = form.images
           console.log(event.target.files) 
           setForm({...form, images:[...imgs, event.target.files[0]]}) 
        }else{
           setForm({ ...form, 
               [event.target.name]: event.target.value
           })
        } 
    }
           
    return(
        <BundlesStyle>
        <div id="description">
        10-20 items - photographed as a group, up to 10 pics allowed
        </div>
            <div className="form">
                <form onSubmit={onSubmit}>
                    <select id="select" className="select" name='age' onChange={onChange}>
                    {CATEGORIES.age.map((e,i) => {
                        return(
                        <option value={e} key={e}>
                            {e}
                        </option>
                        )
                    })} 
                    </select>
                    <select id="select" className="select" name='gender' onChange={onChange}>
                    {CATEGORIES.gender.map((e,i) => {
                        return(
                        <option value={e} key={e}>
                            {e}
                        </option>
                        )
                    })} 
                    </select>
                    {form.images.map((e,i) => {
                        const read = async () => {}
                        const reader = new FileReader()
                        reader.readAsDataURL(e)
                        let theImage = ''
                        reader.onloadend = () => {
                            theImage = reader.result             
                            console.log(theImage)
                        } 
                        return(

                        <img src={`${theImage}`} alt={`user uploaded image # ${i+1}`} key={i}/>
                        )
                    })}
                    <label className="select" id="custom-file-upload">
                        Add Photo
                        <input className="select" name='image' type='file' 
                        onChange={onChange}/>
                    </label>
                    <input type='text' className='select' 
                        name="description" placeholder='add description' 
                        onChange={onChange}>
                    </input>
                    <button className="select" type='submit'>
                        Add
                    </button>
                </form>
            </div>
        </BundlesStyle>
    )
}

export default Bundles
