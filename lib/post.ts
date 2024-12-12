interface PostContextParams { token: string; title: string; datail: string; content: string; tags: string; }
const postContext = async ({token,title,datail,content,tags}: PostContextParams) => {
    const userData = {
        token: token,
        title: title,
        datail: datail,
        content: content,
        tags: tags
    };
    
    const url = "http://localhost:6789/post"; // *にAPIエンドポイントを入れる
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
  
    // レスポンスの確認
    if (!response.ok) {
        console.error("Error in user creation:", response);
        return;
    }
    const responseBody = await response.text();
    console.log(responseBody);
    return responseBody;
};

export default postContext;