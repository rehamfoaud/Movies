import React, {useState,useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/Button';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar({onSearch}){
    const [focused,setFocused]=useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [imgURl,setImgURL]=useState('/images/logo2.png');
    const [color,setColor]=useState('#fff');
    const [user,setUser]=useState('');
    const navigate=useNavigate();
    const handleSearch=(e)=>{
        onSearch(e.target.value);
        console.log(e.target.value);
    }
    const goLogin=()=>{
        if(user){
           localStorage.removeItem('loginData');
           navigate('/login');
        }
        else{
            navigate('/login');
        }
    }
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > window.innerHeight) {
          setIsScrolled(true);
          setImgURL('/images/logo.png');
          setColor('#000');
        } else {
          setIsScrolled(false);
          setImgURL('/images/logo2.png');
          setColor('#fff');
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    useEffect(()=>{
       let loginData=JSON.parse(localStorage.getItem('loginData'));
       if(loginData){
        setUser(loginData.username);
       }
       
    },[])
    return(
        <div className={`navbarr ${isScrolled?'whitebg':'blurbg'}`}>
            <div className='container'>
                <div className='row align-items-center' style={{height:'80px'}}>
                    <div className='col-6'>
                        <div className='d-flex align-items-center'  style={{height:"60px"}}>
                            <img src={imgURl}/>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='right-side d-flex justify-content-end align-items-center' style={{height:"60px"}}>
                            <div className={`search-sec d-flex justify-content-end align-items-center`}>
                                <input type="text" 
                                className={focused?"expand":""}
                                onFocus={()=>setFocused(true)}
                                onBlur={()=>setFocused(false)}
                                onChange={handleSearch}
                                placeholder='Search movie'
                                />
                                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
                            </div>
                            <div className='login-btn ms-3'>
                                <Button text={user?"Logout":"Login"} btnClass="btn" radius="30px" height="40px"
                                width="90px" margin="0" border="0" bgColor="#780101"
                                onClick={goLogin}
                                />
                            </div>
                            <div className='user d-flex justify-content-end align-items-center'>
                                <p className='text-end mt-3 ms-3' style={{color:color}}>
                                    {user?user:"Guest"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Navbar;