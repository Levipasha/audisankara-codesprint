'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { Suspense, useState } from 'react';
import { ShieldCheck, User, Mail, Phone, BookOpen, Hash, Building2, Calendar, CreditCard, ArrowLeft, Lock, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

function PayFrame() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const name         = searchParams.get('name') || '';
  const email        = searchParams.get('email') || '';
  const phone        = searchParams.get('phone') || '';
  const rollNumber   = searchParams.get('rollNumber') || '';
  const college      = searchParams.get('college') || '';
  const course       = searchParams.get('course') || '';
  const year         = searchParams.get('year') || '';
  const amount       = searchParams.get('amount') || '399';

  const { token, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayClick = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      const activeToken = token || localStorage.getItem('codesprint_token') || '';
      // Generate Razorpay order on the backend
      const orderRes = await fetch((process.env.NEXT_PUBLIC_API_URL || '') + '/api/payments/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${activeToken}`
        },
        body: JSON.stringify({})
      });

      if (!orderRes.ok) {
        const errData = await orderRes.json();
        setErrorMsg(errData.message || 'Failed to create payment order.');
        setLoading(false);
        return;
      }

      const orderData = await orderRes.json();

      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setErrorMsg('Failed to load Razorpay SDK. Please check your internet connection.');
        setLoading(false);
        return;
      }

      const keyId = orderData.keyId || '';

      const options = {
        key: keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'CodeSprint 2026',
        description: 'Hackathon Registration Fee',
        order_id: orderData.id,
        handler: async function (response: any) {
          setLoading(true);
          setErrorMsg('');
          try {
            const verifyRes = await fetch((process.env.NEXT_PUBLIC_API_URL || '') + '/api/payments/verify', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${activeToken}`
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                amount: orderData.amount / 100
              })
            });

            const verifyData = await verifyRes.json();
            if (verifyRes.ok && verifyData.success) {
              setSuccess(true);
              await refreshUser();
              setTimeout(() => {
                router.push('/register');
              }, 1500);
            } else {
              setErrorMsg(verifyData.message || 'Payment verification failed.');
            }
          } catch (err) {
            console.error(err);
            setErrorMsg('Error verifying payment signature.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: name,
          email: email,
          contact: phone
        },
        theme: {
          color: '#7c3aed'
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setErrorMsg('Error initiating checkout. Please try again.');
      setLoading(false);
    }
  };

  const fields = [
    { icon: User,      label: 'Student Name',  value: name },
    { icon: Mail,      label: 'Email Address', value: email },
    { icon: Phone,     label: 'Phone Number',  value: phone },
    { icon: Hash,      label: 'Roll Number',   value: rollNumber },
    { icon: Building2, label: 'College',       value: college },
    { icon: BookOpen,  label: 'Course',        value: course },
    { icon: Calendar,  label: 'Year',          value: year },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1040 50%, #0f0f1a 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center', padding: '40px 16px', fontFamily: "'Inter', sans-serif"
    }}>
      {/* Back button */}
      <div style={{ width: '100%', maxWidth: 560, marginBottom: 20 }}>
        <button
          onClick={() => router.back()}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.7)', borderRadius: 10, padding: '7px 14px',
            fontSize: 12, fontWeight: 600, cursor: 'pointer'
          }}
        >
          <ArrowLeft size={13} /> Back to Registration
        </button>
      </div>

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 560,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 24, overflow: 'hidden',
        boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.15)'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
          padding: '28px 32px 24px',
          display: 'flex', alignItems: 'center', gap: 16
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <ShieldCheck size={24} color="#fff" />
          </div>
          <div>
            <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 3 }}>
              CodeSprint 2026 · Secure Checkout
            </div>
            <div style={{ color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>
              Payment Summary
            </div>
          </div>
        </div>

        {success ? (
          <div style={{ padding: '40px 32px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'inline-flex', padding: 12, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#10b981' }}>
              <CheckCircle2 size={32} />
            </div>
            <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 850 }}>Payment Successful!</h3>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Your payment was processed and verified. Redirecting you back to registration status...</p>
          </div>
        ) : (
          <>
            {/* Fields */}
            <div style={{ padding: '24px 32px 8px' }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
                Registration Details
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {fields.map(({ icon: Icon, label, value }) => value ? (
                  <div key={label} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: 12, padding: '11px 16px'
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: 'rgba(124,58,237,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      <Icon size={14} color="#a78bfa" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
                        {label}
                      </div>
                      <div style={{ color: '#fff', fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ) : null)}
              </div>
            </div>

            {/* Amount row */}
            <div style={{ padding: '16px 32px' }}>
              <div style={{
                background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(79,70,229,0.15))',
                border: '1px solid rgba(124,58,237,0.3)',
                borderRadius: 14, padding: '16px 20px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                    Registration Fee
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Hackathon Entry · CodeSprint 2026</div>
                </div>
                <div style={{ color: '#c4b5fd', fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em' }}>₹{amount}</div>
              </div>
            </div>

            {errorMsg && (
              <div style={{ padding: '0 32px 16px' }}>
                <div style={{ padding: 12, borderRadius: 10, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', fontSize: 12 }}>
                  {errorMsg}
                </div>
              </div>
            )}

            {/* Pay button */}
            <div style={{ padding: '0 32px 32px' }}>
              <button
                onClick={handlePayClick}
                disabled={loading}
                style={{
                  width: '100%', padding: '16px 24px',
                  background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)',
                  border: 'none', borderRadius: 14,
                  cursor: loading ? 'wait' : 'pointer',
                  color: '#fff', fontSize: 15, fontWeight: 800, letterSpacing: '-0.01em',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: '0 8px 32px rgba(124,58,237,0.5)',
                  transition: 'all 0.2s',
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? (
                  <><Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Processing payment...</>
                ) : (
                  <><CreditCard size={18} /> Pay ₹{amount} Online</>
                )}
              </button>
              <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
              <p style={{
                textAlign: 'center', color: 'rgba(255,255,255,0.3)',
                fontSize: 10, marginTop: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5
              }}>
                <Lock size={9} /> Secured by Razorpay · Axis Bank Payment Gateway
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f0f1a', color: 'rgba(255,255,255,0.4)', fontSize: 14 }}>
        Loading payment session...
      </div>
    }>
      <PayFrame />
    </Suspense>
  );
}
