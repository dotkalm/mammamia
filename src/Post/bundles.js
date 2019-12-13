import React, { useState, useEffect } from 'react'
import { BundlesStyle, 
    ThumbnailDiv,
    ThumbnailLabelGroup } from './style'
import * as CATEGORIES from '../constants/selectorCategories.js'
import { withFirebase } from '../Firebase'
import * as ROUTES from '../constants/routes'
import { withRouter } from 'react-router-dom'

const cryptoRandomString = require('crypto-random-string');
const imageData = {}
let thumbGrid = null
const firebaseURLs = {}

const Bundles = (props) => {
    //const gridCoords = {}
    //const [error, setError] = useState(false)
    //const [errorMsg, setErrorMsg] = useState('')
    //const [coordsBool, setCoordsBool] = useState(true)
  //  const [thumbGrid, setThumbGrid] = useState({})
    const [primary, setPrimary] = useState(0)
    const [imageRefs, setImageRefs] = useState([])
    const [addImageButton, setAddImageButton] = useState('Add Photos')
    const [ form, setForm ] = useState({
        images: [],
        age: '',
        gender: '',
        description: '',
    })
    const [validateUpload, setValidateUpload] = useState({})
    const onSubmit = event => {
        event.preventDefault()
        const { age, gender, description } = form
        const { uid } = props.firebase.auth.currentUser 
        const primaryKey = imageRefs[primary].name 
        const primaryImage = firebaseURLs[primaryKey]
        const timeStamp = Math.floor(Date.now() / 1000); 
        const newBundle = {
            timeStamp,
            firebaseURLs,
            age,
            gender,
            description,
            imageRefs,
            available: 'yes',
            primaryImage: primaryImage,
        }
        const newUserObj = {
            ...props.user,
            bundles: [...props.user.bundles, newBundle]
        }
        props.firebase.db.collection("users").doc(uid)
            .set(newUserObj)
            .then(props.updateUser(newUserObj))
            .then(props.history.push(ROUTES.HOME))

    }
    const resizeThumbWidth = () => {
        const wide = window.innerWidth
        if(wide <= 600){
           return 3 
        }else if(wide > 600 && wide < 800){
           return 4 
        }else{
           return 5 
        }  
    }
    const [width, setWidth] = useState(resizeThumbWidth())

    const handleFormImages = (arr) => {
        const imgs = form.images
        const newImgArray = [] 
        const newImgArrayFormData = [] 
        const validateURLs = {}
        for(let i=0; i<arr.length; i++){
            const regex = /\.(jpg|JPG|gif|GIF|jpeg|JPEG|PNG|png)$/
            const search = arr[i].name.search(regex)
            if(search !== -1){
                const fileExtension = arr[i].name.slice(search)
                const randKey = cryptoRandomString({length: 10}); 
                newImgArray.push({name: randKey, extension: fileExtension})
                
                const uploadTask = props.firebase.storage.ref('bundles/')
                    .child(`${randKey}${fileExtension}`)
                    .put(arr[i])

                uploadTask.on('state_changed', function(snapshot){
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                    }, function(error) {
                        console.log(error)
                    }, function(){
                        uploadTask.snapshot.ref.getDownloadURL()
                        .then(url => {
                            firebaseURLs[randKey] = url
                            validateURLs[randKey] = url
                        })
                        .then(() => {
                            console.log(validateURLs, i)
                            if (Object.keys(validateURLs).length === arr.length){
                                return validateURLs
                            }
                        })
                        .then(urls => {
                            console.log(urls)
                            setValidateUpload({...validateUpload, ...urls})
                        })
                    })
                const reader = new FileReader()
                reader.readAsDataURL(arr[i])
                reader.onload = () => {
                    imageData[randKey] = reader.result 
                    if(i+1 === arr.length){
                        if(arr.length + imageRefs.length === 10){
                            setAddImageButton('Photo Limit Reached')
                        }
                        setImageRefs([...imageRefs, ...newImgArray])
                    }
                }
                newImgArrayFormData.push(arr[i])
                if(i+1 === arr.length){
                    setForm({...form, images:[...imgs, ...newImgArrayFormData]}) 
                }
            }
        }  

    }
    const onChange = event => {
        console.log(
        Object.keys(imageData).length,
        Object.keys(validateUpload).length,
        form.images.length,
        Object.keys(validateUpload).length,
        form.description,        
        form.age,        
        form.gender,
        )
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
        const indexNum = +event.target.id
        const randKey = imageRefs[indexNum].name
        delete firebaseURLs[randKey]
        delete imageData[randKey]
        delete validateUpload[randKey] 
        const copyDataImages = [...imageRefs]
        const copyImages = [...form.images]
        copyImages.splice(indexNum, 1)
        copyDataImages.splice(indexNum, 1)
        setForm({...form, images: copyImages})
        setImageRefs(copyDataImages)
        setAddImageButton('Add Photos')


    }
    const getCoords = (num) => {
        if(num === 0){
            thumbGrid = {
                [num] : [1,1]
            }
        } else if(thumbGrid[num-1][0] === width){
           const x = 1
           const y = thumbGrid[num-1][1] + 1
           thumbGrid[num] = [x,y]   
        }else{
           const x = thumbGrid[num-1][0] + 1
           const y = thumbGrid[num-1][1] 
           thumbGrid[num] = [x,y] 
        } 
        return thumbGrid[num]
    }
    useEffect(() => {
        const handleResize = () => {
            const wide = window.innerWidth
            if(wide <= 600){
                setWidth(3)
            }else if(wide > 600 && wide < 800){
                setWidth(4)
            }else{
                setWidth(5)
            }  
        } 
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    const selectPrimary = event => {
        setPrimary(+event.target.id)
    }
    const readyToUpload = 
        Object.keys(imageData).length === Object.keys(validateUpload).length ||
        form.images.length === Object.keys(validateUpload).length 

    const isInvalid = 
        imageRefs.length === 0 ||
        form.description === '' ||
        form.age === '' ||
        form.gender === '' 

    return(
        <BundlesStyle>
        <div id="description">
        10-20 items - photographed as a group, up to 10 pics allowed
        </div>
            <div className="form">
                <form onSubmit={onSubmit}>
                    <select id="select-age" className="select" name='age' onChange={onChange}>
                    <option key='select age'>select age</option>
                    {CATEGORIES.age.map((e,i) => {
                        return(
                        <option value={e} key={e}>
                            {e}
                        </option>
                        )
                    })} 
                    </select>
                    <select id="select-gender" className="select" name='gender' onChange={onChange}>
                    <option key='select gender'>select gender</option>
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
                            const coords = getCoords(i)
                            const col = coords[0]
                            const row = coords[1]
                            const thumb = imageData[e.name]

                            return(
                            <ThumbnailLabelGroup key={i} id={i} img={`url(${thumb})`}
                                row={row} col={col} onClick={selectPrimary} 
                                className={primary === i ? 'selected' : 'notSelected'}>
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
                    <textarea type='text' className='select' 
                        name="description" placeholder='add description' 
                        onChange={onChange} rows="5">
                    </textarea>
                    <button className="select" type='submit' disabled={isInvalid}>
                        Add
                    </button>
                </form>
            </div>
        </BundlesStyle>
    )
}

export default withRouter(withFirebase(Bundles))
