interface PostContextParams { id: String };
const getUserPage = async ({id}: PostContextParams) => {
    const url = `http://localhost:6789/get_user_page?id=${id}`;
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

export default getUserPage;