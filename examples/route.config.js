import navConfig from './nav.config.json'

const componentRoute = {
  path: '/component',
  redirect: '/component/installation',
  component: require('./pages/component.vue'),
  children: []
}

function addRoute (page) {
  const component = require(`./docs${page.path}.md`)
  console.log(component)
  const child = {
    path: page.path.slice(1),
    meta: {
      title: page.title || page.name,
      description: page.description,
    },
    name: 'component-' + (page.title || page.name),
    component: component.default || component
  }
  console.log(child)
  componentRoute.children.push(child)
}

navConfig.forEach(nav => {
  if (nav.groups) {
    nav.groups.forEach(group => {
      group.list.forEach(nav => {
        addRoute(nav)
      })
    })
  } else if (nav.children) {
    nav.children.forEach(nav => {
      addRoute(nav)
    })
  } else {
    addRoute(nav)
  }
})


export default [
  componentRoute,
  {
    path: '/',
    name: 'home',
    component: require('./pages/index.vue')
  },
]
