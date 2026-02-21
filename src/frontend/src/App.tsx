import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import CharacterSelection from './pages/CharacterSelection';
import Arena from './pages/Arena';
import GameHeader from './components/GameHeader';
import { Toaster } from '@/components/ui/sonner';

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
            © {new Date().getFullYear()} Jujutsu Kaisen Arena. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== 'undefined' ? window.location.hostname : 'jujutsu-kaisen-arena'
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

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: CharacterSelection,
});

const arenaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/arena',
  component: Arena,
});

const routeTree = rootRoute.addChildren([indexRoute, arenaRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
