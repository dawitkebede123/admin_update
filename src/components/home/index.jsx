import React, { useState,useEffect } from 'react';
import { useAuth } from '../../contexts/authContext';
import './style.css'; // Import your CSS file for styling
import { getDatabase, ref, get } from "firebase/database";
import firebase from 'firebase/compat/app';
import { Link } from 'react-router-dom';
// import './searchField.js'
import './dataSearch.js'
import MyComponent from './dataSearch.js';
import { ChakraProvider, Input } from '@chakra-ui/react'
// import RegistrationForm from './register.jsx';


const SearchField = () => {

    const [value,setValue] = useState('')
    const [result,setResult] = useState([])

 useEffect(()=>{
    if(value.length>0){
        fetch('https://chamber-60982-default-rtdb.firebaseio.com/Query10',
            ).then(
            response => response.json()            
        ).then(responseData=>{
            // setResult([]);
            let searchQuery = value.toUpperCase();
            for(const key in responseData){
                let business = responseData[key]["Account Name"];
                if(business.slice(0,searchQuery.length).indexOf(searchQuery) !== -1){
                    setResult(prevResulle =>{
                        return [...prevResulle,responseData[key]["Account Name"]]
                    })
                }
            }
        }).catch(error=>{
            console.log(error);
        })
    }else{
        setResult([])
    }
  },[value])  

    let [almanacArray, setAlmanacArray] = useState([]);

    let [dataArray,setDataArray] = useState()
      const { currentUser } = useAuth();
      const [searchTerm, setSearchTerm] = useState(''); // State for search term
    
      const fetchBusiness = async () => {
        const db = getDatabase(firebase);
        const dbRefBusiness = ref(db, "Query10")
        .orderByChild('Account Name')
        .startAt(searchTerm.toUpperCase())
        .endAt(searchTerm + '\uffff')
        .limitToFirst(5)
        .once('value')
        .then((snapshot) => _mapSnapshotToCompanyList(snapshot.val()));
        const snapshot = await get(dbRefBusiness);
        if(snapshot.exists()) {
            setBusinessArray(Object.values(snapshot.val()))
        // setDataArray()
    
        //   setFruitArray(Object.values(snapshot.val()));
        } else {
          alert("error");
        }
      }
    
      const fetchAlmanac = async (searchTerm) => {
        const db = getDatabase(firebase);
        const dbRefAlmanac = ref(db, "Almanac")
        .orderByChild('Account Name')
        .startAt(searchTerm.toUpperCase())
        .endAt(searchTerm + '\uffff')
        .limitToFirst(5)
        .once('value')
        .then((snapshot) => _mapSnapshotToCompanyList(snapshot.val()));
        
        const snapshot = await get(dbRefAlmanac);
        if(snapshot.exists()) {
            setAlmanacArray(Object.values(snapshot.val()))
        //   setFruitArray(Object.values(snapshot.val()));
        } else {
          alert("error");
        }
      }   
    let [businessArray, setBusinessArray] = useState([
        // {
        //     "companyName":'new',
        //     "tel":'000'
        // },
        // {
        //     "companyName":'new',
        //     "tel":'000'
        // },
        // {
        //     "companyName":'new',
        //     "tel":'000'
        // }
        // // 'dawit','kebede','dsd'
    ]);



    const _mapSnapshotToCompanyList = (data) => {
        // Handle both Map and List data structures (similar to Flutter code)
        if (typeof data === 'object' && !Array.isArray(data)) {
          return Object.values(data);
        } else if (Array.isArray(data)) {
          return data;
        } else {
          console.error('Unexpected  // ... existing code')
        }
    }
        
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // fetchAlmanac();
    // fetchBusiness();
    // Add your search logic here, e.g., filtering data based on searchTerm
  };

  return (
    <ChakraProvider>

    
    <div className='global-container'>

    
    <div className="home-container"> {/* Container for overall layout */}
      <div className="greeting">
        <p className="text-2xl font-bold pt-14" id='welcome_text'>
          Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}
        </p>
      </div>

      <div>

      </div>
      {/* <div className="grid_layout"> */}
      <div className=""> {/* Search bar container */}
      <MyComponent/>
      </div>
      {/* <div>
      <button className='register_btn' >
        <Link to="/register_company">

        Register New company

        </Link>
      </button>
      </div> */}
      {/* </div> */}
     
      
    </div>
    
    </div>
    </ChakraProvider>
  );
};

export default SearchField;
