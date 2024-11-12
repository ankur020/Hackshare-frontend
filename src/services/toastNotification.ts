import toast from "react-hot-toast";

export const ToastSuccess = (message: string) =>
  toast.success(message, { duration: 5000 });

export const ToastError = (message: string) =>
  toast.error(message, { duration: 5000 });
