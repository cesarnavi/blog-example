import Header from "@/components/Header";
import NetworkStatusBar from "@/components/NetworkStatusBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => { //Checking service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  return <div className={`flex flex-col justify-between font-sans`}>
      <NetworkStatusBar />
      <Header />
      <Component {...pageProps} />
    </div>
   

  
}
