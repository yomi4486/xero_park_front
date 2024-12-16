import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import getUserPage from '../../lib/getUserPage';
import { useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';

interface ContentEmbedProps { id: string; }

const ContentEmbed: React.FC<ContentEmbedProps> = ({ id }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [content, setContent] = useState<[{ title: string, datail: string, author: string, lastedit: string }] | null>(null);

    useEffect(() => {
        const getContent = async () => {
            const userPages = await getUserPage({ id: `${id}` });
            console.log(userPages);
            setContent(userPages);
        };
        getContent();
    }, [id]);

    return (
        <div>
            {content ? (
                <ul>
                    {content.slice().reverse().map((item, index) => (
                        <div style={{backgroundColor:"#cccccc",padding:10,margin:10,borderRadius:10}}>
                            <h3>{item.title}</h3>
                            <p>{item.datail.replace(/#/g, "").replace(/\n/g, " ").replace(/-/g, "　・").replace(/ /g, "").replace(/\*/g, '').replace(/`/g, '').replace(/ \[([^\] ]+)\] \(https:\/\/[^\)]+\)/g, `$1`).replace(/___/g,"").replace(/---/g,"")}</p>
                            <p><strong>投稿者:</strong> {item.author}</p>
                            <p><strong>最終更新日:</strong> {item.lastedit}</p>
                        </div>
                    ))}
                </ul>
            ) : (
                <p>Loading content...</p>
            )}
        </div>
    );
};

export default ContentEmbed;
