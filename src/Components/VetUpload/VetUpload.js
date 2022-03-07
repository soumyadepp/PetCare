import React from 'react'
import {useState} from 'react';
import './VetUpload.scss'
import axios from 'axios'
import imageVet from '../../Assets/dogvet.png';

function VetUpload() {
    const [fileInputState,setFileInputState] = useState('');
    const [name,setName] = useState('');
    const [degree,setDegree] = useState('');
    const [email,setEmail] = useState('');
    const [clinic,setClinic] = useState('');
    const [address,setAddress] = useState('');
    const [previewSource,setPreviewSource] = useState('');
    const [phone,setPhone] = useState('');
    const handleFileInputChange =(e)=>{
        const file = e.target.files[0];
        previewFile(file);
      }
      const previewFile=(file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () =>{
          setPreviewSource(reader.result);
        }
      }
      const handleSubmit =(e)=>{
        e.preventDefault();
        if(!previewSource) return;
        uploadImage(previewSource);
        setPreviewSource('')
        setFileInputState('');
        window.location.href="/login"
      }
      const uploadImage = async(base64EncodedImage) => {
        console.log(base64EncodedImage);
        const vetData = {
            name:name,
            image:base64EncodedImage,
            owner:email,
            degree:degree,
            clinic:clinic,
            address:address,
            email:email,
            phone:phone
        }
        try {
          axios.post('http://localhost:4000/app/vets',vetData)
          .then((res)=>{
              console.log(res.data);
          })
          .catch((err)=>{
              console.log(err.message);
              console.log('some error occurred');
          })
        } catch (error) {
          console.log(error)
        }
      }
    
  return (
    <div className='vetupload-container'>
        <img src={imageVet} className='vet-form-image'/>
        <div className='vet-form-wrapper'>
            <h2>Add a vet to database</h2>
            <form className='vet-form' onSubmit={handleSubmit}>
                <input className='form-control' required="required" placeholder='Name' value={name} onChange={e=>setName(e.target.value)}/>
                <select className='form-control' required="required" onChange={e=>setDegree(e.target.value)}>
                    <option value="Degree">Degree</option>
                    <option value="B.V.Sc">B.V.Sc</option>
                    <option value="M.S">M.S</option>
                    <option value="M.V.Sc">M.V.Sc</option>
                    <option value="M.Sc">M.Sc</option>
                    <option value="PhD">PhD</option>
                </select>
                <input className='form-control' required="required" placeholder='Clinic' type="text" onChange={e=>setClinic(e.target.value)} value={clinic}/>
                <input className='form-control' required="required" placeholder='Address' type="text" onChange={e=>setAddress(e.target.value)} value={address}/>
                <input className='form-control' required="required" placeholder='Email' type='email' onChange={e=>setEmail(e.target.value)} value={email}/>
                <input className='form-control' required="required" placeholder='Phone' type='phone' onChange={e=>setPhone(e.target.value)} value={phone}/>
                <input className='form-control' required="required" placeholder='Profile Pic' type='file' onChange={handleFileInputChange} value={fileInputState}/>
                <input type="submit" className='submit-btn' value="Upload" onClick={handleSubmit}/>
            </form>
        </div>
        {previewSource&&
        <div className='preview-div'>
            <h1>Preview</h1>
        <img className='preview-iamge' src={previewSource}/>
        </div>}
    </div>
  )
}

export default VetUpload