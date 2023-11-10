import axios from "axios"



export const commonAPI = async (httpmethod, url, reqBody)=>{
    let refConfig={
        method: httpmethod,
        url,
        data: reqBody,
        Headers:{
            "Content-Type":"application/json"
        }
    }
    return await axios(refConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}