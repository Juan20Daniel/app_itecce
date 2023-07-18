import axios from "axios";
const arrayLotes = (array) => {
  var actualArray = [];
  for(let i=0; i<=array.length - 1; i++) {
    var arrayIndex = Math.floor(i / 200);
    if(!actualArray[arrayIndex]) {
      actualArray[arrayIndex] = [];
    }
    actualArray[arrayIndex].push(array[i]);
  }
  return actualArray;
}
export function sendArrayLotes(array) {
  const resultArrayLotes = arrayLotes(array);
  for(const lote of resultArrayLotes) {
    try {
      var data = { lote:lote }
      const response = axios.post('http://localhost:3000/api/load-excel', data);
      console.log(response)
    }catch(error) {
      console.log(error);
    }
  }
}
export const sendExcel = async (url, fileContent) => {
  const formData = new FormData();
  formData.append('excelFile', fileContent);

  const response = await axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  console.log(response);
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