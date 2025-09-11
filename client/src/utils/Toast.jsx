import { toast } from "react-toastify";

export default function showToast(type, message) {
switch (type) {
    case "success":
      toast.success(message, { autoClose: 2000 });
      break;
    case "error":
      toast.error(message, { autoClose: 3000 });
      break;
    case "warn":
      toast.warn(message, { autoClose: 2500 });
      break;
    default:
      toast.info(message, { autoClose: 2500 });
      break;
  }
};
