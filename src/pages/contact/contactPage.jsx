import React from 'react';
import PageTransition from '../../components/pageTransition';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import './contactPage.css';
import { MdOutlineLocationOn } from "react-icons/md";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";




const ContactPage = () => {
  return ( 
    <PageTransition>
      <div className='contact'>
        <div className="container">
          <div className="top-cotanct">
            <form>
              <div className="top">
                <div className="info">
                  <label htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" />
                </div>
                <div className="info">
                  <label htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" />
                </div>
              </div>
              <div className="info">
                <label htmlFor="message">message</label>
                <textarea name="message" id="message"></textarea>
              </div>
              <input type="submit" value="submit" className='btn'/>
            </form>
            <div className="social">
              <h1>Contact Us</h1>
              <h3>We believe sustainability is vitally important.</h3>
              <p>Etiam sit amet convallis erat – class aptent taciti sociosqu ad litora torquent per conubia! Maecenas gravida lacus. Lorem etiam sit amet convallis erat.</p>
              <div className="icons">
                <FaFacebookF />
                <FaTwitter />
                <FaInstagram />
                <FaLinkedinIn />
              </div>
            </div>
          </div>
          <div className="bottom-cotanct">
            <div className="cards">
              <div className="my-card">
                <MdOutlineLocationOn />
                <h2>our main office</h2>
                <p>SoHo 94 Broadway St New York, NY 1001</p>
              </div>
              <div className="my-card">
                <BsTelephone />
                <h2>phone number</h2>
                <p>+2001116339830</p>
              </div>
              <div className="my-card">
                <MdOutlineEmail />
                <h2>Email</h2>
                <p>medotv1000@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default ContactPage;