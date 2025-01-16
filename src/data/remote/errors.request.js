export const handleErrors = (error) => {
    if(!error.hasOwnProperty('response')) {
        const errorMatch = {
            ERR_NETWORK:{message:'No hay comunicación con el servidor.'},
            ERR_BAD_REQUEST:{message:'Error al intantar hacer la solicitud.'}
        }
        return errorMatch[error.code];
    }
    const { response } = error;
    if(!response.hasOwnProperty('data')) {
        return {message:'No fue posible realizar la operación'};
    }
    const { data } = error.response;
    if(!data.hasOwnProperty('message')) {
        return {message:'No fue posible realizar la operación'};
    }
    const {message} = error.response.data;
    return {message};
}
