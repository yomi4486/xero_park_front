import React, { useState, useEffect, ClassAttributes, HTMLAttributes  } from 'react';

import ReactMarkdown from 'react-markdown';
import type { ExtraProps } from 'react-markdown'
import remarkGfm from 'remark-gfm';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

    const Pre = ({
        children,
        ...props
    }: ClassAttributes<HTMLPreElement> &
        HTMLAttributes<HTMLPreElement> &
        ExtraProps) => {
        if (!children || typeof children !== 'object') {
          return <code {...props}>{children}</code>
        }
        const childType = 'type' in children ? children.type : ''
        if (childType !== 'code') {
          return <code {...props}>{children}</code>
        }
    
        const childProps = 'props' in children ? children.props : {}
        const { children: code } = childProps
    
        return (
            <SyntaxHighlighter style={vscDarkPlus}>{String(code).replace(/\n$/, '')}</SyntaxHighlighter>
    )};
    return (
        <div style={centerContainer}>

        <h2 style={{textAlign:'left',margin:10,color:"#111111"}}>{title}</h2>
        <p style={{textAlign:'left',marginLeft:20,color:"#111111"}}>{author}・{lastedit}</p>
        <hr/>
        <p style={{textAlign:'left',margin:10,color:"#111111"}}>
            
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{pre:Pre}}>
                {content}
            </ReactMarkdown>
        </p>
        </div>
    );
}

export default ReadComponent;
