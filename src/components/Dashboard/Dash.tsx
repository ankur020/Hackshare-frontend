// src/pages/dashboard.tsx
import { useContext, useEffect } from 'react';
import AuthContext from '@/context/Authcontext';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!authContext?.user) {
      router.push('/signin');
    }
  }, [authContext?.user]);

  if (!authContext?.user) {
    return <p>Loading...</p>;
  }

  return <div>Welcome to the Dashboard, {authContext.user.fullName}!</div>;
};

export default Dashboard;
