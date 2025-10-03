'use client';
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        body: formData
      });
      
      const userData = await response.json();
      
      if (response.ok) {
        localStorage.setItem('currentUser', JSON.stringify(userData));
        localStorage.setItem('is_logged_in', 'True');
        router.push('/dashboard');
      } else {
        alert('Login failed: ' + userData.message);
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full border-2 border-gray-300 rounded-md p-3" 
            type="email" 
            placeholder="Email" 
            name="email" 
            required 
          />
          <input 
            className="w-full border-2 border-gray-300 rounded-md p-3" 
            type="password" 
            placeholder="Password" 
            name="password" 
            required 
          />
          <button 
            type="submit" 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md p-3 font-medium"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}