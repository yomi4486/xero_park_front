import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../assets/AppBar/index';
import { Helmet } from "react-helmet-async";

import getContext from '../../lib/get';
import ReadComponent from '../assets/ReadComponent';
import ContentEmbed from '../assets/ContentEmbed';

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

const MyPage: React.FC = () => {
    const { id } = useParams();
    const [content, setContent] = useState<{ title: string, content: string, author: string,lastedit:string } | null>(null);
    useEffect(()=>{
    const getContent = async () => {
        const result = await getContext({id:`${id}`});
        setContent(result ?? { title: "Page Not Found", content: "No content", author: "Unknown",lastedit:"-"});
    };
        getContent();
    },[id]);
    const bodyStyle = {
        backgroundColor: "#FEFFFE",
        width: useWindowWidth(),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        margin: 0,
    };
    const defaultContent = { 
        title: "Loading...", 
        author: "Loading...", 
        lastedit: "Loading...", 
        content: "Loading..." 
    }; 
    const displayContent = content ?? defaultContent;
    console.log(displayContent)
    return (
        
        <body style={bodyStyle}>
        <AppBar/>
        <Helmet>
                <title>あなたの記事</title>
        </Helmet>
        <div style={{width:"70%",height:"calc(100% - 120px)"}}>
            <h1>あなたの記事</h1>
            <ContentEmbed id="yomi4486"/>
        </div>
        </body>
    );
};

export default MyPage;