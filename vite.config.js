import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
    const config = {
        plugins: [react()]
    };

    process.env = {...process.env, ...loadEnv(mode, process.cwd())};
    const SKIP_BASE_PATH = process.env.VITE_SKIP_BASE_BATH;
    if (SKIP_BASE_PATH === undefined || SKIP_BASE_PATH === 'false')
        config.base = '/react-with-supabase/';

    return defineConfig(config);
}
