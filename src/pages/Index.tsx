import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'profile'>('home');
  const [userName, setUserName] = useState('Александр');
  const [userEmail, setUserEmail] = useState('alex@example.com');
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === 'home' ? (
          <div className="animate-fade-in">
            <div className="px-6 pt-12 pb-8">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Добро пожаловать
              </h1>
              <p className="text-muted-foreground">
                Минималистичное приложение для вас
              </p>
            </div>

            <div className="px-6 space-y-4">
              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Sparkles" size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">
                      Быстрый доступ
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Всё под рукой
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Bell" size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">
                      Уведомления
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      3 новых сообщения
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="Activity" size={24} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">
                      Активность
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Статистика за сегодня
                    </p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                </div>
              </Card>
            </div>

            <div className="px-6 mt-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                Недавнее
              </h2>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                      <Icon name="FileText" size={18} className="text-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        Документ {item}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Сегодня в {10 + item}:30
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="px-6 pt-12 pb-8">
              <h1 className="text-3xl font-semibold text-foreground mb-2">
                Профиль
              </h1>
              <p className="text-muted-foreground">
                Управление настройками
              </p>
            </div>

            <div className="px-6">
              <div className="flex flex-col items-center mb-8">
                <Avatar className="w-24 h-24 mb-4 ring-4 ring-primary/10">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {userName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold text-foreground">
                  {userName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {userEmail}
                </p>
              </div>

              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Личная информация
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground">
                      Имя
                    </Label>
                    <Input
                      id="name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-6 mb-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Настройки
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="notifications" className="text-foreground font-medium">
                        Уведомления
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Получать push-уведомления
                      </p>
                    </div>
                    <Switch
                      id="notifications"
                      checked={notifications}
                      onCheckedChange={setNotifications}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <Label htmlFor="darkMode" className="text-foreground font-medium">
                        Тёмная тема
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Включить тёмный режим
                      </p>
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
                className="w-full mb-4"
              >
                <Icon name="Settings" size={18} className="mr-2" />
                Дополнительные настройки
              </Button>

              <Button
                variant="destructive"
                className="w-full"
              >
                <Icon name="LogOut" size={18} className="mr-2" />
                Выйти
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
        <div className="flex items-center justify-around h-20 px-6 max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'home' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="Home" size={24} />
            <span className="text-xs font-medium">Главная</span>
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'profile' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            <Icon name="User" size={24} />
            <span className="text-xs font-medium">Профиль</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
