import React, { useState, useRef } from 'react';
import './edit_form.css'; // Import your CSS file
import { initializeApp } from 'firebase/app';
import { getDatabase,remove,ref,set,push, query, orderByChild, startAfter, limitToFirst, get, endAt, equalTo, endBefore, update } from 'firebase/database';
import { Link,useParams,useLocation } from 'react-router-dom';
import { ChakraProvider, CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

import { getStorage,ref as mediaRef, uploadBytes,uploadBytesResumable, getDownloadURL } from 'firebase/storage';

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
const writeData = async (data) => {
  let inputData = {
    'Account Name':data.name,
    'Email': data.email,
    'Tel': data.tel,
    'Mobile':data.mobile,
    'Website':data.website,
    'Is-adv':data.image|| data.video|| data.logo!=null?'True':'False',
    'Image':data.image==null?'':data.image,
    'Profile':data.profile,
    'Sector':data.sector,
    'Sub-Sector':data.sub_sector,
    'Video':data.video==null?'':data.video,
    'Category':data.category,
    'logo':data.logo==null?'':data.logo,
    'status':'',
   };
  //  try {
    if(data.category=='business'){
      try {
        console.log('Fetching data by account name...');
        const queryRef = ref(database, 'Query10');
        const snapshot = await get(queryRef);
    
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const childKey in data) {
            if (data[childKey]['Account Name'] === inputData['Account Name']) {
              const dataRef = ref(database, `Query10/${childKey}`);
              // Delete the existing data (be cautious of data loss)
              await remove(dataRef);
              // Set the updated data at the same reference
              await set(dataRef, inputData);
              console.log('Data updated successfully!');
              break;
            }
          }
        } else {
          console.warn('Data with account name not found.');
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
    } 
    else{
      try {
        console.log('Fetching data by account name...');
        const queryRef = ref(database, 'Query10');
        const snapshot = await get(queryRef);
    
        if (snapshot.exists()) {
          const data = snapshot.val();
          for (const childKey in data) {
            if (data[childKey]['Account Name'] === inputData['Account Name']) {
              const dataRef = ref(database, `Almanac/${childKey}`);
              // Delete the existing data (be cautious of data loss)
              await remove(dataRef);
              // Set the updated data at the same reference
              await set(dataRef, inputData);
              console.log('Data updated successfully!');
              break;
            }
          }
        } else {
          console.warn('Data with account name not found.');
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
    
  // } catch (error) {
  //   console.error('Error writing data:', error);
  //   // Handle error appropriately
  // }
  }

  
  const handleDelete = async (data) => {
    let inputData = {
      'Account Name':data.name,
     
     };
    //  try {
      if(data.category=='business'){
        try {
          console.log('Fetching data by account name...');
          const queryRef = ref(database, 'Query10');
          const snapshot = await get(queryRef);
      
          if (snapshot.exists()) {
            const data = snapshot.val();
            for (const childKey in data) {
              if (data[childKey]['Account Name'] === inputData['Account Name']) {
                const dataRef = ref(database, `Query10/${childKey}`);
                // Delete the existing data (be cautious of data loss)
                await remove(dataRef);
                // Set the updated data at the same reference
               
                console.log('Data remove successfully!');
                break;
              }
            }
          } else {
            console.warn('Data with account name not found.');
          }
        } catch (error) {
          console.error('Error updating data:', error);
        }
      } 
      else{
        try {
          console.log('Fetching data by account name...');
          const queryRef = ref(database, 'Query10');
          const snapshot = await get(queryRef);
      
          if (snapshot.exists()) {
            const data = snapshot.val();
            for (const childKey in data) {
              if (data[childKey]['Account Name'] === inputData['Account Name']) {
                const dataRef = ref(database, `Almanac/${childKey}`);
                // Delete the existing data (be cautious of data loss)
                await remove(dataRef);
                // Set the updated data at the same reference
                console.log('Data remove successfully!');
                break;
              }
            }
          } else {
            console.warn('Data with account name not found.');
          }
        } catch (error) {
          console.error('Error updating data:', error);
        }
      }
      
    // } catch (error) {
    //   console.error('Error writing data:', error);
    //   // Handle error appropriately
    // }
    }
const EditForm = () => {
  const [isImageLoading, setIsImageLoading] = useState(false); // State variable for loading icon
const [isLogoLoading, setIsLogoLoading] = useState(false); 
const [isVideoLoading, setIsVideoLoading] = useState(false); 
  const location = useLocation();
  const queryString = new URLSearchParams(location.search);
  const encodedDataString = queryString.get('data');
  const data = JSON.parse(decodeURIComponent(encodedDataString)); // Decode and parse

  // console.log(data)
  // const data = JSON.parse(itemDataString); // Parse the data string
  // console.log(data)
  const [formData, setFormData] = useState({
    name: data.name,
    tel:data.tel,
    mobile:data.mobile,
    email: data.email,
    website:data.website,
    sector:data.sector,
    sub_sector:data.sub_sector,
    category:data.category,
    profile: data.profile,
    logo: data.logo==null?'':data.logo,
    image:data.image==null?'':data.image,
    video:data.video==null?'':data.video,
  });

  const storage = useRef(getStorage()); // Reference to Firebase Storage
  const handleImageFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // const storageRef = ref(storage.current, selectedFile); // Create a reference to the file location in storage
    // fileRef.put(selectedFile)
    // const storageRef = app.

   



    if (!selectedFile) {
      console.error('No file selected!');
      return; // Handle the case where no file is selected
    }

    // Create a reference to the file location in storage (provide a path structure)
    const storageRef = mediaRef(storage.current, `image/${selectedFile.name}`);
    // Upload the file using uploadBytesResumable for resumable uploads
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload progress:', progress + '%');
        setIsImageLoading(true); 
        // Update a progress bar or UI element (if applicable)
      },
      (error) => {

        console.error('Upload failed:', error);
        setIsImageLoading(false); 
        // Handle upload errors (e.g., display error message to user)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref) // Assuming you want the download URL
          .then(downloadURL => {
            setIsImageLoading(false); 
            console.log('File uploaded successfully! Download URL:', downloadURL);
      // const { name, value, files } = event.target;
            
    setFormData({
      ...formData,
      image: selectedFile.name,
    }
    )
         console.log(formData.image)
            // Use the download URL (e.g., display it to the user)
          })
          .catch((error) => {
            console.error('Failed to get download URL:', error);
            // Handle download URL retrieval errors
          });
      }
    );
 

    // const  fileRef = storage
    // console.log(selectedFile)
    //  formData.logo = selectedFile.name
  };
  ///

  const handleLogoFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // const storageRef = ref(storage.current, selectedFile); // Create a reference to the file location in storage
    // fileRef.put(selectedFile)
    // const storageRef = app.

   



    if (!selectedFile) {
      console.error('No file selected!');
      return; // Handle the case where no file is selected
    }

    // Create a reference to the file location in storage (provide a path structure)
    const storageRef = mediaRef(storage.current, `logo/${selectedFile.name}`);
    // Upload the file using uploadBytesResumable for resumable uploads
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        setIsLogoLoading(true); 
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload progress:', progress + '%');
        // Update a progress bar or UI element (if applicable)
      },
      (error) => {
        console.error('Upload failed:', error);
        // Handle upload errors (e.g., display error message to user)
      },
      () => {
        setIsLogoLoading(false); 
        getDownloadURL(uploadTask.snapshot.ref) // Assuming you want the download URL
          .then(downloadURL => {
            console.log('File uploaded successfully! Download URL:', downloadURL);
      // const { name, value, files } = event.target;
            
    setFormData({
      ...formData,
      logo: selectedFile.name,
    }
    )
         console.log(formData.image)
            // Use the download URL (e.g., display it to the user)
          })
          .catch((error) => {
            console.error('Failed to get download URL:', error);
            // Handle download URL retrieval errors
          });
      }
    );
 

    // const  fileRef = storage
    // console.log(selectedFile)
    //  formData.logo = selectedFile.name
  };

  //

  const handleVideoFileChange = (event) => {
    const selectedFile = event.target.files[0];
    // const storageRef = ref(storage.current, selectedFile); // Create a reference to the file location in storage
    // fileRef.put(selectedFile)
    // const storageRef = app.

   



    if (!selectedFile) {
      console.error('No file selected!');
      return; // Handle the case where no file is selected
    }

    // Create a reference to the file location in storage (provide a path structure)
    const storageRef = mediaRef(storage.current, `video/${selectedFile.name}`);
    // Upload the file using uploadBytesResumable for resumable uploads
    const uploadTask = uploadBytesResumable(storageRef, selectedFile);

    uploadTask.on('state_changed',
      (snapshot) => {
        setIsVideoLoading(true); 
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload progress:', progress + '%');
        // Update a progress bar or UI element (if applicable)
      },
      (error) => {
        console.error('Upload failed:', error);
        // Handle upload errors (e.g., display error message to user)
      },
      () => {
        setIsVideoLoading(false); 
        getDownloadURL(uploadTask.snapshot.ref) // Assuming you want the download URL
          .then(downloadURL => {
            console.log('File uploaded successfully! Download URL:', downloadURL);
      // const { name, value, files } = event.target;
            
    setFormData({
      ...formData,
      video: selectedFile.name,
    }
    )
            // Use the download URL (e.g., display it to the user)
          })
          .catch((error) => {
            console.error('Failed to get download URL:', error);
            // Handle download URL retrieval errors
          });
      }
    );
 

    // const  fileRef = storage
    // console.log(selectedFile)
    //  formData.logo = selectedFile.name
  };
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // const selectedFile = files[0];
    // const fileName = selectedFile.name;
    setFormData({
      ...formData,
      [name]: value === undefined ? files[0] : value, // Handle file upload
    });
    // console.log(files[0].name)
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    // if (!formData.file) {
    //   console.warn('Please select a file to upload.');
    //   return;
    // }

    try {
      const storageRef = ref(storage.current, `image/${formData.image}`); // Create storage reference
      const uploadTask_image =FileReader(storageRef)
      //  uploadBytes(storageRef, formData.image);

      // Display progress bar or loading indicator (optional)
      uploadTask_image.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload progress:', progress, '%');
        },
        (error) => {
          console.error('Error uploading image:', error);
          // Handle upload errors (e.g., display error message to user)
        },
        async () => {
          const downloadURL = await getDownloadURL(storageRef);
          console.log('Image uploaded successfully:', downloadURL);

          // Send data to your backend (adjust based on your setup)
          // You can send formData including the downloadURL

          setFormData({ name: '', email: '', message: '', file: null }); // Clear form
        }
      );
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle general form submission errors
    }
    // console.log(formData)
    writeData(formData)
  };

  const handleSubmitToDelete = async (event) => {

    // if (!formData.file) {
    //   console.warn('Please select a file to upload.');
    //   return;
    // }

   
    handleDelete(formData)
  };

  return (
    <ChakraProvider>
 <div>
      <h1>Update</h1>
     <form className="beautiful-form" style={{ width: '80%' }}>
     <div className="form-grid">
        <li>
          <label htmlFor="name">Company Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            defaultValue={formData.name}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </li>
        <li>
          <label htmlFor="tel">Telephone Number:</label>
          <input
            type="text"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            placeholder="Enter telephone number"
            
          />
        </li>
        <li>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
            
          />
        </li>
        <li>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            
          />
        </li>
        <li>
          <label htmlFor="website">Website</label>
          <input
            type="website"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website"
            
          />
        </li>
        <li>
          <label htmlFor="sector">Sector</label>
          <input
            type="text"
            id="sector"
            name="sector"
            value={formData.sector}
            onChange={handleChange}
            placeholder="Enter sector"
            required
          />
        </li>
        <li>
          <label htmlFor="sub_sector">Sub-Sector</label>
          <input
            type="text"
            id="sub_sector"
            name="sub_sector"
            value={formData.sub_sector}
            onChange={handleChange}
            placeholder="Enter sub-sector"
            required
          />
        </li>
        <li>
          <label htmlFor="category">Category</label>
          <select 
          
          value={formData.category}
          required
          >
            <option>Business</option>
            <option>Almanac</option>
          </select>
        </li>
        <li>
          <label htmlFor="profile">Profile</label>
          <textarea
            type='text'
            id="profiley"
            name="profile"
            value={formData.profile}
            onChange={handleChange}
            
            placeholder="Write company profile here"
          
          ></textarea>
        </li>
        <li>
          <label htmlFor="logo">logo</label>
          {data.logo && (
          <p>{data.logo}</p>)}
          <br/>
          <input
            type="file"
            id="logo"
            name="logo"
          
            onChange={handleLogoFileChange}
            accept=".jpg,.png" // Specify allowed file types (optional)
          />{isLogoLoading && <CircularProgress value={30} />}
        </li>
        <li>
          <label htmlFor="file">Image</label>
          {data.image && (
          <p>{data.image} </p>

          )}
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleImageFileChange}
            accept=".jpg,.png" // Specify allowed file types (optional)
          />{isImageLoading && <CircularProgress value={30} />}
        </li>
        <li>
          <label htmlFor="video">Video</label>
          {data.video && (
          <p>{data.video} </p>)}
          <input
            type="file"
            id="video"
            name="file"
            onChange={handleVideoFileChange}
            accept=".mp4,.gif" // Specify allowed file types (optional)
          />{isVideoLoading && <CircularProgress value={30} />}
        </li>
        <li>
        <button type="submit" id='update_btn' onClick={handleSubmit} style={{marginRight:'30%'}}>Update</button>
        <span/>
        <button onClick={handleSubmitToDelete} id='delete_btn'>Delete</button>
        </li>
        
      </div>
    </form>
    </div>
    </ChakraProvider>
   
    
  );
};

export default EditForm;
