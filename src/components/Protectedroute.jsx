// src/components/ProtectedRoute.jsx
// ============================================================
// PROTECTED ROUTE COMPONENT
// ============================================================
// Yeh ek "Security Guard" hai.
// Jab koi /dashboard ya koi bhi private page pe jaana chahe,
// yeh pehle check karta hai: "Tera token hai?"
// 
// Token hai  ✅ → Andar jaane do (children render karo)
// Token nahi ❌ → Wapas /login pe bhej do
// ============================================================


import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;