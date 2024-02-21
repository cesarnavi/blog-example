import type { NextApiRequest, NextApiResponse } from "next";
import { Post } from "@/types/Post";

const posts = [
  {
    id: 1,
    path: "como-hacer-pruebas",
    title: "Bienvenido al blog de prueba",
    slug: "Como realizar un codigo eficiente en nodeJS",
    author: "Cesar Castillo",
    thumbnail: "https://static-cse.canva.com/blob/1358487/1600w-wlXEWqHuexQ.jpg",
    created_at: "2024-01-19",
    body: `Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final.
    Aunque no posee actualmente fuentes para justificar sus hipótesis, el profesor de filología clásica Richard McClintock asegura que su uso se remonta a los impresores de comienzos del siglo xvi.1​ Su uso en algunos editores de texto muy conocidos en la actualidad ha dado al texto lorem ipsum nueva popularidad.
    El texto en sí no tiene sentido aparente, aunque no es aleatorio, sino que deriva de un texto de Cicerón en lengua latina, a cuyas palabras se les han eliminado sílabas o letras. El significado del mismo no tiene importancia, ya que solo es una demostración o prueba. El texto procede de la obra De finibus bonorum et malorum (Sobre los límites del bien y del mal) que comienza con:`
  },
  {
    id: 2,
    path: "prueba-2",
    title: "Prueba 2",
    slug: "Como realizar un codigo eficiente en nodeJS",
    author: "Juan Perez",
    thumbnail: "https://static-cse.canva.com/blob/1358487/1600w-wlXEWqHuexQ.jpg",
    created_at: "2024-01-20",
    body: `Existen múltiples variantes del texto original, algunas casi sin parecido con él. Estas versiones incluyen letras adicionales que no son comunes en latín (como la k, w y z) o palabras sin sentido como zzril, takimata y gubeergren que intentan hacer la distribución aún más parecida al inglés.

    Varios editores de texto proveen la funcionalidad de generación de lorem ipsum.`
  },
  {
    id: 3,
    path: "prueba-2",
    title: "Prueba 2",
    slug: "Como realizar un codigo eficiente en nodeJS",
    author: "Juan Perez",
    thumbnail: "https://static-cse.canva.com/blob/1358487/1600w-wlXEWqHuexQ.jpg",
    created_at: "2024-01-20",
    body: `Existen múltiples variantes del texto original, algunas casi sin parecido con él. Estas versiones incluyen letras adicionales que no son comunes en latín (como la k, w y z) o palabras sin sentido como zzril, takimata y gubeergren que intentan hacer la distribución aún más parecida al inglés.

    Varios editores de texto proveen la funcionalidad de generación de lorem ipsum.`
  },
    {
      id: 4,
      path: "prueba-2",
      title: "Prueba 2",
      slug: "Como realizar un codigo eficiente en nodeJS",
      author: "Juan Perez",
      thumbnail: "https://static-cse.canva.com/blob/1358487/1600w-wlXEWqHuexQ.jpg",
      created_at: "2024-01-20",
      body: `Existen múltiples variantes del texto original, algunas casi sin parecido con él. Estas versiones incluyen letras adicionales que no son comunes en latín (como la k, w y z) o palabras sin sentido como zzril, takimata y gubeergren que intentan hacer la distribución aún más parecida al inglés.
  
      Varios editores de texto proveen la funcionalidad de generación de lorem ipsum.`
    }
  
]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<Post>>,
) {
  res.status(200).json(posts);
}
