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
import axios from 'axios'
import { useLoginMutation } from '@/services/mutation/login'
import Image from 'next/image'
import Link from 'next/link'

export type LoginCredentials = {
  identifier: string
  password: string
}

const formSchema = z.object({
  identifier: z.string().min(2, {
    message: 'Please enter username'
  }),
  password: z.string().min(2, {
    message: 'Please enter password'
  })
})

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const loginMutation = useLoginMutation()

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { identifier, password } = values
    const loginData: LoginCredentials = {
      identifier: identifier,
      password: password
    }
    loginMutation.mutate(loginData, {
      onError: (error) => {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.error?.message || error.message)
        }
        setIsLoading(false)
      }
    })
  }

  return (
    <>
      <Card className="w-[350px] shadow-2xl shadow-blue-300">
        <CardHeader>
          <CardTitle className="text-xl text-center">Logo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-4">
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
                        <FormLabel>Password</FormLabel>
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
                        <FormMessage className="text-xs font-normal" />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="mt-5">
                  <p className="text-xs text-center text-red-600">
                    {isLoading ? (
                      ''
                    ) : (
                      <>
                        {error == 'Invalid identifier or password'
                          ? 'Username or Password Incorect'
                          : error}
                      </>
                    )}
                  </p>
                </div>
                <div className={error ? `mt-5` : `mt-8`}>
                  <Button disabled={isLoading} className="w-full" size="lg" type="submit">
                    {isLoading ? (
                      <>
                        <LoaderCircle size={18} color="white" className="animate-spin" /> loading...
                      </>
                    ) : (
                      'Signin'
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div className="text-center  items-center justify-evenly w-full flex flex-row">
            <div className="border border-x-0 border-b-0  h-auto w-full   border-slate-100"></div>
            <div>
              <p className="text-zinc-600 my-4 mx-6 text-sm">or</p>
            </div>
            <div className="border  border-x-0 border-b-0 h-auto w-full   border-slate-100"></div>
          </div>
          <Button className="w-full" variant="outline" size="lg">
            <Image
              alt="login"
              width="40"
              height="40"
              className="w-[20px] h-[20px]"
              src="/google.png"
            />
            Login with Google
          </Button>
          <div>
            <p className="mt-5 text-sm text-center">
              Don&apos;t have an Account?{' '}
              <Link className="text-blue-500 font-semibold" href="#">
                Signup Now
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
