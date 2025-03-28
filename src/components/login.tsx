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
import { useLoginMutation } from '@/services/mutation/login'
import axios from 'axios'

export type LoginCredentials = {
  identifier: string
  password: string
}

const formSchema = z.object({
  identifier: z.string().min(2, { message: 'Please enter username' }),
  password: z.string().min(2, { message: 'Please enter password' })
})

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const mutation = useLoginMutation()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)
    const { identifier, password } = values
    const loginData: LoginCredentials = {
      identifier: identifier,
      password: password
    }
    mutation.mutate(loginData, {
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
              <div className="space-y-4 relative">
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="username" {...field} />
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
                      <div className="flex justify-between items-center">
                        <FormLabel>Password</FormLabel>
                        <Link href="#" className="opacity-50 hover:opacity-100 text-sm">
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
                    'Signin'
                  )}
                </Button>
              </div>
            </form>
          </Form>

          <div className="text-center flex items-center justify-evenly w-full my-4">
            <div className="border w-full border-b border-gray-300"></div>
            <p className="text-zinc-600 text-sm mx-4">or</p>
            <div className="border w-full border-b border-gray-300"></div>
          </div>

          <Button className="w-full" variant="outline" size="lg">
            <Image alt="Google Login" width="20" height="20" src="/google.png" />
            Login with Google
          </Button>

          <p className="mt-5 text-sm text-center text-zinc-600">
            Don&apos;t have an Account?{' '}
            <Link className="text-blue-500 font-semibold" href="#">
              Signup Now
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
