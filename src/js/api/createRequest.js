const createRequest = async (data) => {
    const response = await fetch(data.url, data.options);
    if(response.ok) {
        return response;
    }    
};

export default createRequest;
