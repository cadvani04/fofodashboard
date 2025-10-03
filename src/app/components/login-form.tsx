'use client';

interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <div className="mt-5 bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={onSubmit} className="space-y-4">
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
  );
}
