'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSignUpMutation } from '@/services/mutation/login'
import axios from 'axios'
import { useCreateFreeSubscribeMutation } from '@/services/mutation/subscribe'

export type LoginCredentials = {
  username: string
  email: string
  password: string
}

export type subscriptionTypes = {
  users_permissions_user: string
  subscriprion_status: string
  plan: string
}

const formSchema = z.object({
  username: z.string().min(2, { message: 'Please enter username' }),
  email: z.string().email({ message: 'Please enter valid email' }),
  password: z.string().min(2, { message: 'Please enter password' })
})

export function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const mutation = useSignUpMutation()
  const subscriptionMutation = useCreateFreeSubscribeMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)
    const { username, email, password } = values
    const getMonthStartAndEnd = () => {
      const now = new Date()

      // Start of the month (1st day, 00:00:00)
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1)

      // End of the month (Last day, 23:59:59)
      const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59)

      return { startDate, endDate }
    }
    const { startDate, endDate } = getMonthStartAndEnd()
    console.log('Start Date:', startDate.toISOString())
    console.log('End Date:', endDate.toISOString())
    const loginData: LoginCredentials = {
      username: username,
      email: email,
      password: password
    }
    mutation.mutate(loginData, {
      onSuccess: (data) => {
        const subscriptionData: subscriptionTypes = {
          data: {
            plan: process.env.NEXT_PUBLIC_FREE_PLAN_ID,
            subscription_status: 'active',
            users_permissions_user: data?.data?.user.documentId,
            start_date: startDate,
            end_date: endDate
          }
        }

        setIsLoading(false)
        subscriptionMutation.mutate(subscriptionData, {
          onSuccess: (data) => {
            console.log(JSON.stringify(data))
          }
        })
      },

      onError: (error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error?.message || error.message)
        }
        setIsLoading(false)
      }
    })
  }

  return (
    <div className="m-auto">
      <Card className="w-[350px] shadow-2xl shadow-blue-300">
        <CardHeader>
          <CardTitle className="text-xl text-center">Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="relative space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel>Password</FormLabel>
                        <Link href="#" className="text-sm opacity-50 hover:opacity-100">
                          Forgot Password?
                        </Link>
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                          >
                            {showPassword ? (
                              <EyeOff size={20} className="opacity-30" />
                            ) : (
                              <Eye className="opacity-30" size={20} />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {error && <p className="mt-5 text-xs text-center text-red-600">{error}</p>}

              <div className="mt-8">
                <Button disabled={isLoading} className="w-full" size="lg" type="submit">
                  {isLoading ? (
                    <>
                      <LoaderCircle size={18} className="animate-spin" /> Loading...
                    </>
                  ) : (
                    'Signup'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="flex items-center w-full my-4 text-center justify-evenly">
            <div className="w-full border border-b border-gray-300"></div>
            <p className="mx-4 text-sm text-zinc-600">or</p>
            <div className="w-full border border-b border-gray-300"></div>
          </div>

          <Button className="w-full" variant="outline" size="lg">
            <Image alt="Google Login" width="20" height="20" src="/google.png" />
            Signup with Google
          </Button>

          <p className="mt-5 text-sm text-center text-zinc-600">
            Do you have an Account?{' '}
            <Link className="font-semibold text-blue-500" href="/auth">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
