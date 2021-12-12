import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Beranda from "./components/Beranda";
import Navbar from "./components/Navbar";
import ManajemenBuku from "./components/ManajemenBuku";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    retrieveData();
  }, []);

  function retrieveData(){
    axios
    .get("http://localhost:4000/book")
    .then((response) => {
      setBooks(response.data);
    })
    .catch(function (error){
      console.log(error);
    });
  }

  // <ManajemenBuku bookList={books} store={storeData} />

  function storeData(inputBook) {
    // console.log(inputBook);
    // alert("Data berhasil ditambahkan");
    axios
    .post("http://localhost:4000/book/add", inputBook)
    .then((res) => {
      setBooks((prevBooks) => [...prevBooks, inputBook]);
      alert("Data berhasil ditambahkan");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }
  function updateData(inputBook){
    // console.log(inputBook);
    // alert("Data Berhasil Diperbarui");
    axios
    .put("http://localhost:4000/book/update/" + inputBook._id, inputBook)
    .then((res) => {
      retrieveData();
      alert("Data berhasil diperbarui");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }
  function deleteData(book){
    // console.log(book);
    // alert("Data berhasil dihapus");
    axios
    .delete("http://localhost:4000/book/delete/" + book._id)
    .then(() => {
      retrieveData();
      alert("Data berhasil dihapus");
    })
    .catch((error) => {
      console.log(error.response.data);
    });
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Beranda  bookList={books}/>}/>

          <Route path="/manajemenBuku" element={<ManajemenBuku bookList={books} store={storeData} update={updateData} remove={deleteData}/>}/>
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
