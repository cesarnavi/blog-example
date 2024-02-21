import { useEffect, useState } from "react"

export default function useTheme(){

    const [theme,_] = useState("")

    useEffect(()=>{
        if (localStorage.getItem("theme") === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            setTheme("dark")
            document.documentElement.classList.add('dark')
          } else {
            setTheme("light")
            document.documentElement.classList.remove('dark')
          }
    },[]);

    const setTheme =(t:string)=>{
      _(t);
      localStorage.setItem("theme", t);
      if(t == "dark"){
        document.documentElement.classList.add('dark')
      }else{
        document.documentElement.classList.remove('dark')
      }
    }

    return {
      theme,
      setTheme
    }
}