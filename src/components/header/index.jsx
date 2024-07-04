import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import { doSignOut } from '../../firebase/auth'
import { ChakraProvider,Button ,Heading, CircularProgress,useDisclosure, CircularProgressLabel,Modal,ModalOverlay,ModalContent,ModalHeader,ModalCloseButton ,ModalBody,ModalFooter } from '@chakra-ui/react'

const Header = () => {
    const navigate = useNavigate()
    const { userLoggedIn } = useAuth()
    return (
        <ChakraProvider>

       
        <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 right-0 h-12 border-b place-content-center items-center bg-gray-200'>
            {
                userLoggedIn
                    ?
                    <>
                        <Button  onClick={() => { doSignOut().then(() => { navigate('/login') }) }} colorScheme='teal'>Logout</Button >
                        <Button  onClick={() =>  { navigate('/home') }} colorScheme='teal'>Backs</Button >
                        </>
                    :
                    <>
                    {/* <Button  colorScheme='teal'> */}
                        <Heading style={{color:'teal'}} mb={1}>Addis Chamber Business Directory Mobile App</Heading>
                    {/* <Link className='text-sm text-blue-600 underline' to={'/login'} style={{color:'white',textDecoration:'none'}}>Login</Link>
                    </Button>
                    <Button colorScheme='teal'>
                    <Link className='text-sm text-blue-600 underline' to={'/register'} style={{color:'white', textDecoration:'none'}}>Register New Account</Link> */}
                    {/* </Button> */}
                    </>
            }

        </nav>
        </ChakraProvider>
    )
}

export default Header