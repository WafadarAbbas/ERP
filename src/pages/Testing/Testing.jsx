import React, { useState, useEffect } from 'react';

function Testing() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount < 60) {
          return prevCount + 1; // Increase by 1 every interval
        } else {
          clearInterval(interval);
          return prevCount;
        }
      });
    }, 5); 

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div style={{ marginTop: 10 }}>
      <h1>{count}</h1>
    </div>
  );
}

export default Testing;
