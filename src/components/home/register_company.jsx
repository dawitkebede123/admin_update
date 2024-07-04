import React, { useState, useRef} from 'react';
import './edit_form.css'; // Import your CSS file
import { initializeApp } from 'firebase/app';
import { getDatabase,ref,set,push, query, orderByChild, startAfter, limitToFirst, get, endAt, equalTo, endBefore } from 'firebase/database';
import { getStorage,ref as mediaRef, uploadBytes,uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ChakraProvider,Button, CircularProgress,useDisclosure, CircularProgressLabel,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton,ModalBody,ModalFooter } from '@chakra-ui/react'
import { progress } from 'framer-motion';

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
// const database = firebase.database();

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
      try{
        const newRef = await push(ref(database, 'Query10'));
        const rf = set(newRef,inputData)
        await set(rf)
      }
      catch(err){
        console.log(err)
      }
      
    }
    else{

      const newRef = await push(ref(database, 'Almanac'));
    console.log('saving');
    const rf = set(newRef,inputData)
    await set(rf)
    }
    
  // } catch (error) {
  //   console.error('Error writing data:', error);
  //   // Handle error appropriately
  // }
  }
const RegisterForm = () => {
  // const {isOpen,setIsOpen} = useS
  const [isSucessModalDisplay,setIsSucessModalDisplay] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [logoProgress,setLogoProgress] = useState(0);
const [imageProgress,setImageProgress] = useState(0);
const [videoProgress,setVideoProgress] = useState(0);
const [isImageLoading, setIsImageLoading] = useState(false); // State variable for loading icon
const [isLogoLoading, setIsLogoLoading] = useState(false); 
const [isSubmit, setIsSubmit] = useState(false);
const [isVideoLoading, setIsVideoLoading] = useState(false); 
  const [formData, setFormData] = useState({
    name: '',
    tel:'',
    mobile:'',
    email: '',
    website:'',
    
    profile: '',
    sector:'',
    sub_sector:'',
    category:'business',
    image:null,
    video:null,
    logo:null,
    // file: null,
  });

  const storage = useRef(getStorage()); // Reference to Firebase Storage
 
  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // const selectedFile = files[0];
    // const fileName = selectedFile.name;
    // if (!files.length) return; 
    const newValue = event.target.value;
    setFormData({
      ...formData,
      [name]: newValue,
      // image: value !== undefined ? value : (files && files.length > 0 ? files[0] : null),
    });
    
    
  };
  const handleNameChange = (event) => {
    const { name, value, files } = event.target;
    // const selectedFile = files[0];
    // const fileName = selectedFile.name;
    // if (!files.length) return; 
    const newValue = event.target.value.toUpperCase();
    setFormData({
      ...formData,
      [name]: newValue,
      // image: value !== undefined ? value : (files && files.length > 0 ? files[0] : null),
    });
    
    
  };
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
        setImageProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log('Upload progress:', progress + '%');
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setIsImageLoading(progress); 
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
        setLogoProgress(progress);
        // console.log('Upload progress:', progress + '%');
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
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setVideoProgress(progress)
      // progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
  const handleSubmit = async (event) => {
    
    event.preventDefault();
  // isOpen = true;
    // Check if a file is selected (optional, uncomment if needed)
    // if (!formData.file) {
    //   console.warn('Please select a file to upload.');
    //   return;
    // }
  
    try {
      writeData(formData); 


      setIsSucessModalDisplay(true)
       
    } catch (err) {
      console.error('Error during upload:', err);
    } 
    // finally {
      
    // }
  };
  

  return (
    <ChakraProvider>
 <form className="beautiful-form" onSubmit={handleSubmit} style={{ width: '80%' }}>
    <div className="form-grid">
      <li>
        <label htmlFor="name">Company Name</label>
        <input
          onKeyUp={(e) => (e.target.value = e.target.value.toUpperCase())}
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleNameChange}
          placeholder="Enter company name"
          required
        />
      </li>
      <li>
        <label htmlFor="tel">Telephone Number</label>
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
        <label htmlFor="mobile">Mobile Number</label>
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
          type="text"
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
      <li className="select-field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        >
          <option selected>Business</option>
          <option>Almanac</option>
        </select>
      </li>
      <li>
        <label htmlFor="profile">Profile</label>
        <textarea
          id="profile"
          name="profile"
          value={formData.profile}
          onChange={handleChange}
          placeholder="Write company profile here"
        />
      </li>
      <li>
        <label htmlFor="logo">logo</label>
        <input
          type="file"
          id="logo"
          name="logo"
          onChange={handleLogoFileChange}
          accept="image/jpg,image/png" // Specify allowed file types (optional)
        />{isLogoLoading && <CircularProgress value={logoProgress}  />}
      </li>
      <li>
        <label htmlFor="image">Image</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageFileChange}
          accept=".jpg,.png" // Specify allowed file types (optional)
        />{isImageLoading && <CircularProgress value={imageProgress} />}
      </li>
      
      <li>
        <label htmlFor="video">Video</label>
        <input
          type="file"
          id="video"
          name="video"
          onChange={handleVideoFileChange}
          accept=".mp4" // Specify allowed file types (optional)
        />{isVideoLoading && <CircularProgress value={videoProgress}  />}
      </li>
      <li>
        <button type="submit" onClick={isOpen}>Register</button>
      </li>
        // isSucessModalDisplay &&
  <Modal isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    {/* <ModalHeader>Modal Title</ModalHeader> */}
    <ModalCloseButton />
    <ModalBody>
    <ModalHeader>Saved Successfully</ModalHeader>
      {/* <Lorem count={2} /> */}
    </ModalBody>

    {/* <ModalFooter>
      <Button colorScheme='blue' mr={3} onClick={onClose}>
        Close
      </Button>
      <Button variant='ghost'>Secondary Action</Button>
    </ModalFooter> */}
  </ModalContent>
</Modal>
      
    
    </div>

  </form>
    </ChakraProvider>
   
  );
};

export default RegisterForm;
