const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev';

export const request = async (nodeId) => {
    console.log('요청');
    try{
        const response = await fetch(`${API_END_POINT}/${nodeId? nodeId : ''}`)

        if(!response.ok){
            throw new Error('요청중 문제 발생')
        }

        return await response.json();
    } catch(e) {
        throw new Error(e);
    }
}

