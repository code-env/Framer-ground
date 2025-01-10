"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { motion, MotionConfig, type Transition } from "framer-motion";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useClickOutside from "@/hooks/click-outsite";
import { toast } from "sonner";

const TRANSITION: Transition = {
  duration: 0.5,
  type: "spring",
  bounce: 0.05,
  ease: "easeInOut",
};

const schema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  message: z.string().nonempty(),
});

type SchemaType = z.infer<typeof schema>;

const Feedback = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <MotionConfig transition={TRANSITION}>
      <div
        className=" fixed bottom-10 right-10 text-primary-foreground z-[999]"
        ref={ref}
      >
        {open ? (
          <FeedbackForm setOpen={setOpen} />
        ) : (
          <motion.button
            layoutId="feedback-component"
            className="size-12 bg-primary rounded-full flex items-center justify-center"
            onClick={() => setOpen(true)}
            style={{
              borderRadius: 24,
            }}
            key="feedback-button"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text size-5"
            //   layoutId="feedback-icon"
            >
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </motion.svg>
          </motion.button>
        )}
        <div></div>
      </div>
    </MotionConfig>
  );
};

interface FeedbackFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const FeedbackForm = ({ setOpen }: FeedbackFormProps) => {
  const form = useForm<SchemaType>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: SchemaType) => {
    const description = Object.entries(data)
      .map((value) => `${value[0]}: ${value[1]}`)
      .join("\n");

    const response = await fetch(
      "https://discordapp.com/api/webhooks/1322343958843494498/Xlq9ff8X3Sv0pRyQmcp5RmImsSbZEQJ8CzaF_2aA2YsDt-8nCeFzpvCADxPNBY7VqvBQ",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: "Message Received",
          tts: false,
          color: "white",
          embeds: [
            {
              title: "Contact Form",
              description,
            },
          ],
        }),
      }
    );

    if (response.ok) {
      toast.success("Thanks for those words!");
      form.reset();
      setOpen(false);
    } else {
      toast.error("Oups Error! Try again");
    }
  };

  const { isSubmitting } = form.formState;
  return (
    <motion.div
      layoutId="feedback-component"
      className="w-96 h-full bg-primary"
      style={{
        borderRadius: 24,
      }}
    >
      <div className="h-12 border-b border-white/20 flex items-center justify-between pl-4 pr-2">
        <p className="">Feedback</p>
        <motion.button
          className="size-8 flex items-center justify-center hover:bg-secondary rounded-full  hover:text-secondary-foreground"
          onClick={() => setOpen(false)}
          layoutId="feedback-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 p-4"
        >
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      {...field}
                      className="border-white/20 bg-muted/20"
                      type="text"
                      placeholder="Enter your name"
                      disabled={isSubmitting}
                    />
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
                  <Input
                    {...field}
                    className="border-white/20 bg-muted/20"
                    placeholder="Enter your email"
                    disabled={isSubmitting}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <Textarea
                    {...field}
                    className="border-white/20 bg-muted/20 resize-none"
                    placeholder="Enter your message"
                    disabled={isSubmitting}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-background text-primary hover:bg-primary-foreground hover:text-primary"
          >
            Submit
          </Button>
        </form>
      </Form>
    </motion.div>
  );
};

export default Feedback;
