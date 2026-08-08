import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App, { preloadRouteForPath } from './App.tsx';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

async function bootstrap() {
  if (container.hasChildNodes()) {
    // Preload the current route's chunk first so hydration never suspends
    // on a lazy component (avoids React hydration mismatch errors).
    await preloadRouteForPath(window.location.pathname);
    hydrateRoot(container, app);
  } else {
    createRoot(container).render(app);
  }
}

bootstrap();