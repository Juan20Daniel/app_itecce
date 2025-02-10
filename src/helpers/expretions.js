export const expretions = {
    email:/^[a-zA-Z.-_0-9]{5,40}@[a-zA-Z]{3,30}\.[a-zA-Z]{2,5}(.[a-zA-Z]{2,5})?$/,
    username:/^[a-zA-Z0-9ñÑóÓáÁéÉíÍúÚ ]{6,20}$/,
    password:/^.{8,20}$/,
    imgClient:/^[0-9]{7}.(jpg|JPG|png|PNG)$/,
    imgTamplate:/^[a-zA-Z0-9-. áéíúóÁÉÍÓÚñÑ]+.(jpg|JPG|jpeg|JPEG)$/,
    validExtentionFile:/^.+[.xls XLS xlsx XLSX]{3,4}$/,
    periods:/^[a-zA-Z]{3}\/[0-9]{2}$/,
    careerAbridging:/^[A-ZÁÉÍÓÚÑ() .]{10,50}$/
}