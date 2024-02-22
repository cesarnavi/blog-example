import Header from "@/components/Header";
import NetworkStatusBar from "@/components/NetworkStatusBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <div className={`flex h-screen flex-col justify-between font-sans`}>
      <NetworkStatusBar />
      <Header />
      <Component {...pageProps} />
    </div>
   

  
}
