import * as axios from 'axios';

const BASE_URL = 'http://localhost:3001';

function upload(formData) {
    const url = `${BASE_URL}/photos/upload`;
    return axios.post(url, formData)
        .then(wait(1500)) // DEV ONLY: wait for 1.5s 
        // get data
        .then(x => x.data)
        // add url field
        .then(x => x.map(img => Object.assign({},
            img, { url: `${BASE_URL}/images/${img.id}` })));
}

// utils to delay promise
function wait(ms) {
    return (x) => {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
}

export { upload }