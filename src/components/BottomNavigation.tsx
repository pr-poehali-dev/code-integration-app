import Icon from '@/components/ui/icon';

interface BottomNavigationProps {
  activeTab: 'home' | 'chat' | 'profile';
  onTabChange: (tab: 'home' | 'chat' | 'profile') => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-xl border-t border-border/50 shadow-2xl">
      <div className="flex items-center justify-around h-24 px-8 max-w-md mx-auto">
        <button
          onClick={() => onTabChange('home')}
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
          onClick={() => onTabChange('chat')}
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
          onClick={() => onTabChange('profile')}
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
  );
};

export default BottomNavigation;
