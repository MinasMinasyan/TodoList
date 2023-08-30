import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';


export default function Tostify() {
    const errorMessage = useSelector((state) => state.tasksReducer.errorMessage);
    const successMessage = useSelector((state) => state.tasksReducer.successMessage);

    useEffect(()=>{
        if (errorMessage) {
            toast.error(errorMessage);
          }
          if (successMessage) {
            toast.success(successMessage);
          }

    },[errorMessage, successMessage])
    return (
    
        <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    )
    
}