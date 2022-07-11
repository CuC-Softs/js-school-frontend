import React from 'react';
import { Link } from 'react-router-dom';
import NFimage from '../public/img/404-Error.png';
import BGimage from '../public/img/bg-galaxy.jpg';

const Card404:React.FC = () => {
  return (
    <div style={{background: `url(${BGimage})`}}>
        <div className="h-screen flex justify-center">
            <div className="mx-auto bg-gray-800 p-8 px-8 shadow-2xl shadow-gray-800 2xl:w-[700px] justify-center items-center">
                <img 
                src={NFimage}
                />
                <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    404 - Page not found
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400 text-xl">
                    You are looking for a page that does not exist.
                </p>
                <div className="grid gap-2 my-4">
                    <button 
                        type="submit" 
                        className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 text-gray-300 font-sans text-xl font-semibold rounded-lg">
                        <Link to="/sign-in">Sign in</Link> 
                    </button>
                    <p className='text-center text-gray-700 dark:text-gray-400 text-2xl font-bold'>Or</p>
                    <button
                        type="submit"
                        className="w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 text-gray-300 font-sans text-xl font-semibold rounded-lg"
                    >
                        <Link to="/sign-up">Sign up</Link>
                    </button>
                </div>  
            </div>
        </div>
    </div>
  );
};

export default Card404;