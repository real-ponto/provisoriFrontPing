import axios from  'axios'

const getStatus = async IP =>{
  
  let responseObject = { 
    success: false 
  }

  await axios.get(`http://${IP}:4000/getStatus`)
  .then(function (response) {
    if(response.status === 200){
      responseObject.success = true

      const dataFormatted = (response.data).split(';')
      console.log(dataFormatted)
      responseObject = {
        ...responseObject,
        data:{
          tempoLigado: dataFormatted[0], 
          tempoConectado: dataFormatted[1],
          tempoDesconectado: dataFormatted[0] - dataFormatted[1] ,
          quantasVezesTPLinkReiniciou: dataFormatted[2],
          ping: dataFormatted[3]
        } 
      }
    }
  })
  .catch(function (error) {
    responseObject.success = false
      console.log("error");
      console.log(error);
  })
  return responseObject
}
export default getStatus