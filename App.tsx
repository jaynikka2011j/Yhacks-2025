import React, { useState } from 'react';

// Define the type for a user
interface User {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  interests: string[];
}

// Mock user data with interests
const users: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice.j@example.com', imageUrl: 'https://i.pravatar.cc/150?u=1', interests: ['Photography', 'Hiking', 'Reading'] },
  { id: 2, name: 'Bob Williams', email: 'bob.w@example.com', imageUrl: 'https://i.pravatar.cc/150?u=2', interests: ['Cooking', 'Gaming', 'Traveling'] },
  { id: 3, name: 'Charlie Brown', email: 'charlie.b@example.com', imageUrl: 'https://i.pravatar.cc/150?u=3', interests: ['Music', 'Art', 'Yoga'] },
  { id: 4, name: 'Diana Miller', email: 'diana.m@example.com', imageUrl: 'https://i.pravatar.cc/150?u=4', interests: ['Sports', 'Movies', 'Technology'] },
  { id: 5, name: 'Ethan Davis', email: 'ethan.d@example.com', imageUrl: 'https://i.pravatar.cc/150?u=5', interests: ['Coding', 'Science', 'History'] },
  { id: 6, name: 'Fiona Garcia', email: 'fiona.g@example.com', imageUrl: 'https://i.pravatar.cc/150?u=6', interests: ['Dancing', 'Fashion', 'Socializing'] },
  { id: 7, name: 'cheese man', email: 'george.r@example.com', imageUrl: 'https://i.pravatar.cc/150?u=7', interests: ['Woodworking', 'Gardening', 'Fishing'] },
  { id: 8, name: 'Hannah Martinez', email: 'hannah.m@example.com', imageUrl: 'https://i.pravatar.cc/150?u=8', interests: ['Writing', 'Poetry', 'Volunteering'] },
];

const UserCard: React.FC<{ user: User; onClick: () => void }> = ({ user, onClick }) => {
  return (
    <div
      className="bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View details for ${user.name}`}
    >
      <div className="p-6 flex flex-col items-center text-center">
        <img className="w-24 h-24 rounded-full border-4 border-cyan-400 object-cover" src={user.imageUrl} alt={user.name} />
        <h3 className="mt-4 text-xl font-bold text-white">{user.name}</h3>
        <p className="mt-1 text-sm text-gray-400">{user.email}</p>
      </div>
    </div>
  );
};

const UserDetailModal: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="userDetailModalTitle"
        >
            <div
                className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all duration-300 ease-in-out scale-95"
                onClick={(e) => e.stopPropagation()}
                style={{ animation: 'fade-in 0.3s ease-out forwards' }}
            >
                <div className="relative p-8 text-center">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        aria-label="Close user detail modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <img className="w-32 h-32 rounded-full border-4 border-cyan-400 object-cover mx-auto -mt-20" src={user.imageUrl} alt={user.name} />
                    <h2 id="userDetailModalTitle" className="mt-6 text-3xl font-bold text-white">{user.name}</h2>
                    <p className="mt-2 text-md text-gray-400">{user.email}</p>

                    <div className="mt-6 pt-6 border-t border-gray-700">
                        <h4 className="text-lg font-semibold text-cyan-400">Interests</h4>
                        <div className="mt-4 flex flex-wrap justify-center gap-2">
                            {user.interests.map((interest) => (
                                <span key={interest} className="bg-gray-700 text-gray-300 text-sm font-medium px-3 py-1 rounded-full">
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};


const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <>
      <main className="bg-gray-900 min-h-screen w-full flex flex-col items-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
                  User Directory
                </span>
              </h1>
              <p className="mt-3 text-lg text-gray-400">
                Browse through our amazing team members.
              </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {users.map((user) => (
              <UserCard key={user.id} user={user} onClick={() => handleUserClick(user)} />
            ))}
          </div>
        </div>
      </main>
      {selectedUser && <UserDetailModal user={selectedUser} onClose={handleCloseModal} />}
    </>
  );
};

export default App;
