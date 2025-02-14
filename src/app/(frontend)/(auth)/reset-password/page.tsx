import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import Link from 'next/link';

interface ResetPasswordPageProps {
  searchParams: any
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = async ({ searchParams }) => {
  const { token } = await searchParams;

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100" >
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md" >
          <h1 className="text-2xl font-bold mb-4" > Invalid or Missing Token </h1>
          <p className='py-3'> Please request a new password reset link.</p>
          <Link href={"/login"} className='bg-primary text-white px-4 py-2 rounded-lg'>Go to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" >
      <div className="max-w-md w-full" >
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
