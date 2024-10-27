import React from 'react';

const Offline = () => {
  return (
    <div style={styles.container}>
      <div style={styles.offlineBox}>
        <p style={styles.text}>You are offline ❌</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#ffebee', 
  },
  offlineBox: {
    padding: '20px 40px',
    backgroundColor: '#f44336', 
    borderRadius: '8px',
  },
  text: {
    color: '#fff',
    fontSize: '20px',
    fontWeight: 'bold',
  },
};

export default Offline;
