'use client';

export default function CreateAccountForm() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Account created successfully! Please login.');
        window.location.reload(); // Refresh to show login form
      } else {
        alert('Registration failed: ' + data.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="mt-5 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          className="w-full border-2 border-gray-300 rounded-md p-3" 
          type="text" 
          placeholder="Full Name" 
          name="name" 
          required 
        />
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
          className="w-full bg-green-500 hover:bg-green-600 text-white rounded-md p-3 font-medium"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
