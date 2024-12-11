import { useState, useEffect } from 'react';
import "./SnackBar.css"
type MessageType = "error" | "ok";
const FlashMessage = ({ message,type }:{message:string,type:MessageType}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // 3秒後にメッセージを非表示にする

    return () => clearTimeout(timer); // クリーンアップ
  }, []);

  if (!visible) return null;
  let colorcode;
  switch (type){
    case 'error':
        colorcode="#FF5656dd"
        break
    case 'ok':
        colorcode="#8CFF75dd"
        break
  }
  let cardStyle:React.CSSProperties = {
    backgroundColor:colorcode,
    position:"fixed",
    zIndex:1000,
    top:10,
    textAlign:"center",
    borderRadius:2,
    transform: "translateX(-50%)",
    width:300,
    height:60,
    justifyContent: "center",
    alignItems: "center"
  };
  return (
    <div className="flash-message" style={cardStyle}>
      <p style={{color:"#FFFFFF",padding:"0px 2px",fontSize:19,fontWeight:"bold"}}>{message}</p>
    </div>
  );
};

export default FlashMessage;
