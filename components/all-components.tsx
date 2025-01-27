import React from "react";
import { allDocs } from "contentlayer/generated";
import { createComponentsLink } from "@/config/docs";
import Link from "next/link";

interface AllComponentsProps {
  category: string;
}

const AllComponents = ({ category }: AllComponentsProps) => {
  const items = createComponentsLink(category);

  if (items.length === 0) return;

  return (
    <div className="space-y-4">
      <h1 className="first-letter:uppercase text-4xl font-bold">{category}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4">
        {items.map((item, idx) => (
          <Link
            href={item.href}
            key={idx}
            className="p-1 border border-border/50 transition-colors duration-300 rounded-xl hover:bg-muted/10 group"
          >
            <div className="group-hover:bg-muted/20 transition-colors duration-300 border rounded-lg h-32 flex items-end p-5">
              <h3 className="text-sm font-medium">{item.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllComponents;
