"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Testimonial = {
  id: number;
  name: string;
  avatar: string;
  quote: string;
  handle: string;
  link?: {
    name: string;
    url: string;
  };
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chandra Panta Chhetri",
    avatar:
      "https://media.daily.dev/image/upload/s--jyEItTbl--/f_auto/v1731874940/avatars/avatar_7bMGMXLqZfcWec4Z1CnGC",
    handle: "@chandrapantachhetri",
    quote:
      "I love how it follows the headless style of ShadCn. I’m a big fan of copying and pasting only what I need. I quite like the Sparkles & Liquid Morph buttons. Great work!",
  },
  {
    name: "th",
    avatar: "https://avatars.githubusercontent.com/u/73778812?v=4&s=64",
    handle: "@thmhmn",
    quote: "Looks promising, definitely gonna try on my next project!",
  },
  {
    name: "Madhav Anand",
    avatar:
      "https://media.daily.dev/image/upload/s--oEm-N84f--/f_auto/v1726197186/avatars/avatar_ERImo0YI8KazJogyEcaVp",
    handle: "@madhavanand",
    quote:
      "Love it Copy, Paste, Animate ⭐ The everyday tool of Pro Developers 😆",
  },
  {
    name: "oussama zribi",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocJbcDP5LcNo9b7g9ci1CYIJReRHD7p5lZwRqEc6SH1i4zqIlkZQ=s64-c",
    handle: "@ohhzed",
    quote: "The password component is super cool ! great job !",
  },
  {
    name: "Peter Cruckshank",
    avatar:
      "https://media.daily.dev/image/upload/s--ZJhQyKws--/f_auto/v1721235024/avatars/avatar_A9xh33q0QoxtkGoJRCosp",
    handle: "@petecapecod",
    quote:
      "Awesome project, super cool! 🎉 There’s some great animation components already there too. Idea 💡 maybe someone could add syntax highlighting to the site? I would 👍🏻 that.",
  },
  {
    name: "Anmol Baranwal",
    avatar: "https://avatars.githubusercontent.com/u/74038190?v=4&s=64",
    handle: "@anmolbaranwal",
    quote:
      "Whoa! Simple and efficient. Gallery ones and password strength was so cool.",
  },
  {
    name: "Rakesh Kumawat",
    avatar:
      "https://media.daily.dev/image/upload/s--kMO6ppUV--/f_auto/v1732620498/avatars/avatar_DVg3fEoKE476iDIlvvR6q",
    handle: "@rakeshkumawat",
    quote: "thanks for sharing. now i will definitly use this",
  },
  {
    name: "Hammad Sadi",
    avatar:
      "https://media.daily.dev/image/upload/s--G51OIgWi--/f_auto/v1732853500/avatars/avatar_KoOmD2G6fj4AaT6PDXmBX",
    handle: "@hammadsadi",
    quote: "Amazing",
  },
  {
    name: "Tobi",
    avatar: "https://avatars.githubusercontent.com/u/50978173?v=4&s=64",
    handle: "@tobtobtob",
    quote: "Good one, will give it a shot!",
  },
  {
    name: "Davis",
    avatar: "https://avatars.githubusercontent.com/u/6962779?v=4&s=64",
    handle: "@davisnz",
    quote: "So good!",
  },
  {
    name: "bytefer",
    avatar:
      "https://lh3.googleusercontent.com/a-/AFdZucqlbOI8UzgORH9IT5mtLClCpRPYl-bBI9zaDVVd=s100",
    handle: "@bytefer",
    quote:
      "It’s so cool how easy it’s become to use animations. I’ve added it to",
    link: {
      name: "Awesome ShadCn UI",
      url: "https://shadcn.batchtool.com/animations",
    },
  },
  {
    name: "Richard Raphael A",
    avatar: "https://avatars.githubusercontent.com/u/129291730?v=4&s=64",
    handle: "@rich_tech123",
    quote: "Good one 👍 Keep pushing",
  },
].map((testimonial, index) => ({ ...testimonial, id: index }));

interface TestimonialsProps {
  cols?: number;
}

const Testimonials: React.FC<TestimonialsProps> = ({ cols = 3 }) => {
  const splitIntoColumns = (testimonials: Testimonial[], cols: number) => {
    const result: Testimonial[][] = Array.from({ length: cols }, () => []);
    testimonials.forEach((testimonial, index) => {
      result[index % cols].push(testimonial);
    });
    return result;
  };

  const columns = splitIntoColumns(TESTIMONIALS, cols);

  return (
    <div className="flex flex-col gap-4 items-center">
      <h2 className="text-2xl mb-4 font-semibold">
        They use ground than i do.
      </h2>
      <div
        // style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
        className="grid md:grid-cols-2 lg:grid-cols-3"
      >
        {columns.map((column, colIndex) => (
          <div
            key={colIndex}
            className={cn("flex flex-col md:border-r", {
              "md:border-r-0": colIndex === columns.length - 1,
            })}
          >
            {column.map((testimonial, index) => (
              <motion.div
                key={index}
                className={cn("md:p-4 p-2 border-b", {
                  "border-b-0": index === column.length - 1,
                })}
              >
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="size-12 rounded-xl mb-2 object-cover min-w-12 border"
                  />
                  <h3 className="font-bold flex flex-col">
                    <span>{testimonial.name}</span>
                    <a
                      href={`https://app.daily.dev/${testimonial.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground"
                    >
                      {testimonial.handle}
                    </a>
                  </h3>
                </div>
                <p>{testimonial.quote}</p>
                {testimonial.link && (
                  <a
                    href={testimonial.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground"
                  >
                    {testimonial.link.name}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
