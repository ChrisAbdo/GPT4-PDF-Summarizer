import type { NextPage } from "next";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

import Navbar from "@/components/navbar";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Head from "next/head";
import { Loader2, Terminal } from "lucide-react";
import Footer from "@/components/footer";

interface GenerateBioResponse {
  text: string;
}

const Home: NextPage = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedBios, setGeneratedBios] = useState<string>("");
  const [pdfText, setPdfText] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [selectedIntensity, setSelectedIntensity] = useState<string>("");

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (!newFile) return;
    setFile(newFile);
    await handleExtractText(newFile);
  };

  const handleExtractText = async (pdfFile: File) => {
    if (!pdfFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(pdfFile);
    reader.onload = async () => {
      const base64 = reader.result?.toString().split(",")[1];
      if (!base64) return;
      const res = await fetch("/api/extract-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64 }),
      });

      if (res.ok) {
        const data: GenerateBioResponse = await res.json();
        console.log("Extracted text:", data.text);
        setPdfText(data.text);
      } else {
        console.error("Failed to extract text from PDF.");
      }
    };
  };

  const resetStates = () => {
    setLoading(false);
    setGeneratedBios("");
    setPdfText("");
    setFile(null);
    setSelectedIntensity("");
    toast({
      title: "Reset successful.",
      description: "Please upload a new PDF file.",
    });
  };

  const bioRef = useRef<HTMLDivElement | null>(null);

  const scrollToBios = () => {
    if (bioRef.current !== null) {
      bioRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const prompt =
    "please summarize the following text with" +
    selectedIntensity +
    "intensity: " +
    pdfText;

  const generateBio = async (e: FormEvent) => {
    e.preventDefault();
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }
    scrollToBios();
    setLoading(false);
  };

  return (
    <div>
      <Head>
        <title>PDF Summarizer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center items-center ">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Summarize any PDF in seconds
            </h1>
          </div>

          <div className="mt-10 sm:mt-12">
            <div className="flex justify-center">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Summarize any PDF File</CardTitle>
                  <CardDescription>In just a few clicks!</CardDescription>
                </CardHeader>

                <CardContent>
                  {!generatedBios && !loading && (
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="file">PDF File</Label>
                          <Input
                            id="file"
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                              handleFileChange(e);
                            }}
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="name">Summarizer Intensity</Label>
                          <Select
                            onValueChange={(value) =>
                              setSelectedIntensity(value)
                            }
                            aria-label="Understanding Level"
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select" />

                              <SelectContent position="popper">
                                <SelectItem value="basic understanding">
                                  Basic Understanding
                                </SelectItem>
                                <SelectItem value="deep understanding">
                                  Deep Understanding
                                </SelectItem>
                                <SelectItem value="completely disected">
                                  Completely Disected
                                </SelectItem>
                              </SelectContent>
                            </SelectTrigger>
                          </Select>
                        </div>
                      </div>
                    </form>
                  )}

                  {generatedBios && (
                    <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                      <div
                        className="rounded-xl shadow-md p-4 transition cursor-copy border"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedBios);
                        }}
                      >
                        <p>{generatedBios}</p>
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between">
                  <Button variant="ghost" onClick={resetStates}>
                    Reset
                  </Button>
                  {!loading && (
                    <Button
                      disabled={!pdfText || !selectedIntensity}
                      onClick={(e) => generateBio(e)}
                    >
                      Summarize
                    </Button>
                  )}
                  {loading && (
                    <Button disabled>
                      <Loader2 className="animate-spin h-5 w-5" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
