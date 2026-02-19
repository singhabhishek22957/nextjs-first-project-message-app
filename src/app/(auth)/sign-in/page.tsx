"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { signInSchema } from "@/schemas/signIn.schema";
import { signIn } from "next-auth/react";
import { useState } from "react";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // zod implementation
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const response = await signIn('credentials',{
      
      identifier:data.identifier,
      password:data.password,
      redirect:false,
    })

    if(response?.error){
      toast.error(response.error)
    }

    if(response?.url){
      router.replace('/dashboard')
    }

    setIsSubmitting(false);
    
  };

  return (
    <div className=" flex justify-center items-center min-h-screen bg-gray-100">
      <div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className=" text-center ">
          <h1 className=" text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mystery Message
          </h1>
          <p className=" m-4"> Sign in to start your anonymous adventure </p>
        </div>

        <Form {...form}>
          <form
            className=" space-y-6 "
            onSubmit={form.handleSubmit(onSubmit)}
          >
           
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email/Username"
                      {...field}
                    />
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
                  <FormLabel>Password </FormLabel>
                  <FormControl>
                    <Input
                    type="password"
                      placeholder="Password"
                      {...field}
                      
                    />
                  </FormControl>
                 
                 
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}  >
              {isSubmitting ? <>
              <Loader2 className=" mr-2 h-4 w-4 animate-spin"/> Please wait
              </> : "Sign in"}
            </Button>
          </form>
        </Form>
        <div className=" text-center mt-4">
          <p>Don&apos;t have an account?{' '}</p>
          <Link href={"/sign-up"} className=" text-blue-600 hover:text-blue-800">
            Sign up
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
