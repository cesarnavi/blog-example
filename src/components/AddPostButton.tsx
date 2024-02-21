import { useState } from "react"

export default function AddPostButton({
    disabled
}: {disabled: boolean}){

    const [modalOpen, setModalOpen] = useState(false);

    const handleClick = ()=>{
        if(modalOpen){
            return;
        }
        setModalOpen(true);
    }

    return <>
        <button
          disabled={disabled}
          onClick={handleClick}
          className="w-24  disabled:cursor-not-allowed border text-sm rounded-xl p-1 border-gray-600 flex gap-1 text-gray-900 dark:text-white"
        >
        <svg 
          width={28} 
          height={28} 
          viewBox="0 0 64 64" 
          xmlns="http://www.w3.org/2000/svg"
          strokeWidth={3} 
          className="h-6 w-6 "
          stroke="currentColor"
          fill="none"
        >
            <path d="M55.5,23.9V53.5a2,2,0,0,1-2,2h-43a2,2,0,0,1-2-2v-43a2,2,0,0,1,2-2H41.64"/>
            <path d="M19.48,38.77l-.64,5.59a.84.84,0,0,0,.92.93l5.56-.64a.87.87,0,0,0,.5-.24L54.9,15.22a1.66,1.66,0,0,0,0-2.35L51.15,9.1a1.67,1.67,0,0,0-2.36,0L19.71,38.28A.83.83,0,0,0,19.48,38.77Z"/>
            <line x1="44.87" y1="13.04" x2="50.9" y2="19.24"/>
        </svg>
            Escribir
        </button>
    </>
}