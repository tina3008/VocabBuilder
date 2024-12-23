import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const fetchCategories = createAsyncThunk(
  "words/categories",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/words/categories");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchWords = createAsyncThunk(
  "words/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/words/all");
      console.log("response.data", response.data);
      
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchWordsOwn = createAsyncThunk(
  "words/fetchOwn",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/words/own");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const addWord = createAsyncThunk(
  "words/addWord",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post("/words/create", newContact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addWordId = createAsyncThunk(
  "words/addWordId",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post(`/words/add/${id}`, newContact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const deleteWord = createAsyncThunk(
  "words/deleteWord",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/words/delete/${id}}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const changeWord = createAsyncThunk(
  "words/changeWord",
  async ({ id, name, number }, thunkAPI) => {
    try {
      const response = await axios.patch(`/words/edit/${id}`, { name, number });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchStatistics = createAsyncThunk(
  "words/statistics",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/words/statistics");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "words/tasks",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/words/tasks");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAnswers = createAsyncThunk(
  "words/answers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/words/answers");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
