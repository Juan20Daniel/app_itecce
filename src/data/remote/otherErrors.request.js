export const otherErrorsRequest = (errorCode) => {
    const errorMatch = {
        ERR_NETWORK:{ success:false, message:'No hay comunicación con el servidor.' }
    }
    return errorMatch[errorCode];
}