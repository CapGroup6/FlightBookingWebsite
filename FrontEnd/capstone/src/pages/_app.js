import "@/styles/globals.css";
import { AuthProvider } from '../pages/Login/AuthContext';  // Ensure this import path is correct

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>  
            <Component {...pageProps} />
    </AuthProvider>  // Closing tag of AuthProvider
  );
}
