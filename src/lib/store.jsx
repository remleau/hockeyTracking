import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "@/lib/slices/settingsSlice";

export default configureStore({
  reducer: {
    settings: settingsReducer,
  },
});
