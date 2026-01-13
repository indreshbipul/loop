import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
  return (
    <div
      style={{
        minHeight: '89vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ef 100%)',
        color: '#1a202c',
        fontFamily: 'Inter, Segoe UI, Arial, sans-serif',
        padding: 24,
      }}
    >
      <div
        style={{
          fontSize: 80,
          marginBottom: 16,
          color: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="Error Icon"
      >
        {/* Modern error icon (SVG) */}
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#e0e7ef" />
          <path d="M12 8v4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1" fill="#2563eb" />
        </svg>
      </div>
      <h1
        style={{
          fontSize: 36,
          fontWeight: 700,
          marginBottom: 12,
          letterSpacing: '-0.5px',
        }}
      >
        Oops! Something went wrong.
      </h1>
      <p
        style={{
          fontSize: 20,
          color: '#475569',
          marginBottom: 32,
          maxWidth: 420,
          textAlign: 'center',
          lineHeight: 1.5,
        }}
      >
        The page you’re looking for doesn’t exist or Under Development. Please check the URL or return to the homepage.
      </p>
      <Link
        to="/"
        style={{
          padding: '12px 32px',
          background: 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)',
          color: '#fff',
          borderRadius: 8,
          textDecoration: 'none',
          fontWeight: 600,
          fontSize: 18,
          boxShadow: '0 4px 24px rgba(37,99,235,0.10)',
          transition: 'background 0.2s, box-shadow 0.2s',
          border: 'none',
          outline: 'none',
          cursor: 'pointer',
        }}
        onMouseOver={e => {
          e.currentTarget.style.background = 'linear-gradient(90deg, #1e40af 0%, #2563eb 100%)'
          e.currentTarget.style.boxShadow = '0 6px 32px rgba(37,99,235,0.15)'
        }}
        onMouseOut={e => {
          e.currentTarget.style.background = 'linear-gradient(90deg, #2563eb 0%, #1e40af 100%)'
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(37,99,235,0.10)'
        }}
      >
        Go Home
      </Link>
    </div>
  )
}

export default Error