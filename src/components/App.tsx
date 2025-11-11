import { useLaunchParams, useSignal, miniApp } from '@tma.js/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  type TelegramUser = {
    id?: number;
    first_name?: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
  };
  
  const user = lp?.user as TelegramUser | undefined;
  
  const username = user?.first_name
    ? `${user.first_name} ${user.last_name ?? ''}`.trim()
    : 'Неизвестный пользователь';
  
  const userId = user?.id ? user.id.toString() : '—';

  return (
    <AppRoot appearance={isDark ? 'dark' : 'light'}>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 text-white p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold mb-4">👋 Добро пожаловать!</h1>

          <Card className="w-80 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
          {user?.photo_url && (
            <img  
              src={user.photo_url}
              alt={username}
              className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-white/30 shadow-lg"
            />
          )}
            <CardContent className="p-6 text-center">
              <p className="text-lg">Имя пользователя:</p>
              <p className="text-2xl font-semibold mb-2">{username}</p>

              <p className="text-lg">ID пользователя:</p>
              <p className="text-2xl font-mono">{userId}</p>
            </CardContent>
          </Card>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6"
          >
            <Button className="text-lg px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition">
              Продолжить
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </AppRoot>
  );
}