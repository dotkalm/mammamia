import React, { useState } from 'react'
import { BundlesStyle, 
    ThumbnailDiv,
    ThumbnailLabelGroup } from './style'
import * as CATEGORIES from '../constants/selectorCategories.js'


const imageData = {} 
const Bundles = (props) => {
    const gridCoords = {}
    //const [error, setError] = useState(false)
    //const [errorMsg, setErrorMsg] = useState('')
    //const [coordsBool, setCoordsBool] = useState(true)
    const [thumbGrid, setThumbGrid] = useState({})
    const [imageRefs, setImageRefs] = useState([])
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
    const coordsFunc = (i) => {
        const len = Object.keys(gridCoords).length
        if(len === 0){
            gridCoords[i+1] = [1,1]
        } else {
            const prevIndex = Object.keys(gridCoords)[len - 1]
            const prevCoords = gridCoords[prevIndex]
            const currX = prevCoords[0] + 1
            const currY = prevCoords[1] 
            if(currX > 3){
                const nextY = currY + 1
                gridCoords[i+1] = [1, nextY]
            }else{
                gridCoords[i+1] = [currX,currY]
            }
        }
    }

    const handleFormImages = (arr) => {
        const imgs = form.images
        const newImgArray = new Array(arr.length).fill('BLOB')
        const newImgArrayFormData = new Array(arr.length).fill('BLOB_RAW')
        for(let i=0; i<arr.length; i++){
            //need to refactor this so that it is an object not an array
            //this array is too slow when it comes to removing items
            coordsFunc(i)
            const cryptoRandomString = require('crypto-random-string');
            const randKey = cryptoRandomString({length: 10}); 
            console.log(randKey)
            const reader = new FileReader()
            reader.readAsDataURL(arr[i])
            reader.onload = () => {
                imageData[randKey] = reader.result
                newImgArray[i] = randKey 
                if(i+1 === arr.length){
                    if(arr.length + imageRefs.length === 10){
                        setAddImageButton('Photo Limit Reached')
                    }
                    setThumbGrid(gridCoords)
                    setImageRefs([...imageRefs, ...newImgArray])
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
            const num = 10 - imageRefs.length
            const spliceArr = filesArr.splice(0, num);
            handleFormImages(spliceArr)
        }else{
           setForm({ ...form, 
               [event.target.name]: event.target.value
           })
        } 
    }
    const onClickX = event => {
        console.log(imageData)
        console.log(imageRefs)
        const indexNum = +event.target.id
        const copyDataImages = [...imageRefs]
        const copyImages = [...form.images]
        copyImages.splice(indexNum, 1)
        copyDataImages.splice(indexNum, 1)
        setForm({...form, images: copyImages})
        setImageRefs(copyDataImages)
        setAddImageButton('Add Photos')


    }
    //console.log(props.dims)
    //add function to make thumb-columns responsed to width
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
                        {imageRefs.map((e,i) => {
                            const coords = (thumbGrid[i+1])
                            const col = coords[0]
                            const row = coords[1]
                            return(
                            <ThumbnailLabelGroup key={i} img={`url(${imageData[e]})`}
                                row={row} col={col} >
                                <label id="lbl" key={i+1}>
                                <div key={e} id={i} onClick={onClickX}>X</div>
                                </label>
                           </ThumbnailLabelGroup>
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
