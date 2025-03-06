'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
          <CardTitle className="text-xl">Login</CardTitle>
          <CardDescription className="opacity-50">Sign in to manage your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="identifier"
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
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-xs font-normal" />
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} className="w-full" size="lg" type="submit">
                  {isLoading ? (
                    <>
                      <LoaderCircle size={18} color="white" className="animate-spin" /> loading...
                    </>
                  ) : (
                    'Signin'
                  )}
                </Button>
              </form>
            </Form>
            <div>
              <p className="text-xs  mb-2 text-center text-red-600">
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
          </div>
          <div className="text-center">
            <p className="text-zinc-600 mb-4 text-sm">Or</p>
            <Button className="w-full" variant="outline" size="lg">
              <Image
                alt="login"
                width="40"
                height="40"
                className="w-[20px] h-[20px]"
                src="/google.png"
              />
              Signup with Google
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
