import React from 'react';

function Kana() {
  return (
    <nav className="relative bg-white dark:bg-gray-900">
  <div className="container px-6 py-4 mx-auto">
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="flex items-center justify-between">
        <a href="/">
          <img src="/assets/logo-d03df8d8.svg" alt=""/>
        </a>
        <span className=" sm:block lg:hidden">
          <div className="mx-2 flex gap-2 justify-center items-center">
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="dark:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              {/* SVG path */}
            </svg>
            {/* Switch component */}
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="dark:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              {/* SVG path */}
            </svg>
          </div>
        </span>
        <div className="flex lg:hidden">
          <button type="button" className="text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 " aria-label="toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="absolute dark:bg-gray-900 inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center opacity-0 -translate-x-full">
        <ul className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
          <li className="px-3 py-2 mx-3 mt-2 text-black dark:text-white transition-colors duration-300 transform rounded-md lg:mt-0 hover:bg-gray-100   dark:hover:bg-gray-800  dark:hover:text-white">
            <a className="" href="/">Home</a>
          </li>
          <li className="px-3 py-2 mx-3 mt-2 text-black dark:text-white  transition-colors duration-300 transform rounded-md lg:mt-0  hover:bg-gray-100  dark:hover:bg-gray-800 dark:hover:text-white ">
            <a className="" href="/addproduct">Add Product</a>
          </li>
          <li className="px-3 py-2 mx-3 mt-2 text-black  dark:text-white transition-colors duration-300 transform rounded-md lg:mt-0  hover:bg-gray-100  dark:hover:bg-gray-800 dark:hover:text-white ">
            <a className=" text-blue-500" href="/mycart" aria-current="page">My Cart</a>
          </li>
        </ul>
        <div className="flex flex-col lg:flex-row items-start gap-2 lg:items-center mt-4 lg:mt-0">
          <div className="flex items-center">
            <p className=" text-sm bg-indigo-50 dark:bg-gray-800 dark:text-gray-200 px-2 py-1 rounded ">Momen Hossain</p>
            <div className="h-8 w-h-8 mx-2">
              <img className="h-full w-full rounded-full object-cover object-center" src="https://lh3.googleusercontent.com/a/ACg8ocJdZH0-BGZaNbkEb6wdHnstjssAV3cPc4MF2nLmLhhftdk=s96-c" alt=""/>
            </div>
          </div>
          <a className="inline-flex items-center justify-center h-10 gap-2 px-6 text-sm font-medium tracking-wide text-white transition duration-300 rounded whitespace-nowrap bg-blue-500 hover:bg-blue-400 focus:bg-blue-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300 disabled:shadow-none hover:shadow-md" href="/mycart">
            <span>Log Out</span>
          </a>
          <span className=" hidden lg:block">
            <div className="mx-2 flex gap-2 justify-center items-center">
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="dark:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                {/* SVG path */}
              </svg>
              {/* Switch component */}
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" className="dark:text-white" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                {/* SVG path */}
              </svg>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>
  <div className="border-b "></div>
</nav>

  );
}

export default Kana;
