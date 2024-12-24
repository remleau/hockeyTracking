import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import supabase from "@/lib/supabase";

// Async thunk to fetch settings
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (userId, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .select()
        .eq("id", userId);

      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to upsert settings
export const upsertSettings = createAsyncThunk(
  "settings/upsertSettings",
  async ({ userId, home_address, game_days }, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase
        .from("user_profiles")
        .upsert({
          id: userId,
          ...(home_address && { home_address }), // Include home_address only if it's valid
          ...(game_days && { game_days }), // Include game_days only if it's valid
        })
        .select();

      if (error) {
        throw error; // Handle Supabase error
      }

      return data[0];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    home_address: {},
    game_days: [],
    searchResult: "",
    status: "loading", // Loading status
    error: null, // Error state
  },
  reducers: {
    // setSearchQuery: (action, state) => {
    //   state.searchQuery = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      // Fetch settings
      .addCase(fetchSettings.pending, (state) => {
        state.status = "loading"; // Mark as loading
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.status = "succeeded"; // Mark as succeeded
        state.home_address = action.payload.home_address || {};
        state.game_days = action.payload.game_days || [];
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.status = "failed"; // Mark as failed
        state.error = action.payload;
      })
      // Upsert settings
      .addCase(upsertSettings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(upsertSettings.fulfilled, (state, action) => {
        state.searchResult = action.payload.home_address.place_name || "";
        state.status = "succeeded";
      })
      .addCase(upsertSettings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// export const { setSearchQuery } = settingsSlice.actions;

export default settingsSlice.reducer;
