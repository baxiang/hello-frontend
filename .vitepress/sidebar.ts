import { generateSidebar } from 'vitepress-sidebar'

const modules = [
  '01-html5',
  '02-css3',
  '03-javascript',
  '04-es6+',
  '05-typescript',
  '06-nodejs',
  '07-engineering',
  '08-react',
  '09-vue',
  '10-nextjs',
  '11-实战项目',
]

export default generateSidebar(
  modules.map((mod) => ({
    documentRootPath: `/${mod}`,
    resolvePath: `/${mod}/`,
    useTitleFromFileHeading: true,
    collapsed: true,
    sortMenusOrderByDescending: false,
  }))
)
