import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap } from '../../wrapper';

import { images } from '../../constants';
import { FaDownload } from 'react-icons/fa';
import { urlFor, client } from '../../client';
// import { urlFor } from '../../client';

import './Header.scss';

const scaleVariants = {
  whileInView: {
    scale: [0, 1],
    opacity: [0, 1],
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

const Header = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        // Fetch resume documents from Sanity
        const data = await client.fetch(`*[_type == "resume"]`);
        setResumes(data);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, []);

  // Function to generate download URL from _ref
  const getUrlFromId = ref => {
    // Split the _ref to get the ID and extension
    const [, id, extension] = ref.split('-');
    const PROJECT_ID = process.env.REACT_APP_SANITY_PROJECT_ID; // Replace with your Sanity project ID
    const DATASET = 'production'; // Replace with your Sanity dataset name
    return `https://cdn.sanity.io/files/${PROJECT_ID}/${DATASET}/${id}.${extension}`;
  };
  
  // Function to handle file updates
  const handleFileUpdate = async () => {
    try {
      const data = await client.fetch(`*[_type == "resume"]`);
      setResumes(data);
    } catch (error) {
      console.error('Error fetching updated resumes:', error);
    }
  };

  // Listen for changes in the component dependencies (none in this case), then call handleFileUpdate
  useEffect(() => {
    const subscription = client.listen('*[_type == "resume"]').subscribe(handleFileUpdate);
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="app__header app__flex">
      <motion.div
        whileInView={{ x: [-100, 0], opacity: [0, 1] }}
        transition={{ duration: 0.5 }}
        className="app__header-info"
      >
        <div className="app__header-badge">
          <div className="badge-cmp app__flex">
            <span>👋</span>
            <div style={{ marginLeft: 20 }}>
              <p className="p-text">Hello, I am</p>
              <h1 className="head-text">Masum</h1>
              <p className="p-text">Web Developer, C++</p>
            </div>
          </div>
         
      {resumes.map(resume => (
            <div className="tag-cmp app__flex">
              <a href={getUrlFromId(resume.file.asset._ref)} download={resume.file.asset.originalFilename} target='_blank' className="resume-link">
              <FaDownload className="download-icon" /> {resume.title}
            </a>
            </div>
      
           ))}
        </div>
      </motion.div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__header-img"
      >
        <img src={images.emiway} alt="profile_bg" />
        <motion.img
          whileInView={{ scale: [0, 1] }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          src={images.circle}
          alt="profile_circle"
          className="overlay_circle"
        />
      </motion.div>

      <motion.div
        variants={scaleVariants}
        whileInView={scaleVariants.whileInView}
        className="app__header-circles"
      >
        {[images.react, images.cpp, images.javascript].map((circle, index) => (
          <div className="circle-cmp app__flex" key={`circle-${index}`}>
            <img src={circle} alt="profile_bg" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default AppWrap(Header, 'home');
