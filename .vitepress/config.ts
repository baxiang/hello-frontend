import { defineConfig } from 'vitepress'
import sidebar from './sidebar'

const isProduction = process.env.NODE_ENV === 'production' || process.argv.includes('build')

export default defineConfig({
  title: '大前端技术学习路线',
  description: '完整的前端工程师成长路径：从入门到精通（2026版）',
  lang: 'zh-CN',
  base: isProduction ? '/hello-frontend/' : '/',
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: 'HTML5', link: '/01-html5/01-基础语法/' },
      { text: 'CSS3', link: '/02-css3/01-基础语法/' },
      { text: 'JavaScript', link: '/03-javascript/01-基础语法/' },
      { text: 'TypeScript', link: '/05-typescript/00-快速入门/' },
      { text: 'React', link: '/08-react/01-快速入门/' },
      { text: 'Vue', link: '/09-vue/01-快速入门/' },
    ],

    sidebar,

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/baxiang/hello-frontend' },
    ],
  },

  markdown: {
    lineNumbers: true,
  },

  ignoreDeadLinks: true,

  srcExclude: [
    '**/node_modules/**',
    '**/.vitepress/**',
    'docs/**',
    'AGENTS.md',
    'CLAUDE.md',
    'QWEN.md',
    'README.md',
    '.github/**',
  ],
})
