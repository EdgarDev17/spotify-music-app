import React from 'react'
import LinkButton from "./LinkButton";

export default function AccessDenied() {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='shadow-lg px-7 flex flex-col items-center justify-center'>
                <p className='text-xl text-black font-bold text-center my-5'>¡Hey! Alto ahí 🤔</p>
                <p className='text-lg text-black text-justify my-5'>
                    ¡Para poder acceder a este contenido primero debes ser parte de la banda! para ello debes iniciar
                    sesión o crear una cuenta.
                </p>
                <div className={'py-5'}>
                    <LinkButton url={'/'} label={'Iniciar Sesión'}/>
                </div>
            </div>
        </div>
    )
}
