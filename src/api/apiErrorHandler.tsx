import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const handleApiErrors = (err: AxiosError | Error | unknown) => {
  // No server response
  if (err instanceof AxiosError) {
    if (!err?.response) {
      toast.error("Error");
      return;
    } else {
      const e: any = err;
      if (e?.response?.data) {
        toast.error(e?.response?.data);
      } else if (e?.message) {
        toast.error(e.message);
      } else {
        toast.error("Error");
      }
    }
  } else {
    toast.error("Error");
  }
};
