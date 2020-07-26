//export const apiUrl = 'https://bam-back-end-api.herokuapp.com';

class ApiConfig {
    constructor() {
        this.apiUrl = 'http://bam-prototype.eastus.cloudapp.azure.com:8080'
    }

    setApi(url) {
        this.apiUrl = url;
    }
}

const apiConfig = new ApiConfig();

export default apiConfig;