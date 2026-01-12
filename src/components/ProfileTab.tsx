import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface ProfileTabProps {
  userName: string;
  userEmail: string;
  notifications: boolean;
  darkMode: boolean;
  onUserNameChange: (value: string) => void;
  onUserEmailChange: (value: string) => void;
  onNotificationsChange: (value: boolean) => void;
  onDarkModeChange: (value: boolean) => void;
}

const ProfileTab = ({
  userName,
  userEmail,
  notifications,
  darkMode,
  onUserNameChange,
  onUserEmailChange,
  onNotificationsChange,
  onDarkModeChange,
}: ProfileTabProps) => {
  return (
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
                onChange={(e) => onUserNameChange(e.target.value)}
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
                onChange={(e) => onUserEmailChange(e.target.value)}
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
                onCheckedChange={onNotificationsChange}
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
                onCheckedChange={onDarkModeChange}
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
  );
};

export default ProfileTab;
