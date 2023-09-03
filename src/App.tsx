import { ToastContainer } from "react-toastify";
import { AppContent } from "./AppContent";
import { AuthProvider } from "./hooks/authContext";
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
