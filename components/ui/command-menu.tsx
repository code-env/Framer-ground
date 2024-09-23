"use client";

import { useCallback, useEffect } from "react";
import { allDocs } from "contentlayer/generated";
import { useRouter } from "next/navigation";
import { PaletteIcon } from "lucide-react";

import { useProvider } from "@/context/command-menu";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command-menu-components";
import { ScrollArea } from "./scroll-area";

type Groups = Array<{
  heading: string;
  actions: Array<{
    name: string;
    icon: JSX.Element;
    onSelect?: () => void | Promise<void | boolean>;
  }>;
}>;

export function CommandMenu() {
  const { showCommandMenu, setShowCommandMenu } = useProvider();
  console.log("showCommandMenu: ", showCommandMenu);

  const router = useRouter();

  useEffect(() => {
    function down(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setShowCommandMenu((prevState) => !prevState);
      }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setShowCommandMenu]);

  const forwardToRoute = useCallback(
    (route: string) => {
      router.replace(route);
      setShowCommandMenu(false);
    },
    [router, setShowCommandMenu]
  );

  const groups: Groups = [
    {
      heading: "Components",
      actions: allDocs.map((item) => {
        return {
          name: item.title,
          icon: <PaletteIcon />,
          onSelect: () => forwardToRoute(item.url),
        };
      }),
    },
  ];

  const firstGroup = groups[0];

  return (
    <CommandDialog open={showCommandMenu} onOpenChange={setShowCommandMenu}>
      <CommandInput placeholder="Type to search ↵" />
      <CommandList>
        <ScrollArea className="h-[300px]">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading={firstGroup.heading}>
            {firstGroup.actions.map((action, index) => (
              <CommandItem key={index} onSelect={action.onSelect}>
                {action.icon}
                {action.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    </CommandDialog>
  );
}
