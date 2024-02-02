import React, {useEffect, useRef, useState} from 'react'
import useAuth from '../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(){
    const emailRef=useRef();
    const passRef=useRef();
    const {login, currentUser} = useAuth();
    const [error, setError]= useState();
    const [loading, setLoading]= useState(false);
    const navigate= useNavigate();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            setError('')
            setLoading(true)
           await login(emailRef.current.value,passRef.current.value);
           navigate('/')
        } catch(err){
            console.log(err.message)
            setError(err.message)
        }
        setLoading(false)
    }

    useEffect(()=>{
        currentUser&&navigate('/')
    })


    return (
        <>
        <div className='login-form'>
            <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold text-center">Log In</h1>
                                {error && <div className="text-center p-2 mt-1" >{error}</div>}
                            </div>
                            <div className="divide-y divide-gray-200">
                                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                    <div className="relative">
                                        <input ref={emailRef} autoComplete="off" id="email" name="email" type="text" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                        <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                    </div>
                                    <div className="relative">
                                        <input ref={passRef} autoComplete="off" id="password" name="password" type="password" className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                        <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                    </div>
                                    <div className="relative">
                                        <button onClick={handleSubmit} disabled={loading} className="bg-blue-500 text-white rounded-md px-2 py-1">Submit</button>
                                    </div>
                                    <div className='text-gray rounded-md px-2 py-1'>Need an account? <Link to='/signup'>Sign Up</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}