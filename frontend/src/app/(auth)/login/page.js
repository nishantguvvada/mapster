'use client';

import AuthForm from '@/components/ui/AuthForm';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();

  if (user) router.push('/maps');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm isLogin={true} />
    </div>
  );
}