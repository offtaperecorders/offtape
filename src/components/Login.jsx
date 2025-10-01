import React from "react";
import { loginWithGoogle, logout } from "../services/firebase";

export default function Login({ user, setUser }) {
  return (
    <div className="flex justify-center items-center gap-4 p-4">
      {user ? (
        <>
          <p>Olá, {user.email}</p>
          <button
            onClick={() => {
              logout();
              setUser(null);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Sair
          </button>
        </>
      ) : (
        <button
          onClick={() => {
            loginWithGoogle();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Entrar com Google
        </button>
      )}
    </div>
  );
}
