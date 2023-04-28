import "@/src/styles/globals.css";
import type { AppProps } from "next/app";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  );
}
