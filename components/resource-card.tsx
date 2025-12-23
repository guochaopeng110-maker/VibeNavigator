'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { Resource } from "@/types/resource";
import { generateEnvFormat, generateRooCode } from "@/lib/config-generators";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success(`${type} copied to clipboard!`);
    } catch (error) {
      toast.error(`Failed to copy ${type}`);
      console.error("Failed to copy:", error);
    }
  };

  const handleCopyEnv = () => {
    handleCopy(generateEnvFormat(resource), ".env config");
  };

  const handleCopyRooCode = () => {
    handleCopy(generateRooCode(resource), "Roo Code config");
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const modelName = resource.config.model;
  const baseUrl = resource.config.baseUrl;
  const apiKey = resource.config.apiKey === "sk-xxx" ? "<YOUR_API_KEY>" : resource.config.apiKey;

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{resource.name}</CardTitle>
        <CardDescription className="text-zinc-400">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Provider:</span>
            <span className="text-sm font-medium">{resource.provider}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Type:</span>
            <span className="text-sm font-medium capitalize">{resource.type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Status:</span>
            <span className={`text-sm font-medium capitalize ${resource.status === 'active' ? 'text-green-400' : resource.status === 'beta' ? 'text-yellow-400' : 'text-red-400'}`}>
              {resource.status}
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Config:</h4>
            <div className="bg-zinc-800 p-3 rounded-md text-xs font-mono overflow-x-auto">
              <pre>{JSON.stringify(resource.config, null, 2)}</pre>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full bg-zinc-700 hover:bg-zinc-600">
              Copy Config ▾
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-800 border-zinc-700 text-white">
            <DropdownMenuLabel>Copy as</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />
            <DropdownMenuItem 
              className="hover:bg-zinc-700 cursor-pointer" 
              onClick={handleCopyEnv}
            >
              Copy .env
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-zinc-700 cursor-pointer" 
              onClick={handleOpenDialog}
            >
              Connect to Cursor
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-zinc-700 cursor-pointer" 
              onClick={handleCopyRooCode}
            >
              Copy for Roo Code
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>

      {/* Cursor Connection Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Cursor Connection Setup</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Model Name */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm text-zinc-400 mb-1">Model Name</div>
                <div className="bg-zinc-800 p-2 rounded-md text-sm font-mono">
                  {modelName}
                </div>
              </div>
              <Button 
                className="ml-4 bg-zinc-700 hover:bg-zinc-600 text-sm" 
                onClick={() => handleCopy(modelName, "Model Name")}
              >
                Copy
              </Button>
            </div>

            {/* Base URL */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm text-zinc-400 mb-1">Base URL</div>
                <div className="bg-zinc-800 p-2 rounded-md text-sm font-mono">
                  {baseUrl}
                </div>
              </div>
              <Button 
                className="ml-4 bg-zinc-700 hover:bg-zinc-600 text-sm" 
                onClick={() => handleCopy(baseUrl, "Base URL")}
              >
                Copy
              </Button>
            </div>

            {/* API Key */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm text-zinc-400 mb-1">API Key</div>
                <div className="bg-zinc-800 p-2 rounded-md text-sm font-mono">
                  {apiKey}
                </div>
              </div>
              <Button 
                className="ml-4 bg-zinc-700 hover:bg-zinc-600 text-sm" 
                onClick={() => handleCopy(apiKey, "API Key")}
              >
                Copy
              </Button>
            </div>

            {/* Guide */}
            <div className="mt-6 text-xs text-zinc-400 italic">
              Go to Cursor Settings (⌘+,) -&gt; Models -&gt; Add Model to paste these values.
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}