import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
const LoadingToRedirect = () => {
  const [count, setCount] = useState(3);

  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    //redirect once count is 0
    count === 0 && history.push('/');
    //cleanup
    return () => clearInterval(interval);
  }, [count, history]);
  return (
    <div className="container p-5 text-center">
      <p>
        Redirecting you in{' '}
        <span className="text-danger" style={{ fontSize: '5rem' }}>
          {' '}
          {count}
        </span>{' '}
        secs
      </p>
    </div>
  );
};

export default LoadingToRedirect;
