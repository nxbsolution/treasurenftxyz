'use client'

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/provider/Auth';
import { toast } from '@/hooks/use-toast';
import Loader from '../../_components/Loader';

type FormData = {
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm: React.FC<{ token: string }> = ({ token }) => {
  const router = useRouter();

  const { resetPassword } = useAuth();

  const { register, handleSubmit, formState: { isLoading, errors }, watch } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {

    try {
      const { success, message } = await resetPassword({ token, password: data.password });
      toast({
        title: success ? 'Password Updated' : 'Update Failed',
        variant: success ? 'success' : 'destructive',
        description: message,
      })

      if (success) {
        router.push('/dashboard');
      }
    } catch (_) {
      toast({
        title: 'System Error',
        variant: 'destructive',
        description: 'Unable to process your request. Please try again later.',
      })
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Your Password </CardTitle>
        <CardDescription> Enter your new password below to complete your registration or reset your password.</CardDescription>
      </CardHeader>
      < CardContent >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4" >
            <div>
              <Input
                type="password"
                placeholder="New Password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <p className="text-red-500" > {errors.password.message} </p>}
            </div>
            <div>
              <Input
                type="password"
                placeholder="Confirm New Password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (val: string) => {
                    if (watch('password') != val) {
                      return "Your passwords do not match";
                    }
                  },
                })
                }
              />
              {errors.confirmPassword && <p className="text-red-500" > {errors.confirmPassword.message} </p>}
            </div>
            <Button type="submit" disabled={isLoading} > {isLoading ? <Loader /> : "Set Password"} </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
