import React from 'react'
import LinkButton from "./LinkButton";

export default function AccessDenied() {
    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='shadow-lg px-7 flex flex-col items-center justify-center'>
                <p className='text-xl text-black font-bold text-center my-5'>Hello there!</p>
                <p className='text-lg text-black text-justify my-5'>
                    To enjoy this website, you need to be logged in
                </p>
                <div className={'py-5'}>
                    <LinkButton url={'/'} label={'Login page'}/>
                </div>
            </div>
        </div>
    )
}
