import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '../assets/AppBar/index';
import { useAuth } from '../../lib/AuthContext';

import FlashMessage from '../assets/SnackBar';
import headerImage from '../assets/header.png'

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

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const handleButtonClick = () => { 
        try{
            navigate("/Edit");
        }catch(e){
            console.error(e);
        }
    };
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
    const centerContainer:React.CSSProperties = {
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center'
    }
    const { user } = useAuth();
    if(!user){
        return (
            <body style={bodyStyle}>
            <AppBar/>
            <div style={centerContainer}>
                <img src={headerImage} style={{width:"35%"}}></img>
                <h1 style={{textAlign:"center",color:"#111111"}}>XeroParkへようこそ！</h1>
                <p style={{textAlign:"center",marginBottom:30,color:"#111111"}}>あなたの素晴らしい実績をここに書き残しましょう！</p>
            </div>
            </body>
        );
    }
    return (
        <body style={bodyStyle}>
        <AppBar/>
        <FlashMessage message="ログインに成功しました" type="ok"/>
        <div style={centerContainer}>
            <img src={headerImage} style={{width:"35%"}}></img>
            <h1 style={{textAlign:"center",color:"#111111"}}>XeroParkへようこそ！</h1>
            <p style={{textAlign:"center",marginBottom:30,color:"#111111"}}>あなたの素晴らしい実績をここに書き残しましょう！</p>
            <button style={buttonStyle} onClick={handleButtonClick}>記事を投稿</button>
        </div>
        </body>
    );
};

export default Dashboard;