import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export default function GameHeader() {
  const { identity, clear } = useInternetIdentity();
  const isAuthenticated = identity && !identity.getPrincipal().isAnonymous();

  return (
    <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1" />
          <div className="flex items-center justify-center flex-1">
            <img
              src="/assets/generated/jjk-arena-logo.dim_800x200.png"
              alt="JJK Arena"
              className="h-16 object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            />
          </div>
          <div className="flex-1 flex justify-end">
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clear}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
