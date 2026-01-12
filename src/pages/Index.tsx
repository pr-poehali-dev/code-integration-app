import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  image?: string;
  timestamp: Date;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'chat' | 'profile'>('home');
  const [userName, setUserName] = useState('Александр');
  const [userEmail, setUserEmail] = useState('alex@example.com');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я могу помочь тебе создать изображения. Просто опиши, что хочешь увидеть! 🎨',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isGenerating) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsGenerating(true);

    const aiThinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: 'Создаю изображение...',
      sender: 'ai',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, aiThinkingMessage]);

    try {
      const response = await fetch('https://nano-image-gen.deno.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: inputMessage }),
      });

      const data = await response.json();

      setMessages(prev => 
        prev.filter(m => m.id !== aiThinkingMessage.id).concat({
          id: Date.now().toString(),
          text: 'Вот что получилось! 🎨',
          sender: 'ai',
          image: data.imageUrl,
          timestamp: new Date(),
        })
      );
    } catch (error) {
      setMessages(prev => 
        prev.filter(m => m.id !== aiThinkingMessage.id).concat({
          id: Date.now().toString(),
          text: 'Произошла ошибка при генерации изображения. Попробуй ещё раз!',
          sender: 'ai',
          timestamp: new Date(),
        })
      );
      toast({
        title: 'Ошибка',
        description: 'Не удалось сгенерировать изображение',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-24">
        {activeTab === 'home' ? (
          <div className="animate-fade-in">
            <div className="px-6 pt-12 pb-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-5xl">🍌</span>
                <div>
                  <h1 className="text-4xl font-bold text-foreground">
                    Nano
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1">
                    Твой цифровой помощник
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 space-y-5">
              <Card 
                className="p-0 overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl border-0 cursor-pointer"
                onClick={() => setActiveTab('chat')}
              >
                <div className="gradient-purple-pink p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-3xl">🤖</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">
                        AI Чат
                      </h3>
                      <p className="text-sm text-white/80">
                        Генерация изображений
                      </p>
                    </div>
                    <Icon name="ArrowRight" size={24} className="text-white" />
                  </div>
                </div>
              </Card>

              <Card className="p-0 overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl border-0">
                <div className="gradient-blue-cyan p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-3xl">🔔</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">
                        Уведомления
                      </h3>
                      <p className="text-sm text-white/80">
                        3 новых сообщения
                      </p>
                    </div>
                    <Icon name="ArrowRight" size={24} className="text-white" />
                  </div>
                </div>
              </Card>

              <Card className="p-0 overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl border-0">
                <div className="gradient-orange-pink p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-3xl">📊</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">
                        Активность
                      </h3>
                      <p className="text-sm text-white/80">
                        Статистика за сегодня
                      </p>
                    </div>
                    <Icon name="ArrowRight" size={24} className="text-white" />
                  </div>
                </div>
              </Card>

              <Card className="p-0 overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl border-0">
                <div className="gradient-green-blue p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <span className="text-3xl">🎯</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white text-lg mb-1">
                        Задачи
                      </h3>
                      <p className="text-sm text-white/80">
                        5 активных задач
                      </p>
                    </div>
                    <Icon name="ArrowRight" size={24} className="text-white" />
                  </div>
                </div>
              </Card>
            </div>

            <div className="px-6 mt-10">
              <h2 className="text-2xl font-bold text-foreground mb-5">
                Недавнее
              </h2>
              <div className="space-y-3">
                {[
                  { icon: '📝', title: 'Заметка', time: '11:30', color: 'bg-purple-100' },
                  { icon: '🎨', title: 'Дизайн', time: '12:15', color: 'bg-pink-100' },
                  { icon: '💼', title: 'Встреча', time: '13:00', color: 'bg-blue-100' },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-card hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center`}>
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-semibold text-foreground">
                        {item.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Сегодня в {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : activeTab === 'chat' ? (
          <div className="animate-fade-in h-full flex flex-col">
            <div className="px-6 pt-8 pb-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10 border-b border-border/50">
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setActiveTab('home')}
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
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Опиши изображение..."
                  disabled={isGenerating}
                  className="h-12 rounded-2xl"
                />
                <Button
                  onClick={handleSendMessage}
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
        ) : (
          <div className="animate-fade-in">
            <div className="px-6 pt-12 pb-8">
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Профиль
              </h1>
              <p className="text-muted-foreground">
                Управляй своими настройками
              </p>
            </div>

            <div className="px-6">
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <Avatar className="w-28 h-28 ring-4 ring-primary/20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-3xl gradient-purple-pink text-white font-bold">
                      {userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-10 h-10 gradient-blue-cyan rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xl">👋</span>
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  {userName}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {userEmail}
                </p>
              </div>

              <Card className="p-6 mb-5 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <span>👤</span> Личная информация
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground font-medium">
                      Имя
                    </Label>
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="mt-2 h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="mt-2 h-12"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 mb-5 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-5 flex items-center gap-2">
                  <span>⚙️</span> Настройки
                </h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">🔔</span>
                      <div>
                        <Label htmlFor="notifications" className="text-foreground font-semibold">
                          Уведомления
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Push-уведомления
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-muted/30">
                    <div className="flex items-center gap-3 flex-1">
                      <span className="text-2xl">🌙</span>
                      <div>
                        <Label htmlFor="darkMode" className="text-foreground font-semibold">
                          Тёмная тема
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          Ночной режим
                        </p>
                      </div>
                    </div>
                    <Switch
                      id="darkMode"
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                </div>
              </Card>

              <Button
                variant="outline"
                className="w-full mb-4 h-14 text-base font-semibold rounded-2xl"
              >
                <Icon name="Settings" size={20} className="mr-2" />
                Дополнительные настройки
              </Button>

              <Button
                variant="destructive"
                className="w-full h-14 text-base font-semibold rounded-2xl"
              >
                <Icon name="LogOut" size={20} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/50 shadow-2xl">
        <div className="flex items-center justify-around h-24 px-8 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${
              activeTab === 'home' 
                ? 'text-primary scale-110' 
                : 'text-muted-foreground scale-100'
            }`}
          >
            <div className={`p-3 rounded-2xl transition-all ${
              activeTab === 'home' ? 'bg-primary/10' : 'bg-transparent'
            }`}>
              <Icon name="Home" size={24} />
            </div>
            <span className="text-xs font-bold">Главная</span>
          </button>
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${
              activeTab === 'chat' 
                ? 'text-primary scale-110' 
                : 'text-muted-foreground scale-100'
            }`}
          >
            <div className={`p-3 rounded-2xl transition-all ${
              activeTab === 'chat' ? 'bg-primary/10' : 'bg-transparent'
            }`}>
              <Icon name="MessageCircle" size={24} />
            </div>
            <span className="text-xs font-bold">Чат</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-2 transition-all duration-300 ${
              activeTab === 'profile' 
                ? 'text-primary scale-110' 
                : 'text-muted-foreground scale-100'
            }`}
          >
            <div className={`p-3 rounded-2xl transition-all ${
              activeTab === 'profile' ? 'bg-primary/10' : 'bg-transparent'
            }`}>
              <Icon name="User" size={24} />
            </div>
            <span className="text-xs font-bold">Профиль</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
