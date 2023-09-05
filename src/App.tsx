import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { AppContent } from "./AppContent";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}
