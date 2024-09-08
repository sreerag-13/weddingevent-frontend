import React from 'react';

const Home = () => {
  return (
    <div style={{
      height: '100vh',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(http://getwallpapers.com/wallpaper/full/2/3/f/1128636-amazing-hd-wedding-backgrounds-2160x1440.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
    }}>
      <div style={{
        textAlign: 'center',
        color: '#fff',
        zIndex: 1,
      }}>
        <h1 style={{
          fontSize: 48,
          fontWeight: 'bold',
          marginBottom: 20,
        }}>
          WedCode
        </h1>
        <p style={{
          fontSize: 18,
          marginBottom: 40,
        }}>
          Welcome to WedCode, your premier destination for wedding events.
        </p>
      </div>
      <footer style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#333',
        color: '#fff',
        padding: 10,
        textAlign: 'center',
      }}>
        <p>&copy; 2023 WedCode. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;