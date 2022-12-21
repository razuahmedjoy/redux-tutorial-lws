import axiosInstance from "../../utils/axios"

export const getVideo = async (id)=>{
    const response = await axiosInstance(`/videos/${id}`);
    return response.data;
}