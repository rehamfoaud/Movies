import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faLinkedin,faFacebook,faInstagram,faWhatsapp,faGoogle} from '@fortawesome/free-brands-svg-icons';
import './Footer.css';


function Footer(){
    return(
        <div className='footer position-relative mt-5 d-flex align-items-center' style={{backgroundImage:"url('/images/19.jpg')"}}>
            <div className='overlay'></div>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-5 col-sm-12 col-12'>
                        <div className='footer-logo'>
                            <img src='/images/logo2.png'/>
                        </div>
                        <div className='desc'>
                            <p className='text-white mt-2'>Explore a world of movies<br/> from trending hits to hidden gems.<br/> All your favorites, just a click away.</p>
                        </div>
                    </div>
                    <div className='col-md-3 col-sm-6 col-12'>
                        <h3 className='title'>Movies</h3>
                        <ul className='typs'>
                            <li>Action</li>
                            <li>Drama</li>
                            <li>Horror</li>
                            <li>Fantasy</li>
                            <li>Comedy</li>
                        </ul>
                    </div>
                    <div className='col-md-4 col-sm-6 col-12'>
                        <h3 className='title'>Contacts</h3>
                        <ul className='typs'>
                            <li>contact@movieshub.com</li>
                            <li className='mt-2'>+020 12345678902</li>
                        </ul>
                        <div className='icons mt-4'>
                            <FontAwesomeIcon icon={faLinkedin}  className='icon'/>
                            <FontAwesomeIcon icon={faFacebook}  className='icon mx-2'/>
                            <FontAwesomeIcon icon={faInstagram} className='icon'/>
                            <FontAwesomeIcon icon={faWhatsapp}  className='icon mx-2'/>
                            <FontAwesomeIcon icon={faGoogle}    className='icon'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;