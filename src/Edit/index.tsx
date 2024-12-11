import React, { useState, useEffect } from 'react';

import AppBar from '../assets/AppBar/index';
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

const useWindowHeight = () => {
    const [height, setHeight] = useState(window.innerHeight);
  
    useEffect(() => {
      const handleResize = () => setHeight(window.innerHeight);
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return height;
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
        textAlign: 'center'
    };
    const titleInputStyle:React.CSSProperties  = {
        justifyContent: 'center', 
        alignItems: 'center', 
        border:"None",
        height:60,
        width:useWindowWidth()*0.5,
        borderRadius:4,
        textAlign:"left",
        margin:10,
        padding:10,
        background:"#111111"
    };
    const contentInputStyle:React.CSSProperties  = {
        justifyContent: 'center', 
        alignItems: 'center', 
        border:"None",
        width:useWindowWidth()*0.5 - 20,
        height:useWindowHeight()*0.7,
        borderRadius:4,
        textAlign:"left",
        margin:10,
        padding:20,
        background:"#111111",
        resize: "none"
    };
    return (
        <body style={bodyStyle}>
        <AppBar/>
        <div style={centerContainer}>
            <input type="text" style={titleInputStyle} placeholder="タイトル"/>
            <textarea style={contentInputStyle} placeholder="内容"/>
            <br />
            <button style={buttonStyle}>投稿</button>
        </div>
        </body>
    );
};

export default EditPage;