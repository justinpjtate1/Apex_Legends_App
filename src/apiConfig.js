let apiUrl;
const expressPort = 5001;
const apiUrls = {
    development: `http://localhost:${expressPort}`,
    production: `https://example.domain.com`
}

if(window.location.hostname === 'localhost') {
    apiUrl = apiUrls.development
} else {
    apiUrl = apiUrls.production
}

export default apiUrl;