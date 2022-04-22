import React, { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import AccessDenied from '../../components/AccessDenied'

export default function Home() {
	const { data: session, status } = useSession()

	if(!session) {
		return(
			<>
				<AccessDenied/>
			</>
		)
	}
	return (
		<>
			<h1 className='text-lg'>Bienvenido {session.user.name}</h1>
			
			<button onClick={() => signOut({callbackUrl: 'http://localhost:3000/login'})}>Cerrar Sesión</button>
			{console.log(session)}
		</>
	)
}
