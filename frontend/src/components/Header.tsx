import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="p-4 bg-gray-900 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">MVP App</h1>
      {user && (
        <div className="flex gap-4 items-center">
          <span className="text-sm text-gray-300">{user.email}</span>
          <button 
            onClick={() => signOut(auth)}
            className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
