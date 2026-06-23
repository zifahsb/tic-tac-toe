import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import List from "./List";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // Mengambil Data
    axios.get("http://localhost:3000/contacts")
      .then((res) => {
        setContacts(res?.data ?? []); // Return Array jika data api kosong
      })
      .catch((error) => {
        console.error(error);
        setContacts([]);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* Menggunakan logo online agar tidak error */}
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" 
          className="App-logo" 
          alt="logo" 
        />
        <p>DAFTAR KONTAK</p>
        
        {/* Menambahkan div dengan lebar tertentu agar rapi seperti di modul */}
        <div style={{ width: '300px' }}>
          <List data={contacts} />
        </div>
      </header>
    </div>
  );
}

export default App;