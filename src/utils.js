export function fetchData(url, params = {}) {
    // Construct URL with query parameters if params are provided
    const queryString = Object.keys(params).map(key => key + '=' + params[key]).join('&');
    const fullUrl = queryString ? `${url}?${queryString}` : url;

    return fetch(fullUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}