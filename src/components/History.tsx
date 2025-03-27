
import React from 'react';
import { Clock, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { SummarizerResponse } from '@/services/summarizer';

interface HistoryProps {
  historyItems: Array<{id: string; title: string; summary: SummarizerResponse}>;
  onSelectItem: (summary: SummarizerResponse) => void;
  onClearHistory: () => void;
}

const History = ({ historyItems, onSelectItem, onClearHistory }: HistoryProps) => {
  return (
    <Sidebar variant="inset" className="border-r border-border/40">
      <SidebarHeader className="flex flex-row items-center justify-between py-4">
        <div className="flex items-center gap-2 pl-2">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-medium">History</h2>
        </div>
        {historyItems.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClearHistory}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Clear History</span>
          </Button>
        )}
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <ScrollArea className="h-[calc(100vh-10rem)]">
            {historyItems.length > 0 ? (
              <SidebarMenu>
                {historyItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => onSelectItem(item.summary)}
                      className="truncate py-2 text-left"
                    >
                      <span className="truncate">{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                <p>No history yet</p>
                <p className="mt-2">Summarized texts will appear here</p>
              </div>
            )}
          </ScrollArea>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default History;
