import { StatesContextProvider } from "../context/StatesContext";
import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StatesContextProvider>
      <Component {...pageProps} />
    </StatesContextProvider>
  );
}

export default MyApp;
