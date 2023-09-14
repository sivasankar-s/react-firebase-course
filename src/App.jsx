import { useEffect, useState } from 'react'
import { Auth } from './components/Auth'
import { auth, db, storage } from './config/firebase'
import { collection, doc, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

function App() {
  
  const [movieList, setMovieList] = useState([]);

  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setisNewMovieOscar] = useState(false);

  const [updatedTitle, setUpdatedTitle] = useState("");

  const [fileUpload, setFileUpload] = useState(null);

  const movieCollectionRef = collection(db, "movies");

  const getMoviesList = async () => {
    try{
      const data = await getDocs(movieCollectionRef)
      const filteredData = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
      console.log(filteredData)
      setMovieList(filteredData)
    } catch(err) {
      console.error(err)
    }
  }

  const onSubmit = async () => {
    try {
      await addDoc(movieCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedOscar: isNewMovieOscar,
        userId: auth?.currentUser?.uid,
      })
      getMoviesList();
    } catch (err) {
        console.error(err)
    }
    
  }
  
  const deleteMovie = async (id) => {
      const movieDoc = doc(db, "movies", id)
      await deleteDoc(movieDoc);
    getMoviesList();
  }

  const updateMovie = async (id) => {
      const movieDoc = doc(db, "movies", id)
      await updateDoc(movieDoc, {title: updatedTitle});
    getMoviesList();
  }

  const uploadFile = async () => {
    if(!fileUpload) return;
    const fileFolderRef = ref(storage, `myFolder/${fileUpload.name}`)
    try {
      await uploadBytes(fileFolderRef, fileUpload);
    } catch(err){
      console.error(err);
    }
    
  }

  useEffect(() => {
    getMoviesList();
  }, [])
  
  

  return (
    <>
      <Auth />
      
      <div>
        <input placeholder='Title...' onChange={(e) => {setNewMovieTitle(e.target.value)}}/>
        <input placeholder='Release Date...' type='number' onChange={(e) => {setNewReleaseDate(Number(e.target.value))}}/>
        <label>Received Oscar: </label>
        <input type='checkbox' onChange={(e) => setisNewMovieOscar(e.target.checked)}/>
        <button onClick={onSubmit}>Submit</button>
      </div>

      <div>
        {movieList.map((movie) => (
          <div>
            <h1 style={{color: movie.receivedOscar ? "green" : "red"}}>{movie.title}</h1>
            <p>{movie.releaseDate}</p>
            <button onClick={() => (deleteMovie(movie.id))}>Delete</button>
            <input placeholder='new title' onChange={(e) => {setUpdatedTitle(e.target.value)}}/>
            <button onClick={() => (updateMovie(movie.id))}>Update</button>
          </div>

        ))}
      </div>

      <div>
        <input type='file' onChange={(e) => {setFileUpload(e.target.files[0])}}/>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </>
  )
}

export default App
