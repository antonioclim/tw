import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// Configuraţie minimală şi modernă: React compilat prin SWC (fără Babel),
// pentru a reduce avertizările tranzitive şi a accelera build-ul în laborator.
export default defineConfig({
  plugins: [react()],
});
