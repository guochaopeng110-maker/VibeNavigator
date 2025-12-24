'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

interface ResourcePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
  language?: 'json' | 'markdown';
}

export default function ResourcePreview({
  open,
  onOpenChange,
  title,
  content,
  language = 'markdown',
}: ResourcePreviewProps) {
  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success('Full content copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy content');
      console.error('Failed to copy:', error);
    }
  };

  const renderContent = () => {
    if (language === 'json') {
      try {
        const parsedContent = JSON.parse(content);
        const formattedContent = JSON.stringify(parsedContent, null, 2);
        return (
          <pre className="bg-zinc-800 p-4 rounded-md overflow-auto max-h-[70vh] text-sm font-mono">
            <code>{formattedContent}</code>
          </pre>
        );
      } catch (error) {
        return (
          <pre className="bg-zinc-800 p-4 rounded-md overflow-auto max-h-[70vh] text-sm font-mono">
            <code>{content}</code>
          </pre>
        );
      }
    }

    return (
      <div className="bg-zinc-800 p-4 rounded-md overflow-auto max-h-[70vh]">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {open && (
        <SheetContent className="bg-zinc-900 border-zinc-800 text-white w-full sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold">{title}</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6">
            {renderContent()}
          </div>
          
          <SheetFooter className="mt-6 flex justify-end">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white" 
              onClick={handleCopyContent}
            >
              Copy Full Content
            </Button>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
}