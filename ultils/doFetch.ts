import axios from 'axios';
//import toast from 'react-toast'

const doFetch = (uri: string = '', method: string = 'get', postData?: any | null) => {
    const data = postData ? { data: postData } : {};
    const url = uri;

    const config = {
        method,
        url,
        headers: {
            'Content-type': 'application/json',
        },
        ...data,
    };

    return new Promise((resolve, reject) => {
        axios(config)
            .then(async resData => {
                resolve(await resData.data);
            })
            .catch(err => {
                // SAVE LOGS
                console.log(':: INTERAL call err :::', err);

                resolve(undefined);

                //reject(err);
            });
    });
};

export default doFetch;
