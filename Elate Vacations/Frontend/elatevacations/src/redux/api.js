import axios from 'axios';

const devEnv = process.env.NODE_ENV !== "production";
const {REACT_APP_DEV_API, REACT_APP_PROD_API} = process.env;
const API = axios.create({
    baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`
});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("profile")).token
        }`;
    }
    return req;
});

export const signIn = (formData)=> API.post("/users/signin", formData);
export const signUp = (formData)=> API.post("/users/signup", formData);

export const createTour = (tourData)=> API.post("/tours", tourData);
export const getTours = (page)=> API.get(`/tours?page=${page}`);
export const getTour = (id)=> API.get(`/tours/${id}`); // here id is tour id
export const deleteTour = (id)=> API.delete(`/tours/${id}`); // here id is tour id
export const updateTour = (updatedTourData,id)=> API.patch(`/tours/${id}`, updatedTourData); // here id is tour id
export const getToursByUser = (userId)=> API.get(`/tours/userTours/${userId}`);  // here id is user id
export const getToursBySearch = (searchQuery)=> API.get(`/tours/search?searchQuery=${searchQuery}`);  // here id is user iderTours/$
export const getTagTours = (tag)=> API.get(`/tours/tag/${tag}`);
export const getRelatedTours = (tags)=> API.post(`/tours/relatedTours`, tags);
export const likeTour = (id)=> API.patch(`/tours/like/${id}`);