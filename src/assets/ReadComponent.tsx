import React, { useState, useEffect } from 'react';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

const ReadComponent = ({ title,author,lastedit,content }:{title:string,author:string,lastedit:string,content:string}) => {

    const centerContainer:React.CSSProperties  = { 
        width:"100%",
        height:'100%',
        textAlign:'right',
        backgroundColor:"#EEEEEE",
        overflow:'auto'
    };
    if(title.length == 0){
        title = "タイトル"
    }
    return (
        <div style={centerContainer}>

        <h2 style={{textAlign:'left',margin:10,color:"#111111"}}>{title}</h2>
        <p style={{textAlign:'left',marginLeft:20,color:"#111111"}}>{author}・{lastedit}</p>
        <hr/>
        <p style={{textAlign:'left',margin:10,color:"#111111"}}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
            </ReactMarkdown>
        </p>
        </div>
    );
}

export default ReadComponent;
