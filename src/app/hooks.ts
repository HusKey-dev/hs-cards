import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// export const useDatedDispatch = () => ({...action.payload, date: new Date()
//     		.toLocaleString("ru", {
//     			day: "numeric",
//     			month: "2-digit",
//     			year: "numeric",
//     			hour: "numeric",
//     			minute: "2-digit",
//     		})
//     		.replaceAll(".", "/") }) => (action, extra) => useDispatch<AppDispatch>();

//             const a = (func)  => func
