import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader } from 'lucide-react';
import './checkoutPage.css';

function Orderpay() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading'); // loading | success | failed

  useEffect(() => {
    const success = searchParams.get('success');
    if (success === 'true') {
      setStatus('success');
    } else if (success === 'false') {
      setStatus('failed');
    } else {
      // No params yet — might still be processing
      setStatus('loading');
    }
  }, [searchParams]);

  return (
    <div className='orderpay'>
        {status === 'loading' && (
          <div className='orderpay__box'>
            <Loader size={48} className='orderpay__spin' color='#1d8cdc' />
            <h2>Processing your payment...</h2>
            <p>Please wait while we confirm your order.</p>
          </div>
        )}

        {status === 'success' && (
          <div className='orderpay__box'>
            <CheckCircle size={64} color='#22c55e' />
            <h2>Payment Successful!</h2>
            <p>Your order has been placed successfully.</p>
            <button className='btn' onClick={() => navigate('/orders')}>
              View My Orders
            </button>
          </div>
        )}

        {status === 'failed' && (
          <div className='orderpay__box'>
            <XCircle size={64} color='#ef4444' />
            <h2>Payment Failed</h2>
            <p>Something went wrong with your payment. Please try again.</p>
            <button className='btn' onClick={() => navigate('/checkout')}>
              Try Again
            </button>
          </div>
        )}
    </div>
  );
}

export default Orderpay;