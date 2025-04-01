import { Button } from '@/components/ui/button'
import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CheckCheck } from 'lucide-react'

function Page() {
  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="monthly" className="w-full">
        <TabsList className="w-full justify-start h-[60px]">
          <TabsTrigger className="text-lg  py-2 w-1/2" value="monthly">
            Monthly
          </TabsTrigger>
          <TabsTrigger className="text-lg  py-2 w-1/2" value="annual">
            Annual <p className="text-xs text-red-500 pl-3 font-semibold">Flat 50% off</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="monthly" className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="w-full border p-4 rounded-2xl opacity-60">
              <p className="text-xl mb-4   font-semibold">Free</p>
              <p className="text-3xl font-bold">
                $0<span className="text-sm">/month</span>
              </p>
              <p className="text-xs opacity-50 mt-1">USD $.00 billed monthly</p>
              <p className="font-semibold mt-5 text-sm">1,000 characters per month</p>
              <Button className="w-full my-5" disabled variant="secondary" size="lg">
                your current plan
              </Button>
              <ul>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  1,000 characters per month
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Access to all ultra-realistic and premium voices
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Commercial use
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Voice cloning feature available for free
                </li>
              </ul>
            </div>
            <div className="w-full border p-4 rounded-2xl">
              <p className="text-xl mb-4   font-semibold">Creator</p>
              <p className="text-3xl font-bold">
                $29<span className="text-sm">/month</span>
              </p>
              <p className="text-xs opacity-50 mt-1">USD $29.00 billed monthly</p>
              <p className="font-semibold mt-5 text-sm">25,000 characters per month</p>
              <Button className="w-full my-5" variant="default" size="lg">
                Get Plan Now
              </Button>
              <ul>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  25,000 characters per month
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Access to all ultra-realistic and premium voices
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Non-commercial use with attribution required
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Voice cloning feature available for free
                </li>
              </ul>
            </div>
            <div className="w-full border  border-green-600 p-4 rounded-2xl bg-green-200 dark:bg-green-600 shadow-2xl shadow-green-100 dark:shadow-green-900">
              <p className="text-xl mb-4   font-semibold">Unlimited</p>
              <p className="text-3xl font-bold">
                $99<span className="text-sm">/month</span>
              </p>
              <p className="text-xs opacity-50 mt-1">USD $99.00 billed monthly</p>
              <p className="font-semibold mt-5 text-sm">Unlimited characters per month</p>
              <Button className="w-full my-5" variant="default" size="lg">
                Get Plan Now
              </Button>
              <ul>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Unlimited characters per month
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Access to all ultra-realistic and premium voices
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Non-commercial use with attribution required
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Voice cloning feature available for free
                </li>
              </ul>
            </div>
            <div className="w-full border p-4 rounded-2xl">
              <p className="text-xl mb-4   font-semibold">Enterprice</p>
              <p className="text-3xl font-bold">Custom pricing</p>
              <p className="text-xs opacity-50 mt-1">Please Contact us</p>
              <p className="font-semibold mt-5 text-sm">Please Contact us</p>
              <Button className="w-full my-5" variant="secondary" size="lg">
                Contact Sales
              </Button>
              <ul>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Unlimited characters per month
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Access to all ultra-realistic and premium voices
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Non-commercial use with attribution required
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Voice cloning feature available for free
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="annual" className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="w-full border p-4 rounded-2xl opacity-60">
              <p className="text-xl mb-4   font-semibold">Free</p>
              <p className="text-3xl font-bold">
                $0<span className="text-sm">/month</span>
              </p>
              <p className="text-xs opacity-50 mt-1">USD $.00 billed monthly</p>
              <p className="font-semibold mt-5 text-sm">1,000 characters per month</p>
              <Button className="w-full my-5" disabled variant="secondary" size="lg">
                your current plan
              </Button>
              <ul>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  1,000 characters per month
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Access to all ultra-realistic and premium voices
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Commercial use
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Voice cloning feature available for free
                </li>
              </ul>
            </div>
            <div className="w-full border p-4 rounded-2xl">
              <p className="text-xl mb-4   font-semibold">Creator</p>
              <p className="text-3xl font-bold">
                $21<span className="text-sm">/month</span>
              </p>
              <p className="text-xs opacity-50 mt-1">USD $252.00 billed yearly</p>
              <p className="font-semibold mt-5 text-sm">3 million characters per year</p>
              <Button className="w-full my-5" variant="default" size="lg">
                Get Plan Now
              </Button>
              <ul>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />3 million characters per year
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Access to all ultra-realistic and premium voices
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Non-commercial use with attribution required
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Voice cloning feature available for free
                </li>
              </ul>
            </div>
            <div className="w-full border  border-green-600 p-4 rounded-2xl bg-green-200 dark:bg-green-600 shadow-2xl shadow-green-100 dark:shadow-green-900">
              <p className="text-xl mb-4   font-semibold">Unlimited</p>
              <p className="text-3xl font-bold">
                <span className="line-through opacity-50">$99</span>$49
                <span className="text-sm">/month</span>
              </p>
              <p className="text-xs opacity-50 mt-1">USD $588.00 billed yearly</p>
              <p className="font-semibold mt-5 text-sm">Unlimited characters per year</p>
              <Button className="w-full my-5" variant="default" size="lg">
                Get Plan Now
              </Button>
              <ul>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Unlimited characters per year
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Access to all ultra-realistic and premium voices
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Non-commercial use with attribution required
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Voice cloning feature available for free
                </li>
              </ul>
            </div>
            <div className="w-full border p-4 rounded-2xl">
              <p className="text-xl mb-4   font-semibold">Enterprice</p>
              <p className="text-3xl font-bold">Custom pricing</p>
              <p className="text-xs opacity-50 mt-1">Please Contact us</p>
              <p className="font-semibold mt-5 text-sm">Please Contact us</p>
              <Button className="w-full my-5" variant="secondary" size="lg">
                Contact Sales
              </Button>
              <ul>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Unlimited characters per year
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Access to all ultra-realistic and premium voices
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Non-commercial use with attribution required
                </li>
                <li className="text-sm flex py-1 gap-x-2">
                  <CheckCheck className="text-green-500" size={20} />
                  Voice cloning feature available for free
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Page
