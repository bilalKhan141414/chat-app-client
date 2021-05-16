export const isCanceled = (resp) => resp.requestCanceled !== undefined;

export const getResponseData = (response) => {
    if (response && response.data) {
        return  {
            status:true,
            message:response.data
        };
    } else {
        return  {
            status:false,
            message:"No data returned from call"
        };
    }
}

