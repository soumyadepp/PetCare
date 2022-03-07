import React, { useState } from 'react'
import image1 from '../../Assets/dogvet.png';
import './VetLogin.scss';
import axios from 'axios';
function VetLogin() {
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [error,setError] = useState('');
    const handleSubmit = (e) =>{
        e.preventDefault();
        const data = {
            email:email,
            phone:phone,
        }
        if(email.length > 0 && phone.length > 0){
            axios.post('http://localhost:4000/app/login/vets',data)
            .then((res)=>{
                console.log(res.data);
                if(res.data.email == null || res.data.phone == null){
                    setError('Invalid Credentials');
                }
                else{
                    console.log('Success');
                    localStorage.setItem('email',res.data.email);
                    localStorage.setItem('phone',res.data.phone);
                    localStorage.setItem('name',res.data.name);
                    localStorage.setItem("pic",res.data.image);
                    localStorage.setItem("degree",res.data.degree);
                    localStorage.setItem("clinic",res.data.clinic);
                    setError('');
                    window.location.href="/vet/dashboard";
                }
            })
        }
        else{
            setError('Please enter all fields');
        }
    }
  return (
    <div className='vetlogin-container'>
        <img className = "vetlogin-image" src={image1} alt="img"/>
        <div className='vetlogin-form-wrapper'>
            <h2>Login As A Vet</h2>
            <form className='vetlogin-form' onSubmit={handleSubmit}>
            <input type="email" className='form-control' value={email} placeholder="Email" onChange={e=>setEmail(e.target.value)}/>
            <input type="text" className='form-control' value={phone} placeholder="Phone" onChange={e=>setPhone(e.target.value)}/>
            <input type="submit" className='submit-btn' value="Login"/>
            {error&&<span className='error-text'>{error}</span>}
            </form>
            </div>
    </div>
  )
}

export default VetLogin