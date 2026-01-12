import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface HomeTabProps {
  onNavigateToChat: () => void;
}

const HomeTab = ({ onNavigateToChat }: HomeTabProps) => {
  return (
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
          onClick={onNavigateToChat}
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
  );
};

export default HomeTab;
