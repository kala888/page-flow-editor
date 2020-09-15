import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  routes: [{ path: '/', component: '@/pages/editor-flow' }],
});
