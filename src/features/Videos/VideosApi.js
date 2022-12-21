import axiosInstance from "../../utils/axios"

export const getVideos = async ()=>{
    const response = await axiosInstance("/videos");
    return response.data;
}