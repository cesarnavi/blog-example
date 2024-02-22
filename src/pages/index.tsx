import { useState } from "react";
import { Post, FilterBy } from "@/types";
//Components
import Link from "@/components/Link";
import AddPostButton from "@/components/AddPostButton";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import axios from "axios";
import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Array<Post>, string>= (url:string)=>axios.get(url).then((res)=>res.data);

export default function Home() {
  const { data: posts } = useSWR("/api/posts",fetcher);
  const [search,setSearch] = useState("");
  const [filterBy,setFilterBy] = useState<FilterBy>("title");
  const { isOnline } = useNetworkStatus();

  return (
    <div className="h-screen bg-white dark:bg-gray-800 pb-12">

      {
        !isOnline && <h1>Solo podrá visualizar los elementos previamente guardados</h1>
      }
      {
        posts && posts?.length == 0 && <div 
          style={{alignItems: "center"}}
        className=" w-full text-center  justify-center flex flex-col text-xl  p-6 ">
          <div className="text-black dark:text-white py-2">
            Comience añadiendo un post
          </div>
           <AddPostButton disabled={isOnline==false} />
          </div>
      }

      <div className="grid xl:grid-cols-2 gap-2  mx-2 sm:mx-6 ">
        {posts && posts.length > 0  && <div style={{alignItems:"center"}} className="col-span-full p-2 flex">
          <div className="flex gap-2 " style={{alignItems: "center"}}>
            {/* Search icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 text-gray-900 dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            {/* Search Input */}
            <input 
              onChange={(e)=>setSearch(e.target.value)}  
              type="search" 
              placeholder="Buscar..."
              className="rounded-md p-2 border-2 dark:border-0 text-black "
            />
            <div className="flex ml-2"> 	
                <label htmlFor="filter-by" className="block mb-2 text-sm  text-gray-900 dark:text-gray-400">Filtrar por:</label>
                <select onChange={(e)=>setFilterBy(e.target.value as FilterBy)} defaultValue={"title"} id="filter-by" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" >
                <option value={"title"}>Titulo</option>
                <option value={"author"}>Autor</option>
                <option value={"body"}>Contenido</option>
              </select>
              </div>
          </div>
        </div>}
        { 
          posts && posts.filter((p)=>{
            if(filterBy && search){
              return p[filterBy]?.toLowerCase().includes(search.toLowerCase());
            }
            return true;
          }).map((p)=>{

            return <article key={p.slug} className=" bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-4 px-2 rounded-lg">
              {/* Author */}
              <h3 className="flex gap-1 text-gray-600 dark:text-gray-200 text-sm font-light">
              <svg width={20} height={20} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M12 22.01C17.5228 22.01 22 17.5329 22 12.01C22 6.48716 17.5228 2.01001 12 2.01001C6.47715 2.01001 2 6.48716 2 12.01C2 17.5329 6.47715 22.01 12 22.01Z" fill="#292D32"/>
                <path d="M12 6.93994C9.93 6.93994 8.25 8.61994 8.25 10.6899C8.25 12.7199 9.84 14.3699 11.95 14.4299C11.98 14.4299 12.02 14.4299 12.04 14.4299C12.06 14.4299 12.09 14.4299 12.11 14.4299C12.12 14.4299 12.13 14.4299 12.13 14.4299C14.15 14.3599 15.74 12.7199 15.75 10.6899C15.75 8.61994 14.07 6.93994 12 6.93994Z" fill="#292D32"/>
                <path d="M18.7807 19.36C17.0007 21 14.6207 22.01 12.0007 22.01C9.3807 22.01 7.0007 21 5.2207 19.36C5.4607 18.45 6.1107 17.62 7.0607 16.98C9.7907 15.16 14.2307 15.16 16.9407 16.98C17.9007 17.62 18.5407 18.45 18.7807 19.36Z" fill="#292D32"/>
              </svg>
                {p.author}
              </h3>
              {/* Title */}
              <h2 className="pt-2 text-2xl font-bold leading-8 tracking-tight">
                <Link
                    href={`/blog/${p.slug}`}
                 >
                  {p.title}
                </Link>
              </h2>
              {/* Body */}
              <p className="space-y-2 text-gray-500 dark:text-gray-300">
                {p.body && p.body.length > 70 ? p.body.substring(0,70) + "..."  : p.body}
              </p>
              {/* Details (date) */}
              <dl className="space-y-2">
                <dt className="sr-only">Fecha publicacion</dt>
                  <dd className="text-sm font-light leading-6 ">
                    Publicado <time dateTime={p.created_at}>{new Date(p.created_at).toLocaleDateString()}</time>
                  </dd>
              </dl>
            </article>
          })
        }
      </div>
    </div>
  )
}