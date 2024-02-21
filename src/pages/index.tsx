import { useEffect, useState } from "react";
import { Post } from "@/types/Post";
//Components
import Link from "@/components/Link";
import AddPostButton from "@/components/AddPostButton";
import useNetworkStatus from "@/hooks/useNetworkStatus";

export default function Home() {
  const [posts,setPosts] = useState<Post[]>();
  const { isOnline } = useNetworkStatus();

  useEffect(()=>{
    fetch("/api/posts")
    .then((res)=>res.json())
    .then((data)=>setPosts(data))
    .catch(()=>{
      //catched failed api call
    })
  },[]);


  return (
    <div className="h-screen bg-white dark:bg-gray-800">

      {
        !isOnline && <h1>Solo podrá visualizar los elementos previamente guardados</h1>
      }
      {
        posts && posts.length == 0 && <div 
          style={{alignItems: "center"}}
        className=" w-full text-center  justify-center flex flex-col text-xl  p-6 ">
          <div className="text-black dark:text-white py-2">
            Comience añadiendo un post
          </div>
           <AddPostButton disabled={isOnline==false} />
          </div>

      }

      <div className="grid xl:grid-cols-2 gap-2 ">
        { 
          posts && posts.map((p)=>{

            return <article key={p.slug} className=" bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-4 px-2">
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
                {p.body ? p.body.substring(0,70) + "..."  : ""}
              </p>
              {/* Details (date) */}
              <dl className="space-y-2">
                <dt className="sr-only">Fecha publicacion</dt>
                  <dd className="text-sm font-light leading-6 ">
                    <time dateTime={p.created_at}>{new Date(p.created_at).toLocaleDateString()}</time>
                  </dd>
              </dl>
            </article>
          })
        }
      </div>
    </div>
  )
}