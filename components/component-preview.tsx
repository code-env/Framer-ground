"use client";

import * as React from "react";

import { CopyButton } from "@/components/copy-button";
import { Icons } from "@/components/icons";
import { Index } from "@/config";
import { cn } from "@/lib/utils";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  extractClassName?: boolean;
  extractedClassNames?: string;
  align?: "center" | "start" | "end";
  description?: string;
  height?: number;
}

function CodeView({ children }: { children: React.ReactNode }) {
  const [codeString, setCodeString] = React.useState<string | null>(null);
  const codeRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (codeRef.current?.textContent) {
      setCodeString(codeRef.current?.textContent);
    }
  }, []);

  return (
    <>
      <div
        ref={codeRef}
        className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[350px] [&_pre]:overflow-auto"
      >
        {children}
      </div>
      {Boolean(codeString) && (
        <div className="absolute -right-2 top-8 flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <CopyButton
              value={codeString ?? ""}
              variant="outline"
              className="h-7 w-7 text-foreground opacity-100 hover:bg-muted hover:text-foreground [&_svg]:size-3.5"
            />
          </div>
        </div>
      )}
    </>
  );
}

export function ComponentPreview({
  name,
  className,
  height,
  ...props
}: ComponentPreviewProps) {
  const [minHeight] = React.useState<number>(350);

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;

    if (!Component) {
      return (
        <div className="h-full w-full flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            Component{" "}
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              {name}
            </code>{" "}
            not found in registry.
          </p>
        </div>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div className={cn("group relative bg-muted/20", className)} {...props}>
      <div
        className={cn(
          "preview relative w-full max-w-full border rounded-xl p-2"
        )}
        style={{
          height: `${Math.max(100, height ? minHeight + height : minHeight)}px`,
        }}
      >
        <React.Suspense
          fallback={
            <div className="flex items-center text-sm text-muted-foreground">
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </div>
          }
        >
          {Preview}
        </React.Suspense>
      </div>
    </div>
  );
}
