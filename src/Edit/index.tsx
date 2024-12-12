import React, { useState, useEffect,MouseEvent,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";

import AppBar from '../assets/AppBar/index';

import postContext from '../../lib/post';

import ReadComponent from '../assets/ReadComponent';

import '../assets/AppBar/main.css'

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

    // 右クリックメニューのフック
    const [menuVisible, setMenuVisible] = useState(false)
    const [menuPosition, setMenuPosition] = useState({x:0,y:0})

    const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault(); 
        setMenuPosition({ x: event.clientX, y: event.clientY }); 
        setMenuVisible(true); 
    }; 
    const invisivleMenu = () => { setMenuVisible(false); };

    // テキストフィールドにフォーカスを合わせるためのフック
    const inputRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        if(inputRef.current) inputRef.current.focus();
    },[])

    // 見出しを作成
    const createMidashi = () => {
        setContentText(contentText+"## 見出し")
    };

    // コードブロックを作成
    const createCodeBlock = () => {
        setContentText(contentText+"```\n// Type your source code...\n```")
        if(inputRef.current) inputRef.current.focus();
    };

    // 小見出しを作成
    const createKomidashi = () => {
        setContentText(contentText+"### 小見出し")
        if(inputRef.current) inputRef.current.focus();
    };

    // 小見出しを作成
    const createURL = () => {
        setContentText(contentText+"[表示するテキスト](https://example.com)")
        if(inputRef.current) inputRef.current.focus();
    };

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
        <Helmet>
            <title>新規記事を作成</title>
        </Helmet>
        <AppBar/>
        <div style={centerMainContainer}>
            <div style={centerSubContainer}>
                <div style={{width:'45%', textAlign: 'left',marginRight:'60px'}} onClick={invisivleMenu}>
                    {menuVisible && ( 
                        <ul style={{ 
                            position: 'absolute', 
                            top: menuPosition.y, 
                            left: menuPosition.x, 
                            backgroundColor: 'white', 
                            border: '2px solid black', 
                            listStyle: 'none', 
                            padding: '10px', 
                            color:"#111111", 
                            borderRadius:4,
                            fontSize:20
                        }}> 
                            <li className='menu-item' style={{ paddingBottom:6,paddingLeft:2 }}>×</li>
                            <li className='menu-item' style={{ borderBottom: '1px solid #ccc',paddingTop:2,paddingBottom:2 }} onClick={createMidashi}>見出しを作成</li>
                            <li className='menu-item' style={{ borderBottom: '1px solid #ccc',paddingTop:2,paddingBottom:2 }} onClick={createKomidashi}>小見出しを作成</li> 
                            <li className='menu-item' style={{ borderBottom: '1px solid #ccc',paddingTop:2,paddingBottom:2 }} onClick={createCodeBlock}>ソースコード</li> 
                            <li className='menu-item' style={{ borderBottom: '1px solid #ccc',paddingTop:2,paddingBottom:2 }} onClick={createURL}>URL</li>
                            <li className='menu-item'>画像</li> 
                        </ul> 
                    )}  
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
                    <div onContextMenu={handleContextMenu} onClick={invisivleMenu}>
                    <textarea
                        ref={inputRef}
                        style={contentInputStyle} 
                        placeholder="内容"
                        value={contentText}
                        onChange={(event) => setContentText(event.target.value)}
                    />
                    </div>
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