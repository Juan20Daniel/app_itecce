import axios from "axios";

async function send(request, params) {
  try {
    return await fetch(`http://localhost:3000/api/${request}`, params)
    .then(result => {
      if(result.status === 200) {
        return result.json().then(res => {
          return { message:res.message, codeError:200, exactError:null, data:res.data }
        });
      }
      return result.json().then(res => {
        return { 
          message:res.message, 
          codeError:result.status, 
          exactError:res.exactError,
          data:res.data }
      });
    })
  } catch (error) {
    console.log(error);
    return { 
      message:'Servidor no disponible', 
      codeError:503,
      exactError:'El servidor esta actualmente fuera de linea, cominicate con el creador del sistema.',
      data:null 
    }
  }
}

export const sendRequestHTTP = async (file, typeList) => {
  const formData = new FormData();
  formData.append('excelFile', file);
  formData.append('typeList', typeList);
  const params = {
    method:'POST',
    body:formData
  }
  return await send('load-excel', params);
}

export const requestHTTP = (url, method, data) => {
  const params = {
    method:method,
    body: data ? JSON.stringify(data) : false,
    headers: {
      "Content-type":"application/json"
    }
  }
  if(!params.body) delete params.body;
  return fetch(url, params)
  .then(res => {
    if(res.status === 200) {
      return res.json().then(data => {
        return { error:false, data }
      })
    } else {
      return res.json().then(data => {
        return { error:true, data }
      })
    }
  })
  .catch(err => {
    return {error:err}
  })
}
export const sendImage = async (url, img, data) => {
  const form = new FormData();
  form.append('image', img);
  form.append('data', JSON.stringify(data));
  const response = await axios.post(url,form);
  if(response.status !== 200) {
    console.log(response)
    return false;
  };
  const result = {
    newImage:response.data.newImage,
    data: {
      "studens":response.data.studens,
      "teachers":response.data.teachers,
      "collaborators":response.data.collaborators,
    }
  }
  return result;
}