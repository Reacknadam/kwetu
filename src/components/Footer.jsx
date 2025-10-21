import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 mt-12">
      <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Kwetu. Tous droits réservés.</p>
        <p>Portail des informaticiens de Kananga.</p>
      </div>
    </footer>
  );
};

export default Footer;
