import { useAppDispatch } from "../app/hooks";

// export const useDateDispatch = () => (actionCreator: any)=>{
//     const dispatch = useAppDispatch();
//     const date: string = new Date()
// 		.toLocaleString("ru", {
// 			day: "numeric",
// 			month: "2-digit",
// 			year: "numeric",
// 			hour: "numeric",
// 			minute: "2-digit",
// 		})
// 		.replaceAll(".", "/");
//     return dispatch(actionCreator({...actionCreator.arguments, date}))
// }
