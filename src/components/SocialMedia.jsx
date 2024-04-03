import React from 'react';
import { BsInstagram, BsGithub } from 'react-icons/bs';
import { FaLinkedinIn} from 'react-icons/fa';
const SocialMeadia = () => {
  return (
    <div className="app__social">
    <div>
    <a href="https://github.com/MasumRaza1/"  target="_blank"><BsGithub /></a> 
    </div>
    <div>
      <a href="https://www.linkedin.com/in/masumrazacse/"  target="_blank"><FaLinkedinIn /></a>
    </div>
    <div>
     <a href="https://www.instagram.com/imasoomraza/"  target="_blank"><BsInstagram /></a> 
    </div>
  </div>
  )
}

export default SocialMeadia