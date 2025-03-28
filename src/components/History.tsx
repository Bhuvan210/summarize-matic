
import React from 'react';
import { Clock, Trash2, FileText } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { SummarizerResponse } from '@/services/summarizer';
import { cn } from '@/lib/utils';

interface HistoryProps {
  historyItems: Array<{id: string; title: string; summary: SummarizerResponse}>;
  onSelectItem: (summary: SummarizerResponse) => void;
  onClearHistory: () => void;
}

const History = ({ historyItems, onSelectItem, onClearHistory }: HistoryProps) => {
  return (
    <Sidebar variant="inset" className="border-r border-border/40">
      <SidebarHeader className="flex flex-row items-center justify-between p-4 border-b border-border/40">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-base font-medium text-foreground">History</h2>
        </div>
        {historyItems.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearHistory}
            className="text-muted-foreground hover:text-destructive h-7 px-2"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Clear History</span>
          </Button>
        )}
      </SidebarHeader>
      
      <SidebarContent className="p-0">
        <ScrollArea className="h-[calc(100vh-5rem)]">
          {historyItems.length > 0 ? (
            <SidebarMenu className="py-0">
              {historyItems.map((item) => (
                <SidebarMenuItem key={item.id} className="px-1">
                  <SidebarMenuButton
                    onClick={() => onSelectItem(item.summary)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-md px-3 py-2 hover:bg-accent/40 text-sm",
                      "text-left font-normal"
                    )}
                  >
                    <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="line-clamp-2 text-sm">{item.title}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          ) : (
            <div className="flex flex-col items-center justify-center h-40 px-4 py-8 text-center">
              <Clock className="h-10 w-10 text-muted-foreground/40 mb-4" />
              <p className="text-sm text-muted-foreground">No history yet</p>
              <p className="mt-1 text-xs text-muted-foreground/70">Summarized texts will appear here</p>
            </div>
          )}
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default History;
