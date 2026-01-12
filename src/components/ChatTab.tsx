import { useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  image?: string;
  timestamp: Date;
}

interface ChatTabProps {
  messages: Message[];
  inputMessage: string;
  isGenerating: boolean;
  userName: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onNavigateBack: () => void;
}

const ChatTab = ({
  messages,
  inputMessage,
  isGenerating,
  userName,
  onInputChange,
  onSendMessage,
  onNavigateBack,
}: ChatTabProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="animate-fade-in h-full flex flex-col">
      <div className="px-6 pt-8 pb-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10 border-b border-border/50">
        <div className="flex items-center gap-3">
          <button 
            onClick={onNavigateBack}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <Icon name="ArrowLeft" size={24} className="text-foreground" />
          </button>
          <div className="w-12 h-12 rounded-2xl gradient-purple-pink flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">AI Нейросеть</h2>
            <p className="text-xs text-muted-foreground">Генерация изображений</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 animate-fade-in ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <Avatar className={`w-10 h-10 flex-shrink-0 ${
              message.sender === 'ai' ? 'gradient-purple-pink' : 'gradient-blue-cyan'
            }`}>
              <AvatarFallback className="text-white font-bold">
                {message.sender === 'ai' ? '🤖' : userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className={`max-w-[75%] ${
              message.sender === 'user' ? 'items-end' : 'items-start'
            } flex flex-col gap-2`}>
              <div className={`px-4 py-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'gradient-blue-cyan text-white'
                  : 'bg-card border border-border text-foreground'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
              
              {message.image && (
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={message.image} 
                    alt="Generated" 
                    className="w-full h-auto"
                  />
                </div>
              )}
              
              <span className="text-xs text-muted-foreground px-2">
                {message.timestamp.toLocaleTimeString('ru-RU', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="px-6 py-4 bg-card/80 backdrop-blur-xl border-t border-border/50">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Опиши изображение..."
            disabled={isGenerating}
            className="h-12 rounded-2xl"
          />
          <Button
            onClick={onSendMessage}
            disabled={!inputMessage.trim() || isGenerating}
            className="h-12 px-6 rounded-2xl gradient-purple-pink text-white font-semibold"
          >
            {isGenerating ? (
              <Icon name="Loader2" size={20} className="animate-spin" />
            ) : (
              <Icon name="Send" size={20} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatTab;
