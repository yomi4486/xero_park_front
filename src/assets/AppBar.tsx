import React from 'react';
import { useAuth } from '../../lib/AuthContext';
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
    const buttonStyle = {
        backgroundColor: "#4285f4",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "2px",
        fontSize: "18px",
        cursor: "pointer",
      };
    const { user } = useAuth();
    if (!user){ // 未ログイン時の挙動を記述
        return (
            <div style={appBarStyle}>
                <p 
                    style={{
                        textAlign:"left",                    
                        marginLeft:20,
                        marginRight:10,
                        left:10
                    }}
                >Xero Park</p>
            </div>
        )
    }
    return (
        <div style={appBarStyle}>
            <p 
                style={{
                    textAlign:"left",                    
                    marginLeft:20,
                    marginRight:10,
                    left:10
                }}
            >Xero Park</p>
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
