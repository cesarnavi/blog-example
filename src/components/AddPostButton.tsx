import React, { ReactNode, useState } from "react"
import axios from "axios";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";

function Modal({
    onClose,
    children
}: {onClose: ()=>void, children: ReactNode}){
    return <div
    className="fixed flex flex-col z-50 bottom-[100px] top-0 right-0  left-0 sm:top-auto sm:right-5 sm:left-auto h-[calc(100%-95px)] w-full sm:w-[450px] overflow-auto min-h-[250px] sm:h-[600px] border border-gray-300 bg-white dark:bg-gray-800 shadow-2xl rounded-md"
    >
        <div className="flex p-5 flex-col justify-center items-center h-20">
            <h3 className=" text-lg text-black dark:text-white">Añadir Entrada</h3>
        </div>
        <div className="flex-grow p-4"> 
            {
                children
            }
        </div>

    </div>
}

export default function AddPostButton({
    disabled
}: {disabled: boolean}){

    const [modalOpen, setModalOpen] = useState(false);
    const router = useRouter();
    const { mutate } = useSWRConfig()

    const handleClick = ()=>{
        if(modalOpen){
            return;
        }
        setModalOpen(true);
    }

    const handleSubmit = async(e: any)=>{
        e.preventDefault();
        if(disabled){
            window.alert("No cuenta con conexion a internet");
            return;
        }
        //TODO: do ome validations
        try{
            await axios.post("/api/posts",{
                    title: e.target?.title?.value,
                    author: e.target.author.value,
                    body: e.target.body.value
                }
            );
            mutate("/api/posts")
            setModalOpen(false);
            
        }catch(e:any){
            let msg = e?.response?.data?.message ||  e.message || "Contacate a soporte"
            window.alert("Error guardando entrada: " + msg)
        }
    }

    return <>
        {
            modalOpen && <Modal onClose={()=>setModalOpen(false) }>
                <form
                    onSubmit={handleSubmit}
                
                    id="form"
                    className="text-black text-sm text-left"
                >
                    <div className="mb-4">
                        <label
                        htmlFor="title"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                            Titulo
                        </label>
                        <input
                        type="text"
                        name="name"
                        id="title"
                        placeholder="Titulo entrada"
                        required
                        className="w-full px-3 py-2 bg-white placeholder-gray-300 border border-gray-300 rounded-md "
                        />
                    </div>
                    <div className="mb-4">
                        <label
                        htmlFor="author"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                            Autor
                        </label>
                        <input
                        type="text"
                        name="author"
                        id="author"
                        placeholder="Ej. Juan Perez"
                        required
                        className="w-full px-3 py-2 bg-white placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none"
                        />
                    </div>                    
                    <div className="mb-4">
                    <label
                        htmlFor="body"
                        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                            Contenido
                        </label>
                    <textarea
                        rows={8}
                        name="body"
                        id="body"
                        placeholder="Lorem ipsum..."
                        className="w-full  px-3 py-2 bg-white placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none "
                        required
                    ></textarea>
                    </div>
                    <div className="mb-3">
                    <button
                        type="submit"
                        className="w-full px-3 py-4 text-white bg-green-600 focus:bg-green-600 rounded-lg focus:outline-none"
                    >
                        Publicar
                    </button>
                    <button
                        onClick={()=>setModalOpen(false)}
                        type="button"
                        className="mt-2 w-full px-3 py-4 text-white bg-gray-400 rounded-lg"
                    >
                        Cerrar
                    </button>
                    </div>
                </form>
            </Modal>
        }
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