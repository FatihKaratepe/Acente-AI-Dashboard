import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useTypewriter } from "@/hooks/use-type-animation";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  isStreaming?: boolean;
}

export interface MioxBotHandle {
    open: () => void;
    setInput: (text: string) => void;
}

const StreamingMessage = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const { displayedText, isComplete } = useTypewriter({ text, speed: 150 });
  
  useEffect(() => {
    if (isComplete && onComplete) {
        onComplete();
    }
  }, [isComplete, onComplete]);

  return <>{displayedText}</>;
};

export const MioxBot = forwardRef<MioxBotHandle>((_, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm Miox, your AI assistant. How can I help you today?",
      sender: "bot",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => setIsOpen(true),
    setInput: (text: string) => setInputValue(text)
  }));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const streamResponse = async (responseText: string) => {
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsTyping(false);

    const messageId = Date.now().toString();
    setMessages((prev) => [
      ...prev,
      { id: messageId, text: responseText, sender: "bot", isStreaming: true },
    ]);
  };

  const handleStreamingComplete = (messageId: string) => {
      setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, isStreaming: false } : msg
      ));
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate AI processing and response
    const responses = [
      "I can certainly help with that! Could you provide more details?",
      "That's an interesting question. Let me analyze the data for you...",
      "I've updated the dashboard with the latest information.",
      "Is there anything else you'd like me to assist you with?",
      "Processing your request... Done via Miox-Core.",
    ];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];

    streamResponse(randomResponse);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 font-sans pointer-events-none">
      <div
        className={cn(
          "transition-all duration-300 ease-in-out transform origin-bottom-right",
          isOpen
            ? "scale-100 opacity-100 translate-y-0 pointer-events-auto"
            : "scale-30 opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <Card className="w-[350px] shadow-2xl border-primary/20 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 py-0 gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 p-1.5 rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <CardTitle className="text-base font-medium">Miox AI</CardTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "w-max max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow-sm",
                  msg.sender === "user"
                    ? "ml-auto bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted text-muted-foreground rounded-tl-none"
                )}
              >
                {msg.isStreaming ? (
                    <StreamingMessage 
                        text={msg.text} 
                        onComplete={() => handleStreamingComplete(msg.id)}
                    />
                ) : (
                    msg.text
                )}
                {msg.isStreaming && (
                  <span className="inline-block w-1.5 h-3 ml-1 bg-current animate-pulse align-middle" />
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex w-max max-w-[80%] flex-col gap-1 rounded-2xl rounded-tl-none bg-muted px-3 py-2 text-sm shadow-sm text-muted-foreground">
                <div className="flex gap-1 items-center h-5">
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <form
              className="flex w-full items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <Textarea
                placeholder="Ask Miox anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="flex-1 min-h-[40px] max-h-[120px] rounded-2xl bg-muted/50 border-transparent focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/20 pl-4 resize-none py-2"
              />
              <Button
                type="submit"
                size="icon"
                disabled={!inputValue.trim()}
                className="h-10 w-10 rounded-full shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>

      <Button
        onClick={() => setIsOpen(!isOpen)}
        size="icon"
        className={cn(
            "h-14 w-14 rounded-full shadow-xl transition-all duration-300 hover:scale-105 pointer-events-auto",
            isOpen ? "bg-muted text-muted-foreground hover:bg-muted/80" : "bg-primary text-primary-foreground"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
        )}
      </Button>
    </div>
  );
});
