import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../assets/AppBar/index';
import { Helmet } from "react-helmet-async";

import getContext from '../../lib/get';
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
    return (
        
        <body style={bodyStyle}>
        <AppBar/>
        <Helmet>
                <title>{displayContent?.title}</title>
        </Helmet>
        <div style={{width:"70%",height:"calc(100% - 120px)"}}>
        <ReadComponent title={displayContent?.title} author={displayContent?.author} lastedit={displayContent?.lastedit} content={displayContent?.content} />
        </div>
        </body>
    );
};

export default ReadPage;