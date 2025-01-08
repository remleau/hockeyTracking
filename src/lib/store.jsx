import { configureStore } from "@reduxjs/toolkit";

import settingsReducer from "@/lib/slices/settingsSlice";
import arenaReducer from "@/lib/slices/arenaSlice";

export default configureStore({
  reducer: {
    settings: settingsReducer,
    arena: arenaReducer,
  },
});
