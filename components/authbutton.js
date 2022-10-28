import {signOut} from 'next-auth/react'

export default function AuthButton(){
    
    return(<>
        <button className='text-white' onClick={signOut}>SignOut</button>
    </>)
}