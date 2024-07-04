import React, { useState, useEffect } from 'react';
import { json, useNavigate,Link } from 'react-router-dom';
// import { Link,useParams, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, query, orderByChild, startAfter, limitToFirst, get, endAt, equalTo, endBefore } from 'firebase/database';
import EditForm from './edit';
import './edit_form.css'; // Import your CSS file
import { ChakraProvider, Input } from '@chakra-ui/react'
const firebaseConfig = {
  apiKey: "AIzaSyAeHg32VjgFEPlnwQ1djM1krCQ3lz8GDUY",
  authDomain: "chamber-60982.firebaseapp.com",
  databaseURL: "https://chamber-60982-default-rtdb.firebaseio.com",
  projectId: "chamber-60982",
  storageBucket: "chamber-60982.appspot.com",
  messagingSenderId: "1037511136316",
  appId: "1:1037511136316:web:b7b7dbbb55478ec9ef1f39",
  measurementId: "G-WRCCQRZC52"

};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

function MyComponent() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
const handleClick = (item) => {
  let data = {
    name:item["Account Name"],
    tel:item['Tel'],
    mobile:item['Mobile'],
    email:item['Email'],
    website:item['Website'],
    sector:item['Sector'],
    sub_sector:item['Sub-Sector'],
    profile:item['Profile'],
    category:item['Category'],
    image:item['Image'],
    video:item['Video'],
    logo:item['logo']


  }
  // let data =JSON.stringify(item) 
  // console.log(data)
  const encodedData = encodeURIComponent(JSON.stringify(data));
    navigate(`/edit?data=${encodedData}`); // Navigate to About page on click
  };
  // Fetch data on component mount or search term change
  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        setSearchTerm(searchTerm.toUpperCase())
        try {
          const dataRef = ref(database, 'Query10'); 
          const dataRef_alamanac = ref(database,'Almanac')
  
          if (!searchTerm) {
            // No search term, set empty data
            setData([]);
            return;
          }
  
          const queryRef = query(dataRef, orderByChild('Account Name'),startAfter(searchTerm), limitToFirst(10)); // Replace 'searchField' with your actual searchable field
          const queryRef_Almanac = query(dataRef_alamanac, orderByChild('Account Name'),startAfter(searchTerm), limitToFirst(10)); // Replace 'searchField' with your actual searchable field 
          const snapshot = await get(queryRef);
          const snapshot_almanac  = await get(queryRef_Almanac)
          const fetchedData = snapshot.val() ? Object.values(snapshot.val()) : []; // Convert object to array
          const fetchData_almanac = snapshot_almanac.val() ? Object.values(snapshot_almanac.val()) : [];
          const searchData = [...fetchedData,...fetchData_almanac]
          setData(searchData);
          // console.log(fetchedData)
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchData();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <ChakraProvider>

   
    <div>
      <div className='grid_layout'>
        <div>
          
        <Input type="text" size={'lg'} value={searchTerm} onChange={handleSearchChange} placeholder="Search to manage" className='search_input'/>

        </div>
        <div>
        <button className='register_btn' >
        <Link to="/register_company">

        Register New company

        </Link>
      </button>
        </div>
  
      </div>
   
    {isLoading && <p>Loading data...</p>}
    {error && <p>Error: {error}</p>}
    {data.length > 0 && (
      <ul>
        {data.map((item) => (

          <li key={data['Account Name']}>
   
       <button onClick={()=>handleClick(item)}>{item["Account Name"]}</button> 
           </li> // Replace with your data fields
        ))}
      </ul>
    )}
    {searchTerm && data.length === 0 && !isLoading && (
      <p>No results found for "{searchTerm}"</p>
    )}
  </div>
  </ChakraProvider>
  );
}

export default MyComponent;
