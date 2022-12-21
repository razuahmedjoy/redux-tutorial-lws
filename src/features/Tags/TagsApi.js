import axiosInstance from "../../utils/axios"

export const getTags = async ()=>{
    const response = await axiosInstance("/tags");
    return response.data;
}