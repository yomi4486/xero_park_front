import React, { useState, useEffect } from 'react';

import AppBar from '../assets/AppBar';
const useWindowWidth = () => {
    const [width, setWidth] = useState(window.innerWidth);
  
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return width;
};

const EditPage: React.FC = () => {
    const bodyStyle = {
        backgroundColor: "#FEFFFE",
        width: useWindowWidth(),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
    };
    const buttonStyle = {
        backgroundColor: "#4285f4",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "2px",
        fontSize: "18px",
        cursor: "pointer",
    };
    const centerContainer:React.CSSProperties  = {
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center'
    }
    return (
        <body style={bodyStyle}>
        <AppBar/>
        <div style={centerContainer}>
        <button style={buttonStyle}>投稿</button>
        </div>
        </body>
    );
};

export default EditPage;