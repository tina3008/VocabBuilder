import toast, { Toaster } from "react-hot-toast";

export const showSuccess = ({ message }) => {
  toast(message, {
    style: {
      background: "var(--white)",
      color: "#3CBF61",
      borderColor: "#3CBF61",
    },
    position: "top-center",
  });
};

export const showError = ({ message }) => {
  toast(message, {
    style: {
      background: "var(--color_error)",
      color: "var(--white)",
    },
    position: "top-center",
  });
};

export const showInfo = ({ message }) => {
  toast(message, {
    style: { background: "white", color: "black" },
    position: "top-center",
  });
};