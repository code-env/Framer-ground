import { ReactNode } from "react";

import DocsSidebar from "@/components/shared/docs-sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/config/docs";

const DocsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="border-b border-border">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-4 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-6 py-6 pr-6 lg:py-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <ScrollArea className="h-[calc(100vh-3.5rem)] pr-6 lg:py-10">
            <DocsSidebar items={docsConfig.sidebarNav} />
          </ScrollArea>
        </aside>
        {children}
      </div>
    </div>
  );
};

export default DocsLayout;
