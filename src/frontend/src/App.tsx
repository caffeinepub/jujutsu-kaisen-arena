import { RouterProvider, createRouter, createRoute, createRootRoute, Navigate } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import { InternetIdentityProvider, useInternetIdentity } from './hooks/useInternetIdentity';
import CharacterSelection from './pages/CharacterSelection';
import Arena from './pages/Arena';
import Login from './pages/Login';
import GameHeader from './components/GameHeader';
import { Toaster } from '@/components/ui/sonner';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { identity, isInitializing } = useInternetIdentity();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!identity || identity.getPrincipal().isAnonymous()) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-background">
      <GameHeader />
      <main className="container mx-auto px-4 py-8">
        {/* Outlet will render child routes */}
        <div id="outlet-container" />
      </main>
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} JJK Arena. Built with ❤️ using{' '}
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
      </footer>
      <Toaster />
    </div>
  ),
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <ProtectedRoute>
      <CharacterSelection />
    </ProtectedRoute>
  ),
});

const arenaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/arena',
  component: () => (
    <ProtectedRoute>
      <Arena />
    </ProtectedRoute>
  ),
});

const routeTree = rootRoute.addChildren([loginRoute, indexRoute, arenaRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <InternetIdentityProvider>
        <RouterProvider router={router} />
      </InternetIdentityProvider>
    </ThemeProvider>
  );
}

export default App;
