import { useDispatch } from 'react-redux';
import store from "../redux/store";

type AppDispatch = typeof store.dispatch

export const useTypedDispatch = () => useDispatch<AppDispatch>()
