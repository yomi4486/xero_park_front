import React,{useState,useRef} from 'react';
import { useAuth } from '../../../lib/AuthContext';
import './main.css'
import { useNavigate } from 'react-router-dom';
const AppBar: React.FC = () => {
    const appBarStyle: React.CSSProperties = { 
        height:40,
        position: 'fixed',
        top: 0, 
        width: '100%', 
        backgroundColor: '#333', 
        color: 'white', padding: '10px 0',  
        zIndex: 999, 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'space-between'
    };
    
    const { user } = useAuth();
    const navigate = useNavigate();

    const navigateEdit = () => {
        navigate("/Edit")
    }

    const navigateMyPage = () => {
        navigate('/MyPage')
    }

    const [menuVisible, setMenuVisible] = useState(false); 
    const imgRef = useRef<HTMLImageElement>(null); 
    const handleClick = () => { setMenuVisible(!menuVisible); };
    const inVisivleMenu = () => {if(menuVisible) setMenuVisible(false)};
    if (!user){ // 未ログイン時の挙動を記述
        return (
            <div style={appBarStyle}>
                <div style={{display:"flex",alignItems: "center",padding:10}}>
                    <p 
                        style={{
                            textAlign:"left",                    
                            marginLeft:20,
                            marginRight:10,
                            left:10,
                            fontSize:30
                        }}
                    >Xero Park</p>
                    <div className="menu-item" onClick={navigateEdit}> {/*投稿ボタン*/}
                        <p 
                        style={{
                            textAlign:"left",                    
                            marginLeft:20,
                            marginRight:10,
                            left:10,
                            fontSize:16
                        }}
                        >投稿</p>
                    </div>
                    
                    <div className="menu-item">
                    <p 
                    style={{
                        textAlign:"left",                    
                        marginLeft:20,
                        marginRight:10,
                        left:10,
                        fontSize:16,
                    }}
                    >お気に入り</p>
                    </div>
                    
                </div>
            </div>
        )
    }
    return (
        <div style={appBarStyle} onClick={inVisivleMenu}>
            <div style={{display:"flex",alignItems: "center",padding:10}}>
            <p 
                style={{
                    textAlign:"left",                    
                    marginLeft:20,
                    marginRight:10,
                    left:10,
                    fontSize:30
                }}
            >Xero Park</p>
            <div className="menu-item" onClick={navigateEdit}> {/*投稿ボタン*/}
                <p 
                style={{
                    textAlign:"left",                    
                    marginLeft:20,
                    marginRight:10,
                    left:10,
                    fontSize:16,
                    paddingLeft:20
                }}
                >投稿</p>
            </div>
            <div className="menu-item">
                <p 
                style={{
                    textAlign:"left",                    
                    marginLeft:20,
                    marginRight:10,
                    left:10,
                    fontSize:16,
                }}
                >お気に入り</p>
            </div>
            </div>
            <div>
                <img 
                    ref={imgRef}
                    onClick={handleClick}
                    alt="your account" 
                    src={user.picture} 
                    style={{
                        borderRadius:18,
                        width:36,
                        height:36,
                        textAlign:"right",
                        marginLeft:10,
                        marginRight:10,
                        right:10
                    }}
                ></img>
                {menuVisible && imgRef.current && ( 
                    <div style={{ 
                        position: 'absolute', 
                        top: imgRef.current.offsetTop + imgRef.current.offsetHeight+16, 
                        left: 'auto',
                        right:1,
                        backgroundColor: 'white', 
                        border: '1px solid #ccc', 
                        borderRadius: 4, 
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)', 
                        zIndex: 1000,
                        color:"#111111",
                        boxSizing:'border-box',
                    }}> 
                        <ul style={{ 
                            listStyle: 'none', 
                            margin: 0,
                            fontSize:20,
                            padding:'10px'
                        }}> 
                            <li style={{ padding: '8px 16px' }}>アカウント</li> 
                            <li style={{ padding: '8px 16px' }}>お気に入り</li> 
                            <li style={{ padding: '8px 16px' }} onClick={navigateMyPage}>自分の記事</li>
                            <li style={{ padding: '8px 16px' }}>設定</li>
                        </ul> 
                    </div> 
                )}
            </div>
        </div>
    );
};

export default AppBar;
