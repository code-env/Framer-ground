import React, { memo, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import NumberFlow from "@number-flow/react";

import { cn } from "@/lib/utils";

const initialValues = [
  {
    title: "The Art of Clean Code",
    link: "#clean-code",
    description: [
      "Well-structured code stands like a masterpiece, its elegant architecture a testament to careful design. Clean code embodies simplicity, readability, and maintainability.",
      "Developers are drawn to beautiful code, seeking to craft solutions that are both efficient and aesthetically pleasing.",
    ],
  },
  {
    title: "Design Patterns",
    link: "#design-patterns",
    description: [
      "Proven solutions to common problems, design patterns form the building blocks of robust software. These reusable templates help create flexible and maintainable systems.",
      "From Singletons to Factories to Observers, these patterns represent decades of collective programming wisdom.",
      "Each pattern serves as a powerful tool in a developer's arsenal, ready to solve complex architectural challenges.",
    ],
  },
  {
    title: "Database Systems",
    link: "#database-systems",
    description: [
      "The foundation of modern applications, databases store and organize the digital world's information. From relational to NoSQL, each type offers unique advantages for different use cases.",
    ],
  },
  {
    title: "Network Protocols",
    link: "#network-protocols",
    description: [
      "The invisible highways of the internet, protocols enable seamless communication between systems. From TCP/IP to HTTP, these standards form the backbone of our connected world.",
      "Understanding networking is crucial for building distributed systems and ensuring reliable data transmission.",
    ],
  },
  {
    title: "Algorithm Analysis",
    link: "#algorithm-analysis",
    description: [
      "The science of efficiency in computing, where every operation counts. Algorithm analysis helps us understand performance and optimize our code.",
      "Big O notation provides a common language for discussing computational complexity.",
      "From sorting algorithms to graph traversal, mastering algorithmic thinking is essential for solving complex problems.",
    ],
  },
  {
    title: "Frontend Development",
    link: "#frontend-development",
    description: [
      "Where code meets user experience, creating interfaces that delight and empower. Modern frameworks and libraries enable rich, interactive applications.",
      "Responsive design and accessibility ensure applications work seamlessly across all devices and users.",
    ],
  },
  {
    title: "Backend Architecture",
    link: "#backend-architecture",
    description: [
      "The engine room of applications, where business logic and data processing come together. Scalable backends require careful consideration of performance, security, and maintainability.",
      "Microservices, serverless, and monoliths each offer different approaches to solving backend challenges.",
    ],
  },
  {
    title: "Cloud Computing",
    link: "#cloud-computing",
    description: [
      "The modern infrastructure powering today's applications. Cloud platforms offer unprecedented scalability and flexibility.",
      "From IaaS to PaaS to SaaS, cloud services provide building blocks for creating robust, distributed systems.",
    ],
  },
  {
    title: "Security Practices",
    link: "#security-practices",
    description: [
      "The critical art of protecting systems and data from threats. Security must be built into every layer of the application stack.",
      "Understanding common vulnerabilities and best practices is essential for building trustworthy applications.",
    ],
  },
  {
    title: "Legacy Systems",

    link: "#legacy-systems",
    description: [
      "The historical foundations of many organizations, legacy systems require special care and understanding. Maintaining and modernizing these systems presents unique challenges.",
      "These systems often contain critical business logic and require careful consideration when updating.",
    ],
  },
  {
    title: "Testing Strategies",
    link: "#testing-strategies",
    description: [
      "The foundation of reliable software, testing ensures code behaves as expected. From unit tests to integration tests to end-to-end testing, each layer provides different guarantees.",
      "Test-driven development and continuous integration help maintain code quality throughout development.",
    ],
  },
  {
    title: "DevOps Practices",
    link: "#devops-practices",
    description: [
      "Bridging development and operations, DevOps practices streamline software delivery. Automation, monitoring, and continuous deployment enable rapid, reliable releases.",
      "From Docker to Kubernetes, modern tools enable efficient application deployment and scaling.",
    ],
  },
  {
    title: "Performance Optimization",
    link: "#performance-optimization",
    description: [
      "The art of making code run faster and more efficiently. Understanding bottlenecks and optimization techniques is crucial for building high-performance applications.",
      "Profiling, caching, and algorithmic improvements all play important roles in achieving optimal performance.",
    ],
  },
];

export default function ScrollCount() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <MotionConfig transition={{ duration: 0.7, type: "spring", bounce: 0.25 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute inset-0 z-30 bg-background/30 backdrop-blur-lg rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
      <div className="absolute  left-1/2  bottom-3 z-40 -translate-x-1/2">
        <motion.div
          layout
          initial={{
            height: 44,
            width: 240,
          }}
          animate={{
            height: open ? "auto" : 44,
            width: open ? 420 : 280,
            borderRadius: open ? 22 : 11,
          }}
          className="bg-primary relative cursor-pointer overflow-hidden text-primary-foreground"
          style={{ borderRadius: 22 }}
        >
          <header
            className="flex h-11 cursor-pointer items-center gap-2 px-4"
            onClick={() => setOpen(!open)}
          >
            <ProgressCircle containerRef={containerRef} />
            <h1 className="grow font-bold">Software Engineering</h1>
            <ScrollPercentage containerRef={containerRef} />
          </header>
          <div className="mt-2 flex flex-col gap-2 px-4 pb-4">
            {initialValues.map((item, index) => (
              <Link
                key={index + item.title}
                className="hover:text-primary-foreground/80 whitespace-nowrap text-sm"
                href={item.link}
                onClick={() => {
                  setOpen(false);
                  setSelected(item.link);
                }}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
      <Sections selected={selected} containerRef={containerRef} />
    </MotionConfig>
  );
}

const Sections = memo(
  ({
    selected,
    containerRef,
  }: {
    selected: string;
    containerRef: React.RefObject<HTMLDivElement>;
  }) => {
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
      const container = containerRef.current;
      if (!container || !selected) return;

      const handleScroll = (e: Event) => {
        if (e.target !== container) return;

        setIsScrolling(true);

        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, [selected]);

    return (
      <div
        ref={containerRef}
        className="p-10 rounded-lg relative size-full overflow-y-auto"
      >
        {initialValues.map((item) => (
          <motion.div
            id={item.link.slice(1)}
            key={item.link}
            className={cn("mb-12 scroll-mt-48")}
            animate={{
              opacity:
                !isScrolling && selected === item.link
                  ? [0.5, 0.6, 0.8, 1, 0.8, 0.6, 0.5, 1]
                  : 1,
              transition: {
                duration: 0.5,
                delay: 0.2,
              },
            }}
          >
            <h1 className="mb-4 text-2xl font-bold">{item.title}</h1>
            {item.description.map((description, index) => (
              <p className="mb-4" key={index}>{description}</p>
            ))}
          </motion.div>
        ))}
      </div>
    );
  }
);

Sections.displayName = "Sections"

function useScroll(containerRef: React.RefObject<HTMLDivElement>) {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateContainerScroll = () => {
      const scrollPercentage =
        container.scrollTop / (container.scrollHeight - container.clientHeight);
      setScrollPercentage(scrollPercentage);
    };

    container.addEventListener("scroll", updateContainerScroll);
    updateContainerScroll(); // Initial call to set the initial scroll position

    return () => container.removeEventListener("scroll", updateContainerScroll);
  }, [containerRef]);

  return scrollPercentage;
}

function ProgressCircle({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  // const percentage = useScroll(containerRef);

  return <div className="size-5 bg-red-500 rounded-full" />;
}

function ScrollPercentage({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const percentage = useScroll(containerRef);

  return (
    <>
      <NumberFlow
        value={percentage}
        format={{ style: "percent" }}
        locales="en-US"
      />
    </>
  );
}
