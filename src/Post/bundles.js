import React, { useState } from 'react'
import { BundlesStyle, ThumbnailDiv } from './style'
import * as CATEGORIES from '../constants/selectorCategories.js'

const Bundles = (props) => {
    //const [error, setError] = useState(false)
    //const [errorMsg, setErrorMsg] = useState('')
    const [images, setImages] = useState([])
    const [addImageButton, setAddImageButton] = useState('Add Photos')
    const [ form, setForm ] = useState({
        images: [],
        age: '',
        gender: '',
        description: '',
    })
    const onSubmit = event => {
        event.preventDefault()
    }
    const handleFormImages = (arr) => {
        const imgs = form.images
        const newImgArray = new Array(arr.length).fill('BLOB')
        const newImgArrayFormData = new Array(arr.length).fill('BLOB_RAW')
        for(let i=0; i<arr.length; i++){
            const reader = new FileReader()
            reader.readAsDataURL(arr[i])
            reader.onload = () => {
                newImgArray[i] = reader.result
                if(i+1 === arr.length){
                    if(arr.length + images.length === 10){
                        setAddImageButton('Photo Limit Reached')
                    }
                    setImages([...images, ...newImgArray])
                }
            } 
            newImgArrayFormData[i] = arr[i]
            if(i+1 === arr.length){
                setForm({...form, images:[...imgs, ...newImgArrayFormData]}) 
            }
        }  

    }
    const onChange = event => {
        if(event.target.name ==='image'){
            const { files } = event.target
            const filesArr = [...files]
            const num = 10 - images.length
            const spliceArr = filesArr.splice(0, num);
            handleFormImages(spliceArr)
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
                    <ThumbnailDiv>
                        {images.map((e,i) => {
                            return(

                           <label id="img-thumb" key={i+1}> 
                                <img src={`${e}`} alt={`${i+1}`} key={i}/> 
                                {i+1}
                           </label>
                            )
                        })}
                    </ThumbnailDiv>
                    <label className="select" id="custom-file-upload">
                        {addImageButton}
                        <input className="select" name='image' type='file' 
                        multiple onChange={onChange}/>
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
