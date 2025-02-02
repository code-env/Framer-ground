"use client";

import { createComponentsLink } from "@/config/docs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";

interface AllComponentsProps {
  category: string;
  single?: boolean;
}

const AllComponents = ({ category, single }: AllComponentsProps) => {
  const items = createComponentsLink(category.toLocaleLowerCase());

  if (items.length === 0) return <NoComponentFound category={category} />;

  return (
    <div className="space-y-4">
      {!single && (
        <h1 className="first-letter:uppercase text-4xl font-bold">
          {category}
        </h1>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
        {items.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
            className="p-1 border border-border/50 transition-colors duration-300 rounded-xl hover:bg-muted/10 group"
          >
            <div className="group-hover:bg-muted/20 transition-colors duration-300 border rounded-sm h-32 flex items-end p-5">
              <h3 className="text-sm font-medium">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const NoComponentFound = ({ category }: AllComponentsProps) => {
  const router = useRouter();

  return (
    <div className="my-4 border h-[500px] flex items-center justify-center text-center rounded-3xl flex-col gap-5">
      <h1>
        Nothing found for{" "}
        <span className="font-semibold underline">{category}</span> maybe still
        under construction.
      </h1>
      <div className="space-x-4">
        <Button size="lg" onClick={() => router.back()}>
          Go back!
        </Button>
        <Link
          href="/"
          className={buttonVariants({ size: "lg", variant: "secondary" })}
        >
          Go to home
        </Link>
      </div>
    </div>
  );
};

export default AllComponents;
