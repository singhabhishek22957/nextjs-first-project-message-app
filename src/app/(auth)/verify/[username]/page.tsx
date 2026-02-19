"use client";

import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { verifySchema } from "@/schemas/verify.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { Loader2 } from "lucide-react";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/apiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
const VerifyAccount = () => {
  const router = useRouter();
  const param = useParams<{ username: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post("/api/verify-code", {
        username: param.username,
        code: data.code,
      });

      toast.success(response.data.message);
      router.replace("sign-in");
    } catch (error) {
      console.error("Error in signup of user ");
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessages =
        axiosError.response?.data.message ?? "Something went wrong";

      toast.error(errorMessages);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" flex justify-center inset-ring-accent min-h-screen bg-gray-100 ">
      <div className=" w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md ">
        <div className=" text-center">
          <h1 className=" text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify your account
          </h1>
          <p className=" mb-4">
            {" "}
            Enter the code sent to your email to verify your account
          </p>
          <Form {...form}>
            <form
              action=""
              onSubmit={form.handleSubmit(onSubmit)}
              className=" space-y-8"
            >
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification code </FormLabel>
                    <FormControl>
                      <Input placeholder="Verification code" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className=" mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
