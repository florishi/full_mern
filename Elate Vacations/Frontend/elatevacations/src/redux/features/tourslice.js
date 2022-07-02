import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from "../api";


export const createTour = createAsyncThunk("tour/createTour", async ({ updatedTourData, navigate, toast }, thunkAPI) => {
    try {
        // console.log(updatedTourData)
        const response = await api.createTour(updatedTourData);
        // console.log(response)
        toast.success("Tour added successfully", { position: toast.POSITION.TOP_RIGHT });
        navigate("/");
        return response.data;


    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const getTours = createAsyncThunk("tour/getTours", async (page, thunkAPI) => {
    //if not providing any parameter from ui component during dispatch just give _, as null param
    try {
        const response = await api.getTours(page);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const getTour = createAsyncThunk("tour/getTour", async (id,thunkAPI) => {
    try {
        const response = await api.getTour(id);
        return response.data.tour;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const getToursByUser = createAsyncThunk("tour/getToursByUser", async (userId,thunkAPI) => {
    try {
        const response = await api.getToursByUser(userId);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const deleteTour = createAsyncThunk("tour/deleteTour", async ({id, toast},thunkAPI) => {
    try {
        const response = await api.deleteTour(id);
        toast.success("Tour deleted successfully");
        return response.data;
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const updateTour = createAsyncThunk("tour/updateTour", async ({id, updatedTourData, navigate,toast},thunkAPI) => {
    try {
        const response = await api.updateTour(updatedTourData, id);
        toast.success("Tour updated successfully");
        navigate("/");
        return response.data;
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const searchTours = createAsyncThunk("tour/searchTours", async (searchQuery,thunkAPI) => {
    try {
        const response = await api.getToursBySearch(searchQuery);
        
        
        return response.data;
        
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const getToursByTag = createAsyncThunk("tour/getToursByTag", async (tag,thunkAPI) => {
    try {
        const response = await api.getTagTours(tag);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const getRelatedTours = createAsyncThunk("tour/getRelatedTours", async (tags,thunkAPI) => {
    try {
        const response = await api.getRelatedTours(tags);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
export const likeTour = createAsyncThunk("tour/likeTour", async ({_id},thunkAPI) => {
    try {
        const response = await api.likeTour(_id);
        return response.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data);
    }
});
        
        
        
    

const tourSlice = createSlice({
    name: "tour",
    initialState: {
        tour: {},
        tours: [],
        userTours: [],
        tagTours: [],
        relatedTours: [],
        currentPage: 1,
        numberOfPages: null,
        error: "",
        loading: false
    },
    reducer: {
        setCurrentPage: (state, action)=>{
            state.currentPage = action.payload
        }

    },

    extraReducers: {
        [createTour.pending]: (state, action) => {
            state.loading = true;
        },
        [createTour.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = [action.payload]
        },
        [createTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTours.pending]: (state, action) => {
            state.loading = true;
        },
        [getTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = action.payload.data;
            state.numberOfPages = action.payload.numberOfPages;
            state.currentPage = action.payload.currentPage;
        },
        [getTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getTour.pending]: (state, action) => {
            state.loading = true;
        },
        [getTour.fulfilled]: (state, action) => {
            state.loading = false;
            state.tour = action.payload
        },
        [getTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getToursByUser.pending]: (state, action) => {
            state.loading = true;
        },
        [getToursByUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.userTours = action.payload
        },
        [getToursByUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [deleteTour.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteTour.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("action", action);
            const {arg} = action.meta;
            if(arg.id){
                state.userTours = state.userTours.filter((item)=> item._id !== arg.id);
                state.tours = state.tours.filter((item)=> item._id !== arg.id);
            }
        },
        [deleteTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [updateTour.pending]: (state, action) => {
            state.loading = true;
        },
        [updateTour.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("action", action);
            const {arg} = action.meta;
            if(arg.id){
                state.userTours = state.userTours.map((item)=> item._id === arg.id ? action.payload : item);
                state.tours = state.tours.map((item)=> item._id === arg.id ? action.payload: item);
            }
        },
        [updateTour.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [searchTours.pending]: (state, action) => {
            state.loading = true;
        },
        [searchTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.tours = action.payload
           
        },
        [searchTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getToursByTag.pending]: (state, action) => {
            state.loading = true;
        },
        [getToursByTag.fulfilled]: (state, action) => {
            state.loading = false;
            state.tagTours = action.payload
           
        },
        [getToursByTag.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [getRelatedTours.pending]: (state, action) => {
            state.loading = true;
        },
        [getRelatedTours.fulfilled]: (state, action) => {
            state.loading = false;
            state.relatedTours = action.payload
           
        },
        [getRelatedTours.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload.message;
        },
        [likeTour.pending]: (state, action) => {
            
        },
        [likeTour.fulfilled]: (state, action) => {
            state.loading = false;
            console.log("action", action);
            const {arg} = action.meta;
            if(arg._id){
                state.tours = state.tours.map((item)=> item._id === arg._id ? action.payload: item);
            }
        },
        [likeTour.rejected]: (state, action) => {
            state.error = action.payload.message;
           
        }
               

    }
});
export default tourSlice.reducer;
export const {setCurrentPage} = tourSlice.actions;










