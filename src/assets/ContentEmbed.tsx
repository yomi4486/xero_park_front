import React, { useState, useEffect } from 'react';
import { useAuth } from '../../lib/AuthContext';
import getUserPage from '../../lib/getUserPage';
import { useNavigate } from 'react-router-dom';
import { FaPen,FaTrash } from "react-icons/fa"
import './ContentEmbed.css'
import deletePage from '../../lib/deletePage'
import FlashMessage from './SnackBar';
interface ContentEmbedProps { id: string; }

const ContentEmbed: React.FC<ContentEmbedProps> = ({ id }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [content, setContent] = useState<[{ title: string, datail: string, author: string, lastedit: string,id: number}] | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
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
            {errorMessage && <FlashMessage message={errorMessage} type="error" />}
            {content ? (
                <ul>
                    {content.slice().reverse().map((item, index) => (
                        <div 
                            className='contentBox'
                            style={{
                                backgroundColor:"#eeeeee",
                                padding:15,
                                margin:10,
                                borderRadius:10,
                            }} 
                            onClick={()=>navigate(`/${item.id}`)}
                        >
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <h2 style={{padding:10}}>{item.title}</h2>
                                <div className='tools'>
                                    <FaPen style={{margin:10,background:"#55555555",padding:10,borderRadius:5}}/>
                                    <FaTrash style={{margin:10,background:"#FF000055",padding:10,borderRadius:5}} onClick={
                                        (event)=>{
                                            event.stopPropagation();
                                            setErrorMessage(`${item.title}を削除しました。`);
                                            deletePage({id:`${item.id}`})
                                        }
                                    }/>
                                </div>
                            </div>
                            <div style={{backgroundColor:"#00000015",padding:10,borderRadius:10}}>
                                <p>{item.datail.replace(/#/g, "").replace(/\n/g, " ").replace(/-/g, "　・").replace(/ /g, "").replace(/\*/g, '').replace(/`/g, '').replace(/ \[([^\] ]+)\] \(https:\/\/[^\)]+\)/g, `$1`).replace(/___/g,"").replace(/---/g,"")}</p>
                                <p><strong>投稿者:</strong> {item.author}・<strong>最終更新日:</strong> {item.lastedit}</p>
                            </div>
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
