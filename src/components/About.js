import React, { useEffect } from 'react';

function About() {
  useEffect(() => {
    return () => {
      console.log('unmounted');
    };
  }, []);
  return <div>About</div>;
}

export default About;
