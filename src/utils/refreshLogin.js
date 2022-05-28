import axios from 'axios'

const refresLogin = async ()=>{
  try{
    const refToken = await localStorage.getItem("redtrack-ref_token");

    let response = await axios.post("https://api.safetagtracking.com/login/token" ,{}, {
        headers: {
        "Authorization" : refToken
      }
    })

    response = response.data;

    console.log(response);

    let data = {
      message : "okay",
      token : response.IdToken
    }

    return data;
  }

  catch(e){
    console.log(e.response);
    return e.response.data;
  }
}



export default refresLogin;
