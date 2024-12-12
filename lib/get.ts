interface PostContextParams { id: String };
const getContext = async ({id}: PostContextParams) => {
    const url = `http://localhost:6789/read?id=${id}`; // *にAPIエンドポイントを入れる
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
  
    // レスポンスの確認
    if (!response.ok) {
        console.error("Error in user creation:", response);
        return;
    }
    const responseBody = await response.json();
    return responseBody;
};

export default getContext;