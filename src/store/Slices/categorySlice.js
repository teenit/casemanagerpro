import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { serverAddres } from '../../components/Functions/serverAddres';

// Створюємо початковий стан
const initialState = {
  data: null,
  loading: false,
  error: null,
};

// Створюємо асинхронну дію для завантаження даних з сервера за допомогою Axios
export const fetchData = createAsyncThunk(
  'data/fetchData',
  async () => {
    try {
      const response = await axios.post(serverAddres("manage/get-all-categories.php"));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// Створюємо Slice
const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    // Інші синхронні дії для зміни стану
  },
  extraReducers: {
    [fetchData.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchData.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [fetchData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

// Експортуємо редуктор
export default categorySlice.reducer;
