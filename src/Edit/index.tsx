import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import AppBar from '../assets/AppBar/index';

import postContext from '../../lib/post';

import ReadComponent from '../assets/ReadComponent';

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
        width: "100%",
    };
    const centerSubContainer:React.CSSProperties  = { 
        textAlign: 'center',
        display:"flex",
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        width: '100%',
    };
    const centerMainContainer:React.CSSProperties  = { 
        textAlign: 'center',
        width: '90%',
    };
    const titleInputStyle:React.CSSProperties  = {
        justifyContent: 'center', 
        alignItems: 'center', 
        border:"None",
        height:50,
        width:"100%",
        borderRadius:4,
        textAlign:"left",
        marginTop:10,
        marginRight:10,
        padding:10,
        background:"#111111",
        color:"#eeeeee"
    };
    const contentInputStyle:React.CSSProperties  = {
        justifyContent: 'center', 
        alignItems: 'center', 
        border:"None",
        width:"100%",
        height: '60vh',
        borderRadius:4,
        textAlign:"left",
        marginTop:10,
        padding:15,
        background:"#111111",
        resize: "none",
        color:"#eeeeee"
    };

    const [titleText, setTitleText] = useState("無題");
    const [contentText, setContentText] = useState("");
    const [datailText, setDatailText] = useState("");
    const navigate = useNavigate();

    const post = async () => {
        let datail;
        if(datailText.length == 0){
            datail = `${contentText.substring(0,250)}`;
            if (contentText.length >= 250){
                datail += "...";
            }
        }else{
            datail = datailText;
        }

        const res = await postContext({
            token:"yomi4486",
            title:titleText,
            datail:datail,
            content:contentText,
            tags:""
        })
        navigate(`/${res}`)
    };

    return (
        <body style={bodyStyle}>
        <AppBar/>
        <div style={centerMainContainer}>
            <div style={centerSubContainer}>
                <div style={{width:'45%', textAlign: 'left',marginRight:'60px'}}>
                    <input 
                        type="text" 
                        style={titleInputStyle} 
                        placeholder="タイトル" 
                        value={titleText}
                        onChange={(event) => setTitleText(event.target.value)}
                    />
                    <input 
                        type="text" 
                        style={titleInputStyle} 
                        placeholder="概要 （何も書かなければ本文から抜粋されます）" 
                        value={datailText}
                        onChange={(event) => setDatailText(event.target.value)}
                    />
                    <textarea
                        style={contentInputStyle} 
                        placeholder="内容"
                        value={contentText}
                        onChange={(event) => setContentText(event.target.value)}
                    />
                    <div style={{textAlign:'right'}}><button style={buttonStyle} onClick={post}>投稿</button></div>
                </div>
                <div style={{ width: '45%', height: '80vh', backgroundColor: "#eeeeee", borderRadius: 4, textAlign: 'right'}}>
                    <ReadComponent title={titleText} content={contentText} author='yomi4486' lastedit='投稿日時'/>
                </div>
                <br /> 
            </div>
        </div>
        </body>
    );
};

export default EditPage;