

import { commonAPI } from "./commonAPI";
import { serverURL } from "./serverURL";

// api to upload videos
export const uploadAllVideo = async(reqBody)=>{
    return await commonAPI('POST',`${serverURL}/videos`,reqBody)
}

// api to get all videos

export const getAllVideos = async()=>{
    return await commonAPI('GET',`${serverURL}/videos`,"")
}

//api to delete a video

export const deleteVideos = async(id)=>{
    return await commonAPI('DELETE', `${serverURL}/videos/${id}`,{})
}

//add watch history
export const addToHistory = async(VideoDetails)=>{
    return await commonAPI('POST', `${serverURL}/history`,VideoDetails)
}

// to get data from the history
export const getAllHistory = async()=>{
    return await commonAPI('GET', `${serverURL}/history`,"")
} 

// to add data to category
 export const getCategory = async(body)=>{
    return await commonAPI('POST',`${serverURL}/category`,body)
 }

 //api to delete history
 export const deleteHistory = async(id)=>{
    return await  commonAPI('DELETE',`${serverURL}/history/${id}`,{})
 }

 // api to get all category
 export const getAllcategory = async () => {
    return await commonAPI("GET", `${serverURL}/category`," ")
  }

  // api to get a video
  export const getVideo = async (id) => {
    return await commonAPI("GET", `${serverURL}/videos/${id}`," ")
  }

  //api call to update the category
  export const updateCategory = async (id,body) => {
    return await commonAPI("PUT", `${serverURL}/category/${id}`,body)
  }  
