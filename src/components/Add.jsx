
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import Navbar  from './Navbar.jsx'
import Section  from './Section.jsx'
import InputFile  from './InputFile.jsx'
import axios from "axios";
const Add = () => {

  /**
   * Ini namanya state management
   * State : data / informasi yang bisa berubah ubah
   * 
   * contoh : const [value, setValue] = useState('');
   * key "value" menunjukan variabel yang menyimpan data
   * key "setValue" adalah fungsi yang digunakan untuk mengubah data dari variabel value
   * 
   * FAQ
   * Q: kenapa ga lansung pake variabel biasa kayak let value?
   * A: kalau pake let aja ga jadi react namanya. dan rawan terjadi kebingungan dimana sih data nya diubah 
   *    dan ketika dipake buat data di component itu rada riskan ambigu antara data parent dengan data children
   * 
   * Q: kapan make nya?
   * A: ketika kmu butuh variable yang dipake secara global pada component ini. dan juga bisa dipake ketika butuh data yang dilempar ke component lain
   */
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [images, setImages] = useState(null);
  // =======================================================================================================================================

  // Settingan toolbar wysiwyg
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" }
      ],
      ["clean"],
      [{ align: [] }, { color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
    ],
  };
  // ==========================================================================================================================================

  // fungsi nge set gambar
  const handleFileSelect = (file) => {
    setImages(file);
  };


  // fungsi neg set judul
  const handleInputTitle = (e) => {
    setTitle(e.target.value)
  }

  /**
   * APA ITU ASYNC
   * 
   * async = asynchronous
   * artinya fungsi bisa dijalankan bebarengan dengan fungsi yang lain.
   * maksudnya biasanya code akan dibaca dari atas ke bawah. jadi kalau ada 2 fungsi. maka fungsi ke 2 dijalankan setelah fungsi pertama selesai
   * nahh kadang kita butuh jalanin suatu fungsi tp ga mengganggu fungsi lain
   * 
   */
  const saveData = async () => {

    // oiya, if kalau cuma jalanin 1 kegiatan buat hasil nya maka bisa di tulis 1 line gini
    if(!images) return alert('please input images first!');

    /** 
     * sebener nya kirim data ke api ga harus pake formData, bisa langsung object json. tapi karena ini ngirim file sekalian maka perlu formData
     * contoh : formData.append('file', images);
     * key "file" di sesuaikan dengan kebutuhan dr BE
     */
    const formData = new FormData();
    formData.append('file', images);
    formData.append('title', title);
    formData.append('content', value);

    try {
      /**
       * PENJELASAN AWAIT
       * await ki pasangan e async
       * digunakan ben fungsi sek didalam fungsi ascyn bisa di pending dan menunggu fungsi await ini selesai dulu
       */
      const response = await axios.post('http://localhost:3000/articles', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response);
      
    } catch (error) {
      console.log(error);
      
    }
  }


  return (
    <>
      <Navbar />
      <Section >
        <p className="text-2xl font-semibold">Tambah Article</p>
        <div className="mt-8 flex flex-col gap-2">
          <div className="py-2 flex flex-col gap-2">
            <label className="text-xl font-semibold" htmlFor="">Add Image</label>
            <InputFile onFileSelect={handleFileSelect} />
          </div>
          <div className="py-2 flex flex-col gap-2">
            <label className="text-xl font-semibold" htmlFor="">Title</label>
            <input type="text" className="w-full border-2 border-slate-300 focus:outline-none focus:border-primary transition-colors p-4 rounded-lg"  placeholder="Input title" onChange={handleInputTitle}/>
          </div>
          <div className="py-2 flex flex-col gap-2 overflow-scroll h-64">
            <label className="text-xl font-semibold" htmlFor="">Content</label>
            <ReactQuill modules={modules} placeholder="Start typing..." theme="snow" value={value} onChange={setValue} className="h-36"/>
          </div>
          <button className="w-fit px-8 py-4 border-none bg-primary text-white font-semibold rounded-lg ml-auto" onClick={saveData} >Simpan</button>
        </div>

      </Section>
    </>
  )
}
export default Add;