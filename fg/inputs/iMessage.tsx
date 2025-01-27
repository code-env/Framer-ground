"use client";

import { PlusIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const transitionDebug = {
  type: "easeOut",
  duration: 0.2,
};

const Imessage = () => {
  const [messages, setMessages] = useState<
    {
      id: number;
      text: string;
    }[]
  >([]);
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (newMessage.trim()) {
      const timestamp = new Date().getTime();
      setMessages([...messages, { id: timestamp, text: newMessage }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-full flex-col items-end justify-end pb-6 w-[80%] mx-auto ">
      <AnimatePresence mode="wait">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            layout="position"
            className="z-10 mt-2 max-w-[250px] break-words rounded  border border-border/50 bg-background"
            layoutId={`container-[${messages.length - 1}]`}
            transition={transitionDebug}
          >
            <div className="px-3 py-2 text-[15px] leading-[15px]">
              {message.text}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <div className="mt-4 flex w-full mx-auto">
        <form onSubmit={handleSubmit} className="flex w-full">
          <input
            type="text"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
            className="py- relative w-[250px] flex-grow rounded border bg-primary p-2 text-primary-foreground outline-none"
            placeholder="Type your message"
          />
          <motion.div
            key={messages.length}
            layout="position"
            className="pointer-events-none absolute z-10 flex h-9 w-[250px] items-center overflow-hidden break-words rounded-full bg-gray-200 [word-break:break-word] dark:bg-gray-800"
            layoutId={`container-[${messages.length}]`}
            transition={transitionDebug}
            initial={{ opacity: 0.6, zIndex: -1 }}
            animate={{ opacity: 0.6, zIndex: -1 }}
            exit={{ opacity: 1, zIndex: 1 }}
          >
            <div className="">{newMessage}</div>
          </motion.div>
          <button
            type="submit"
            className="ml-2 flex size-10 items-center justify-center rounded bg-primary text-primary-foreground"
          >
            <PlusIcon className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Imessage;
