

const FormatedTimestamp = ()=> {
  const d = new Date()
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return `${date} ${time}`
}

const ValidateEmail = (mail) => {
    //regex provided by w3schools.
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail) && mail !== undefined
}

/*
 * Função criada por DRY, eu estava repetindo demais este snippet.
 */
const ReturnError = (res, status = 400, message = "Unable to attend request.") => {
    res.status = status;
    res.json({
        "status": false,
        "data":{
             "message": message,
        }
    })
}


module.exports = { FormatedTimestamp, ValidateEmail, ReturnError }
