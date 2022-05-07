import axios from 'axios'
const token=(localStorage.getItem("token") ? localStorage.getItem("token") : '').replaceAll('"','');
console.log(token);
 const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
     headers : {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
});

export default {
    getData: (query,parameter) =>
    instance({
        'method':'GET',
        'url':query,
        'params': {
            'search':parameter,
        },
    }),
    postData: (url,payload) =>
    instance({
        'method': 'POST',
        'url':url,
        'data': payload
    })
};
