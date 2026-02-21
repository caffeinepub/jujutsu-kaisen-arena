import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LogIn, Loader2 } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginStatus, identity, isLoggingIn } = useInternetIdentity();

  // Redirect to character selection if already authenticated
  useEffect(() => {
    if (identity && !identity.getPrincipal().isAnonymous()) {
      navigate({ to: '/' });
    }
  }, [identity, navigate]);

  // Listen for Q key to trigger login
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'q' && !isLoggingIn) {
        login();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [login, isLoggingIn]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(/assets/generated/login-bg.dim_1920x1080.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="text-center mb-8">
          <img
            src="/assets/generated/jjk-arena-logo.dim_800x200.png"
            alt="JJK Arena"
            className="h-24 mx-auto object-contain drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] mb-6"
          />
          <p className="text-lg text-muted-foreground">
            Enter the arena and battle with Streets of Tyson characters
          </p>
        </div>

        <Card className="border-2 border-primary/30 bg-card/80 backdrop-blur-md shadow-2xl shadow-primary/20">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Welcome to JJK Arena
            </CardTitle>
            <CardDescription className="text-base">
              Authenticate to start your battle journey
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button
              size="lg"
              onClick={login}
              disabled={isLoggingIn}
              className="w-full text-lg py-6 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 shadow-lg shadow-purple-500/50"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Login with Internet Identity
                </>
              )}
            </Button>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs font-mono">Q</kbd> to login
              </p>
              {loginStatus === 'loginError' && (
                <p className="text-sm text-destructive">
                  Login failed. Please try again.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'jjk-arena'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
