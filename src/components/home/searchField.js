// import React, { useState, useEffect, useRef } from 'react';
// import { useAuth } from '../../contexts/authContext'; // Assuming this context provides user information
// import {firebase} from 'firebase'; // Assuming you have Firebase configured

// import './searchField.css'; // Import your CSS file for styling

// const SearchField = () => {
//   const { currentUser } = useAuth();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(1); // Default filter option
//   const [history, setHistory] = useState([]);
//   const maxHistoryLength = 10;

//   const searchControllerRef = useRef(null); // Reference to the search input

//   useEffect(() => {
//     const handleSearchChange = () => {
//       if (!searchTerm) {
//         setSearchResults([]);
//         setShowFilter(false);
//         return;
//       }

//       // Implement your search logic based on selectedValue (e.g., filter by category)
//       const filteredSearch = () => {
//         if (selectedValue === 1) {
//           // Search both business and almanac
//           return firebase.database()
//             .ref('Query10')
//             .orderByChild('Account Name')
//             .startAt(searchTerm.toUpperCase())
//             .endAt(searchTerm + '\uffff')
//             .limitToFirst(15)
//             .once('value')
//             .then((snapshot) => {
//               const businessResults = _mapSnapshotToCompanyList(snapshot.val());
//               // Combine results from almanac (if needed)
//               return businessResults;
//             });
//         } else if (selectedValue === 2) {
//           // Search business directory
//           return firebase.database()
//             .ref('Query10')
//             .orderByChild('Account Name')
//             .startAt(searchTerm.toUpperCase())
//             .endAt(searchTerm + '\uffff')
//             .limitToFirst(5)
//             .once('value')
//             .then((snapshot) => _mapSnapshotToCompanyList(snapshot.val()));
//         } else if (selectedValue === 3) {
//           // Search almanac directory
//           return firebase.database()
//             .ref('Almanac')
//             .orderByChild('Account Name')
//             .startAt(searchTerm.toUpperCase())
//             .endAt(searchTerm + '\uffff')
//             .limitToFirst(5)
//             .once('value')
//             .then((snapshot) => _mapSnapshotToCompanyList(snapshot.val()));
//         }
//       };

//       filteredSearch().then((results) => {
//         setSearchResults(results);
//         setShowFilter(false); // Reset filter visibility on search
//       });
//     };

//     searchControllerRef.current.addEventListener('change', handleSearchChange);

//     return () => {
//       searchControllerRef.current.removeEventListener('change', handleSearchChange);
//     };
//   }, [searchTerm, selectedValue]);

//   useEffect(() => {
//     const loadSearchHistory = async () => {
//       const prefs = await localStorage.getItem('search_history') || []; // Use localStorage for React
//       setHistory(JSON.parse(prefs));
//     };

//     const saveSearchHistory = async () => {
//       const updatedHistory = history.slice(0, maxHistoryLength); // Limit history length
//       localStorage.setItem('search_history', JSON.stringify(updatedHistory));
//     };

//     loadSearchHistory();

//     return () => saveSearchHistory();
//   }, [history, maxHistoryLength]);

//   const _onSearchChanged = () => {
//     setSearchTerm(searchControllerRef.current.value);
//   };

//   const _onFilterClicked = () => {
//     setShowFilter(!showFilter);
//   };

//   const _updateSearchHistory = (term) => {
//     const updatedHistory = history.filter((t) => t !== term);
//     updatedHistory.unshift(term);
//     setHistory(updatedHistory);
//     saveSearchHistory(); // Call save function from useEffect
//   };

//   const _mapSnapshotToCompanyList = (data) => {
//     // Handle both Map and List data structures (similar to Flutter code)
//     if (typeof data === 'object' && !Array.isArray(data)) {
//       return Object.values(data);
//     } else if (Array.isArray(data)) {
//       return data;
//     } else {
//       console.error('Unexpected  // ... existing code')
//     }
//   const _buildSearchHistory = () => {
//     return history.length > 0 ? (
//       <ul>
//         {history.map((term) => (
//           <li key={term}>
//             <span>{term}</span>
//             <button onClick={() => _updateSearchHistory(term)}>Remove</button>
//           </li>
//         ))}
//       </ul>
//     ) : null;
//   };

//   const _buildSearchTextField = () => (
//     <div className="search-input">
//       <input
//         ref={searchControllerRef}
//         type="text"
//         placeholder="Search companies"
//         value={searchTerm}
//         onChange={_onSearchChanged}
//       />
//       <button onClick={() => setShowFilter(!showFilter)}>
//         <i className="fas fa-filter"></i> {/* Assuming you have Font Awesome icons */}
//       </button>
//     </div>
//   );

//   const _buildFilter = () => (
//     <div className="filter-container">
//       <form>
//         <fieldset>
//           <legend>Filter By:</legend>
//           <div className="filter-options">
//             <label>
//               <input
//                 type="radio"
//                 name="filter"
//                 value={1}
//                 checked={selectedValue === 1}
//                 onChange={(e) => setSelectedValue(parseInt(e.target.value))}
//               />
//               Both
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="filter"
//                 value={2}
//                 checked={selectedValue === 2}
//                 onChange={(e) => setSelectedValue(parseInt(e.target.value))}
//               />
//               Business
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="filter"
//                 value={3}
//                 checked={selectedValue === 3}
//                 onChange={(e) => setSelectedValue(parseInt(e.target.value))}
//               />
//               Almanac
//             </label>
//           </div>
//         </fieldset>
//       </form>
//     </div>
//   );

//   const _buildSearchResults = () => (
//     <div className="search-results">
//       {searchResults.length > 0 ? (
//         <ul>
//           {searchResults.map((company) => (
//             <li key={company.id || company.Account_Name}>
//               <a
//                 href="#"
//                 onClick={() => {
//                   const companyDetailPage =
//                     company.Category === 'business'
//                       ? CompanyDetail
//                       : CompanyDetailAlmanac; // Assuming these components exist
//                   // Implement navigation logic using a library like React Router
//                 }}
//               >
//                 {company['Account Name']}
//               </a>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No companies found.</p>
//       )}
//     </div>
//   );

//   return (
//     <div className="search-field">
//       {_buildSearchHistory()}
//       {_buildSearchTextField()}
//       {showFilter && _buildFilter()}
//       {searchResults.length > 0 && _buildSearchResults()}
//     </div>
//   );
// };

//   // }
// }
// export default SearchField;

