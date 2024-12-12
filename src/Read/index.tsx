import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AppBar from '../assets/AppBar/index';

import getContext from '../../lib/get';

import ReactMarkdown from 'react-markdown';

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
        setContent(result ?? { title: "No title", content: "No content", author: "Unknown"});
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
    const centerContainer:React.CSSProperties  = { 
        width:useWindowWidth()*0.5,
        height:'auto',
        textAlign:'center',
        backgroundColor:"#EEEEEE"

    };
    return (
        <body style={bodyStyle}>
        <AppBar/>
        <div style={centerContainer}>
            <h2 style={{textAlign:'left',margin:10}}>{content?.title}</h2>
            <p style={{textAlign:'left',marginLeft:20}}>{content?.author}・{content?.lastedit}</p>
            <hr/>
            <p style={{textAlign:'left',margin:10}}>
                <ReactMarkdown>{content?.content}</ReactMarkdown>
            </p>
        </div>
        </body>
    );
};

export default ReadPage;