'use client';
import Image from "next/image";
import { useState, useEffect } from "react";
import LoginForm from "./components/login-form";
import CreateAccountForm from "./components/create-account-form";
import DashboardPage from "./dashboard/page";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showForm, setShowForm] = useState<string | null>(null);//null, 'login', or 'create-account'

  useEffect(() => {
    // Only run on client-side after hydration
    const loggedIn = localStorage.getItem("is_logged_in") === "True";
    setIsLoggedIn(loggedIn);
    setIsLoaded(true);
  }, []);

  // Show loading during hydration
  if (!isLoaded) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // If logged in, show dashboard
  if (isLoggedIn) {
    return <DashboardPage />;
  }

  // Button click handlers
  const handleLoginClick = () => setShowForm('login');//on the click of the login button, set the showForm state to 'login'
  const handleCreateAccountClick = () => setShowForm('create-account');//on the click of the create account button, set the showForm state to 'create-account'

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Debug the form data
    console.log('Form data entries:');
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        body: formData
      });
      
      console.log('Response status:', response.status);
      const userData = await response.json();
      console.log('Response data:', userData);
      
      if (response.ok) {
        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('is_logged_in', 'True');
        // Redirect or update UI
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (

    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark"
          src="https://www.fofostudios.com/img/Archive/ChatGPT%20Image%20Aug%2018,%202025,%2004_41_35%20PM.png"
          alt="Fofo Labs logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-4xl font-bold">Fofo Labs, Worldwide</h1>
        <ol className="font-mono list-inside list-decimal text-sm/6 text-center sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by signing in or creating an account{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
              <a href="/login">login</a> {/*use the login component*/}
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
          <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">
            Create your account
            </code>
             {" "}and save your tasks for Curran and Serg.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            onClick={handleLoginClick}
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Login Now
          </button>
          <button
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            onClick={handleCreateAccountClick}
            rel="noopener noreferrer"
          >
            Create account
          </button>
        </div>
        {showForm === 'login' && <LoginForm onSubmit={handleSubmit} />}
        {showForm === 'create-account' && <CreateAccountForm />}
      </main>

      
    </div>
  );
}
