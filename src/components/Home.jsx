/* eslint-disable react-hooks/exhaustive-deps */

/**
 * apa itu axios. axios adalah library http yang digunakan untuk konek ke API
 */

/**
 * apa itu dompurify. dompurify adalah library untuk mengamankan return dari database sek berupa html.
 * contoh disini adalah content. karena content adalah hasil inputan dari wysiwyg yang dimana data nya yang sebenernya adalah HTML
 * 
 * diamankan dari apa? dari XSS. 
 * XSS apaan lagi dah
 * XSS adalah singkatan dari Cross-Site Scripting, (X dibaca cross), maksudnya serangan berupa script sisipan yang ada dalam inputan. biasane script JS. nah dompurify ini ngilangin script script js e itu tadi ben aman
 */


import axios from "axios";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

const Home = () => {
    const [articles, setArticles] = useState([]);

    /**
     * UseEffect
     * ini fungsi bawaan react. gunane buat melihat perubahan pada state atau pada component, kalau ada perubahan maka akan menjalankan fungsi didalem nya
     * nah karena ini ga melihat perubahan pada suatu state, maka akan otomatis dijalankan ketika component di render / di panggil
     */
    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get('http://localhost:3001/articles');
              console.log(response.data.data);
              
              setArticles(response.data.data);  
            } catch (err) {
              console.log(err);
            }
          };
          console.log(articles);
          
          fetchData();
      }, []);
    return(
        <>
            <Navbar />
            <div className="flex gap-2">

            {
                /**
                 * articles.map
                 * 
                 * articles kan variabel sek nampung data semua article dari BE
                 * nah map ini fungsinya buat mapping. 
                 * atau mempetakan data data nya, cara kerja nya data arraynya dilooping, dan setiap data di dalem e akan di simpan pada variabel article.
                 * (article, index) => variabel article isi nya setiap data dari loopingan. index ya index nya. dimulai dari 0 yaa
                 */
                articles.map((article, index) => (
                    <div className="p-2 bg-slate-200 rounded-lg min-w-1/4 w-1/4"  key={index}>
                        <p className="text-lg font-semibold">{article.title}</p>
                        <div className="" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }}/>
                    </div>
                ))
            }
            </div>
        </>
    )
}

export default Home;