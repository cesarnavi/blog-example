import { useState, useEffect } from "react";
export default function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);
    const [reconnected, setReconnected] = useState(false);
    useEffect(() => {
      function handleOnline() {
        setReconnected(true);
        setIsOnline(true);
      }
      function handleOffline() {
        setIsOnline(false);
      }

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }, []);

    useEffect(()=>{
      if(reconnected){
        setTimeout(()=>{
          setReconnected(false);
        },5_000); 
      }
    },[reconnected]);

    return { isOnline, reconnected };
  }