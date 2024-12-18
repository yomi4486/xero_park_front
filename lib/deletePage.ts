interface PostContextParams { id: String };
const deletePage = async ({id}: PostContextParams) => {
    const userData = {
        token:'yomi4486',
        id:id
    }
    const url = `http://localhost:6789/delete_page`;
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(userData),
    });
  
    // レスポンスの確認
    if (!response.ok) {
        console.error("Error in user creation:", response);
        return;
    }
    const responseBody = await response.json();
    return responseBody;
};

export default deletePage;