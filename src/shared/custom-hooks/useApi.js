import {useState} from 'react';
import axios from 'axios';

export default function useApi() {
    const [progress, setProgress] = useState(0);
    const HandleProgressUpload = ({loaded, total}) => {
        let percentage = Math.floor((loaded*100)/total);
        setProgress(percentage);
    }
    const postRequest = ({url, data, options}) => {
        options.onUploadProgress = HandleProgressUpload;

        return axios.post(url, data, options).then((response)=>{
            if (response && response.data) {
                return response.data;
            } else {
                return response;
            }
        })
        .catch(function (error) {
          if (error.response) {
            throw error.response.data;
          } else {
            throw error.message;
          }
        });
    }
    
    return {
        progress,
        postRequest
    }
}
