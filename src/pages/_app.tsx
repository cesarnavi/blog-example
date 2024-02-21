import Header from "@/components/Header";
import NetworkStatusBar from "@/components/NetworkStatusBar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <main className="h-full">
    <NetworkStatusBar />
    <Header />
    <Component {...pageProps} />
  </main>
  
  
}
