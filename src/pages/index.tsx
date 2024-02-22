import { useEffect, useState } from "react";
import { Post, FilterBy } from "@/types";
//Components
import Link from "@/components/Link";
import AddPostButton from "@/components/AddPostButton";
import useNetworkStatus from "@/hooks/useNetworkStatus";
import axios from "axios";
import useSWR, { Fetcher } from "swr";
import useLocalStorage from "@/hooks/useLocalStorage";

const fetcher: Fetcher<Array<Post>, string> = (url: string) =>
  axios.get(url).then((res) => res.data);




export default function Home() {
  const { data, mutate } = useSWR("/api/posts", fetcher);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState<FilterBy>("title");
  const { isOnline } = useNetworkStatus();
  const [savedPosts, save] = useLocalStorage<any>("saved-posts", {});

  const posts = isOnline ? data :  (savedPosts ? Object.values(savedPosts) as [Post] : null)

  const handleDelete =(pId: string)=>axios.delete("/api/posts/"+pId).then(()=>{mutate()}).catch(()=>window.alert("Error eliminando elemento"))

  return (
    <div className="pb-12 h-screen bg-white dark:bg-gray-800">
      {!posts || (posts && posts.length == 0) && (
        <div
          style={{ alignItems: "center" }}
          className=" w-full text-center  justify-center flex flex-col text-xl  p-6 "
        >
          <div className="text-black dark:text-white py-2">
            Comience añadiendo un post
          </div>
          <AddPostButton disabled={isOnline == false} />
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 grid xl:grid-cols-2 gap-2  px-2 sm:px-6 w-full">
        {posts && posts.length > 0 && (
          <div
            style={{ alignItems: "center" }}
            className="col-span-full p-2 flex"
          >
            <div className="flex gap-2 " style={{ alignItems: "center" }}>
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
                onChange={(e) => setSearch(e.target.value)}
                type="search"
                placeholder="Buscar..."
                className="rounded-md p-2 border-2 dark:border-0 text-black "
              />
              <div className="flex ml-2">
                <label
                  htmlFor="filter-by"
                  className="block mb-2 text-sm  text-gray-900 dark:text-gray-400"
                >
                  Filtrar por:
                </label>
                <select
                  onChange={(e) => setFilterBy(e.target.value as FilterBy)}
                  defaultValue={"title"}
                  id="filter-by"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                >
                  <option value={"title"}>Titulo</option>
                  <option value={"author"}>Autor</option>
                  <option value={"body"}>Contenido</option>
                </select>
              </div>
            </div>
          </div>
        )}
        {posts &&
          posts
            .filter((p) => {
              if (filterBy && search) {
                return p[filterBy]
                  ?.toLowerCase()
                  .includes(search.toLowerCase());
              }
              return true;
            })
            .map((p) => {
              const saved = savedPosts[p?.id];
              return (
                <article
                  key={p.slug}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-4 px-2 rounded-lg"
                >
                  {/* Author & save button */}
                  <div className="flex flex-row justify-between">
                    <h3 className="flex gap-1 text-gray-600 dark:text-gray-200 text-sm font-light">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.4"
                          d="M12 22.01C17.5228 22.01 22 17.5329 22 12.01C22 6.48716 17.5228 2.01001 12 2.01001C6.47715 2.01001 2 6.48716 2 12.01C2 17.5329 6.47715 22.01 12 22.01Z"
                          fill="#292D32"
                        />
                        <path
                          d="M12 6.93994C9.93 6.93994 8.25 8.61994 8.25 10.6899C8.25 12.7199 9.84 14.3699 11.95 14.4299C11.98 14.4299 12.02 14.4299 12.04 14.4299C12.06 14.4299 12.09 14.4299 12.11 14.4299C12.12 14.4299 12.13 14.4299 12.13 14.4299C14.15 14.3599 15.74 12.7199 15.75 10.6899C15.75 8.61994 14.07 6.93994 12 6.93994Z"
                          fill="#292D32"
                        />
                        <path
                          d="M18.7807 19.36C17.0007 21 14.6207 22.01 12.0007 22.01C9.3807 22.01 7.0007 21 5.2207 19.36C5.4607 18.45 6.1107 17.62 7.0607 16.98C9.7907 15.16 14.2307 15.16 16.9407 16.98C17.9007 17.62 18.5407 18.45 18.7807 19.36Z"
                          fill="#292D32"
                        />
                      </svg>
                      {p.author}
                    </h3>
                     { !saved &&  <div onClick={()=>save({...savedPosts, [p.id]: p })} className="cursor-pointer" title="Guardar">
                        <svg
                            width={28}
                            height={28}
                            viewBox="0 0 24 24"
                            fill={"none"}
                            className="text-gray-900 dark:text-gray-100"
                            
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5.625 15C5.625 14.5858 5.28921 14.25 4.875 14.25C4.46079 14.25 4.125 14.5858 4.125 15H5.625ZM4.875 16H4.125H4.875ZM19.275 15C19.275 14.5858 18.9392 14.25 18.525 14.25C18.1108 14.25 17.775 14.5858 17.775 15H19.275ZM11.1086 15.5387C10.8539 15.8653 10.9121 16.3366 11.2387 16.5914C11.5653 16.8461 12.0366 16.7879 12.2914 16.4613L11.1086 15.5387ZM16.1914 11.4613C16.4461 11.1347 16.3879 10.6634 16.0613 10.4086C15.7347 10.1539 15.2634 10.2121 15.0086 10.5387L16.1914 11.4613ZM11.1086 16.4613C11.3634 16.7879 11.8347 16.8461 12.1613 16.5914C12.4879 16.3366 12.5461 15.8653 12.2914 15.5387L11.1086 16.4613ZM8.39138 10.5387C8.13662 10.2121 7.66533 10.1539 7.33873 10.4086C7.01212 10.6634 6.95387 11.1347 7.20862 11.4613L8.39138 10.5387ZM10.95 16C10.95 16.4142 11.2858 16.75 11.7 16.75C12.1142 16.75 12.45 16.4142 12.45 16H10.95ZM12.45 5C12.45 4.58579 12.1142 4.25 11.7 4.25C11.2858 4.25 10.95 4.58579 10.95 5H12.45ZM4.125 15V16H5.625V15H4.125ZM4.125 16C4.125 18.0531 5.75257 19.75 7.8 19.75V18.25C6.61657 18.25 5.625 17.2607 5.625 16H4.125ZM7.8 19.75H15.6V18.25H7.8V19.75ZM15.6 19.75C17.6474 19.75 19.275 18.0531 19.275 16H17.775C17.775 17.2607 16.7834 18.25 15.6 18.25V19.75ZM19.275 16V15H17.775V16H19.275ZM12.2914 16.4613L16.1914 11.4613L15.0086 10.5387L11.1086 15.5387L12.2914 16.4613ZM12.2914 15.5387L8.39138 10.5387L7.20862 11.4613L11.1086 16.4613L12.2914 15.5387ZM12.45 16V5H10.95V16H12.45Z" fill="#000000"/>
                        </svg>
                      </div>
                      }
                      { saved && <div onClick={()=>save({...savedPosts, [p.id]: undefined })} className="cursor-pointer" title="Remover">
                      <svg
                        width={28}
                        height={28}
                        viewBox="0 0 24 24"
                        fill={"none"}
                        className="text-gray-900 dark:text-gray-100"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path 
                          d="M12.0004 9.5L17.0004 14.5M17.0004 9.5L12.0004 14.5M4.50823 13.9546L7.43966 17.7546C7.79218 18.2115 7.96843 18.44 8.18975 18.6047C8.38579 18.7505 8.6069 18.8592 8.84212 18.9253C9.10766 19 9.39623 19 9.97336 19H17.8004C18.9205 19 19.4806 19 19.9084 18.782C20.2847 18.5903 20.5907 18.2843 20.7824 17.908C21.0004 17.4802 21.0004 16.9201 21.0004 15.8V8.2C21.0004 7.0799 21.0004 6.51984 20.7824 6.09202C20.5907 5.71569 20.2847 5.40973 19.9084 5.21799C19.4806 5 18.9205 5 17.8004 5H9.97336C9.39623 5 9.10766 5 8.84212 5.07467C8.6069 5.14081 8.38579 5.2495 8.18975 5.39534C7.96843 5.55998 7.79218 5.78846 7.43966 6.24543L4.50823 10.0454C3.96863 10.7449 3.69883 11.0947 3.59505 11.4804C3.50347 11.8207 3.50347 12.1793 3.59505 12.5196C3.69883 12.9053 3.96863 13.2551 4.50823 13.9546Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" 
                          strokeLinejoin="round"/>
                        </svg>
                      </div>
                      }
                  </div>

                  {/* Title */}
                  <h2 className=" text-2xl font-bold leading-8 tracking-tight">
                    <Link href={`/posts/${p.slug}`}>{p.title}</Link>
                  </h2>
                  {/* Body */}
                  <p className="space-y-2 text-gray-500 dark:text-gray-300">
                    {p.body && p.body.length > 70
                      ? p.body.substring(0, 70) + "..."
                      : p.body}
                  </p>
                  {/* Details (date) */}
                  <dl className="space-y-2 flex justify-between">
                    <div>
                    <dt className="sr-only">Fecha publicacion</dt>
                    <dd className="text-sm font-light leading-6 ">
                      Publicado{" "}
                      <time dateTime={p.created_at}>
                        {new Date(p.created_at).toLocaleDateString()}
                      </time>
                    </dd>
                    </div>
                    <div>
                      <p className="underline text-sm cursor-pointer" onClick={()=>handleDelete(p.id)}>Eliminar</p>
                    </div>
                  </dl>
                </article>
              );
            })}
      </div>
    </div>
  );
}
