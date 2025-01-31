import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const { user } = useAuth();
  
  // Redirect logic
  if (!user) redirect('/login');
  if (user) redirect('/maps');

  return null; // Temporary render
}