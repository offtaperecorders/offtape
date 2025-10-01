import React, { useEffect, useState } from "react";
import Login from "./components/Login";
import BookingForm from "./components/BookingForm";
import { onAuthChange } from "./services/firebase";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthChange(setUser);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Login user={user} setUser={setUser} />
      {user ? (
        <BookingForm user={user} />
      ) : (
        <p className="text-center text-gray-600 mt-8">Por favor, faça login para agendar.</p>
      )}
    </div>
  );
}
