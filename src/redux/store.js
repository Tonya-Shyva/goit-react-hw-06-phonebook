import { configureStore } from '@reduxjs/toolkit';
// import { contactsReducer } from './reduser';

// export const store = configureStore({
//   reducer: {
//     contacts: contactsReducer,
//   },
// });
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';
export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
