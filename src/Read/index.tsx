import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../assets/AppBar/index';

import getContext from '../../lib/get';

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

const ReadPage: React.FC = () => {    
    const { id } = useParams();
    let content = getContext({id:`${id}`})
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
        height:50,
        width:useWindowWidth()*0.5,
        borderRadius:4,
        textAlign:"left",
        margin:10,
        padding:10,
        background:"#111111",
        color:"#eeeeee"
    };
    const contentInputStyle:React.CSSProperties  = {
        justifyContent: 'center', 
        alignItems: 'center', 
        border:"None",
        width:useWindowWidth()*0.5 - 20,
        height:useWindowHeight()*0.6,
        borderRadius:4,
        textAlign:"left",
        margin:10,
        padding:20,
        background:"#111111",
        resize: "none",
        color:"#eeeeee"
    };
    return (
        <body style={bodyStyle}>
        <AppBar/>
        <div style={centerContainer}>
            <p>{`表示ページ:${id}`}</p>
        </div>
        </body>
    );
};

export default ReadPage;