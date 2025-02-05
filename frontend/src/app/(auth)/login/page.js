'use client';

import AuthForm from '@/components/ui/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/maps');
    }
  }, [user, loading]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm isLogin={true} />
    </div>
  );
}