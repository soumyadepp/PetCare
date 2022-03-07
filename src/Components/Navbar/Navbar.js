import React from 'react'
import './Navbar.scss';
import {Link} from 'react-router-dom'
import {AccountCircle} from '@material-ui/icons';
function Navbar({user}) {
  return (
    <div className='navbar-container'>
        <div className='navbar-left'>
            <Link to="/" style={{textDecoration:'none',color:'#fff'}}><h2 className='title'>PetCare</h2></Link>
        </div>
        <div className='navbar-right'>
            {!user&&<><Link to ="/login"><button className='login-btn'>
                Login
            </button></Link>
            <Link to ="/signup"><button className='signup-btn'>
                Signup
            </button></Link></>}
            {user &&<>
            <Link to ="/login" style={{textDecoration:'none'}}><button className='signup-btn' onClick={()=>{localStorage.clear()}}>Logout</button></Link>
            <AccountCircle className='account-image'/>
            </>
            }
        </div>
    </div>
  )
}

export default Navbar