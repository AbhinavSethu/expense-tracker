'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-black">Welcome to Expense Tracker</h1>
      <p className="mt-2 text-lg text-black">Manage your expenses efficiently</p>
      <div className="mt-6 flex space-x-4">
        <button
          onClick={() => router.push('/login')}
          className="px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/signup')}
          className="px-6 py-2 text-black bg-green-500 rounded hover:bg-green-600"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
