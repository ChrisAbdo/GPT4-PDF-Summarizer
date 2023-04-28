import React from "react";
import { useTheme } from "next-themes";
import { Laptop, Moon, Sun, CalendarDays, Github } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="flex -m-1.5 p-1.5">
            <span className="sr-only">AI-PDF-SUMMARY</span>

            <HoverCard>
              <HoverCardTrigger asChild>
                <Button variant="link">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                  <h1 className="text-2xl font-bold">AI-PDF-SUMMARY</h1>
                </Button>
              </HoverCardTrigger>
              <HoverCardContent className="w-80">
                <div className="flex justify-between space-x-4">
                  <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/66892203?v=4" />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      Built by Chris Abdo
                    </h4>
                    <p className="text-sm">
                      Check out my projects on{" "}
                      <a
                        href="https://twitter.com/chrisabdo"
                        rel="noopener noreferrer"
                        target="_blank"
                        className="text-blue-500 hover:underline"
                      >
                        Twitter
                      </a>{" "}
                      and{" "}
                      <a
                        href="
                      https://www.github.com/chrisabdo"
                        rel="noopener noreferrer"
                        target="_blank"
                        className=" hover:underline"
                      >
                        GitHub
                      </a>
                      .
                    </p>
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>

        <div className="lg:flex lg:flex-1 lg:justify-end lg:space-x-2">
          <Button
            variant="outline"
            onClick={() => window.open("https://www.github.com/chrisabdo")}
          >
            <Github className="mr-2 h-4 w-4" /> Star on Github
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Sun className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-4">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Light</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Dark</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <Laptop className="mr-2 h-4 w-4" />
                  <span>System</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}
