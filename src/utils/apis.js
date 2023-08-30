async function request(url, method = "GET", body) {
    const config = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, config);
        const result = await response.json();
        if (result.error) {
            throw result.error;
        }
        // If we return something inside  this then,
        // we well be able to accept it inside next then
        return result;
    } catch (error) {
        throw error;
    }
}

export default request;