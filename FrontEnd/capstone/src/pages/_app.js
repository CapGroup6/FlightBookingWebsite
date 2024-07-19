import "@/styles/globals.css";
import { AuthProvider } from '../pages/Login/AuthContext';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
  <AuthProvider/>
}

