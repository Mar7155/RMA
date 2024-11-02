import React from 'react';

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
};

const LogoutButton: React.FC = () => {
  const handleLogout = () => {
    deleteCookie('jwt');    
    console.log('Sesión cerrada');
  };

  return (
    <button onClick={handleLogout}
      style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
      }}>
      Cerrar sesion
    </button>

  );
};

export default LogoutButton;