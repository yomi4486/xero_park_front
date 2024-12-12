import React from 'react';
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
            <img 
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
                // TODO: アイコン画像をクリックしたときにメニューバーを表示したい
            ></img>

        </div>
    );
};

export default AppBar;
