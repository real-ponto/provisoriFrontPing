import axios from  'axios'

const getStatus = async IP =>{
  
  const formatMinutes = (min) =>{
    min = parseInt(min, 10)
    let dias = Math.floor(min/1440)
    min = min - (dias*1440)
    let horas = Math.floor(min/60)
    min = min - (horas*60)

    return `${dias} dias ${horas}h ${min}min`
  }

  let responseObject = { 
    success: false 
  }
  
  await axios.get(`http://${IP}:4000/getStatus`, { timeout:15000} )
  .then(function (response) {
    if(response.status === 200){
      responseObject.success = true

      const dataFormatted = (response.data).split(';')
      responseObject = {
        ...responseObject,
        data:{
          tempoLigado: formatMinutes(dataFormatted[0]), 
          tempoConectado: formatMinutes(dataFormatted[1]),
          tempoDesconectado: formatMinutes(dataFormatted[0] - dataFormatted[1]),
          quantasVezesTPLinkReiniciou: dataFormatted[2],
          ping: dataFormatted[3],
          firmwareVersion: dataFormatted[4],
          percent: Math.floor((dataFormatted[1]/dataFormatted[0])*100)
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