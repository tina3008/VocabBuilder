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

export const allWords = createAsyncThunk(
  "words/all",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/words/all");
      console.log(response.data);
      
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
  async ({ id, en, ua, category, isIrregular }, thunkAPI) => {
    try {
      const response = await axios.patch(`/words/edit/${id}`, {
        en,
        ua,
        category,
        isIrregular,
      });

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
      console.log("stat=", response.data.totalCount);
      
      return response.data.totalCount;
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
