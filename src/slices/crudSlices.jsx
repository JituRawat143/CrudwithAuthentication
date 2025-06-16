import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import BaseUrl from '../baseURL/BaseUrl';

export const createEmployee = createAsyncThunk('createEmployee', async (data, { rejectWithValue }) => {
  const response = await fetch(BaseUrl + 'employeeData', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    return rejectWithValue(error.response);
  }
});

export const showEmployee = createAsyncThunk('showEmployee', async () => {
  const response = await fetch(BaseUrl + 'employeeData');
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const deleteEmployee = createAsyncThunk('deleteEmployee', async id => {
  const response = await fetch(BaseUrl + `employeeData/${id}`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify()
  });
  try {
    const result = response.json();
    console.log('result===' + result);

    return id;
  } catch (error) {
    console.log('error= ' + error);
  }
});

export const editEmployee = createAsyncThunk('editEmployee', async data => {
  const response = await fetch(BaseUrl + `employeeData/${data.id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(data)
  });
  try {
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
});

export const crudSlice = createSlice({
  name: 'employee',
  initialState: {
    employeeData: [],
    loading: false,
    error: null
  },

  
  extraReducers: builder => {
    //for show
    builder.addCase(showEmployee.pending, state => {
      state.loading = true;
    });
    builder.addCase(showEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employeeData = action.payload;
      state.error = '';
    });
    builder.addCase(showEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    //For Delete
    builder.addCase(deleteEmployee.pending, state => {
      state.loading = true;
    });
    builder.addCase(deleteEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employeeData = action.payload;
    });

    builder.addCase(deleteEmployee.rejected, (state, action) => {
      console.log('action.payload====' + action.payload);
      state.loading = false;
      state.error = action.payload;
    });
    //For create
    builder.addCase(createEmployee.pending, state => {
      state.loading = true;
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employeeData = action.payload;
      state.error = '';
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message || 'Failed to create store';
    });
    //Edit
    builder.addCase(editEmployee.pending, state => {
      state.loading = true;
    });
    builder.addCase(editEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.employeeData = action.payload;
    });
    builder.addCase(editEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  }
});
export default crudSlice.reducer;        
