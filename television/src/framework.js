const DEBUG_MODE = true
const hook_stash = {}

export const idCreate = () => {
  return btoa(Math.random().toString())
}

export const El = (arg) => {
  let {
    type,
    attributes,
    children,
    classMap,
    classList,
    className,
    event,
    hook,
    style,
    text,
    html,
  } = arg

  const el = document.createElement(type)
  const id = arg?.id || attributes?.id

  if (text) {
    el.textContent = text
  }

  if (html) {
    el.innerHTML = html
  }

  // set attributes
  attributes = attributes || {}
  attributes.id = id
  Object.entries(attributes).forEach(([key, value]) => {
    el.setAttribute(key, value)
  })

  style = style || {}
  Object.entries(style).forEach(([key, value]) => {
    el.style[key] = value
  })

  // set css class list
  classMap = classMap || {}
  Object.entries(classMap).forEach(([tag, value]) => {
    if (value) {
      el.classList.add(tag)
    } else {
      el.classList.remove(tag)
    }
  })

  classList = classList || []
  classList.forEach((tag) => {
    el.classList.add(tag)
  })

  if (className){
    el.classList.add(className)
  }

  // set set children
  children = children || []
  children.forEach((child) => {
    if (child instanceof Element) {
      return el.appendChild(child)
    }
    if (DEBUG_MODE && (child === '' || child === null || child === undefined)) {
      return el.appendChild(document.createTextNode('_empty_'))
    }
    if ('string' === typeof child){
      return el.appendChild(document.createTextNode(child.toString()))
    }
    if (DEBUG_MODE) {
      return el.appendChild(document.createTextNode(child.toString()))
    }
    return
  })

  // set event listeners
  event = event || {}
  Object.entries(event).forEach(([event_name, handler]) => {
    el.addEventListener(event_name, handler)
  })

  // store mophedom hooks of first call with this id
  if (id && hook) {
    hook = hook || {}
    hook_stash[id] = hook_stash[id] || {}
    Object.entries(hook).forEach(([hook_name, hook_handler]) => {
      if (!hook_stash[id][hook_name]) {
        hook_stash[id][hook_name] = hook_handler
      }
    })
    console.log({hook_stash})
  }
  return el
}

export const _fetch_hook_ = (id, hook_name) => {
  if (hook_stash[id]) {
    return hook_stash[id][hook_name] || null
  }
  return null
}

export const Box = (type) => (options) => (...children) => {
  options = options || {}
  return El({
    ...options,
    type,
    children,
  })
}

export const NONE = document.createElement('empty')
export const Header = Box('header')
export const _Header = Header()
export const Footer = Box('footer')
export const _Footer = Footer()
export const Main = Box('main')
export const _Main = Main()
export const Span = Box('span')
export const _Span = Span()

export const Button = (options) => {
  options = options || {}
  options.event = options.event || {}
  let click = options.click || options.event.click 
  delete options.click
  delete options.event.click
  options.event.click = (e) => {
    if (click) {
      click(e)
    }
  }
  return Box('button')(options)
}
export const _Button = Button()
export const _Submit = Button({
  attributes: {
    type: 'submit',
  },
})

export const Form = (options) => {
  options = options || {}
  options.event = options.event || {}
  let submit = options.submit || options.event.submit
  delete options.submit
  delete options.event.submit
  options.event.submit = (e) => {
    e.preventDefault()
    if (submit) {
      submit(e)
    }
  }
  return Box('form')(options)
}
export const Div = Box('div')
export const _Div = Div()
export const Nav = Box('nav')
export const _Nav = Nav()
export const Pre = Box('pre')
export const _Pre = Pre()
export const Code= Box('code')
export const _Code = Code()
export const H1 = Box('H1')
export const _H1 = H1()
export const H2 = Box('H2')
export const _H2 = H2()
export const H3 = Box('H3')
export const _H3 = H3()
export const Ol = Box('ol')
export const _OL = Ol()
export const Ul = Box('ul')
export const _UL = Ul()
export const Li = Box('li')
export const _Li = Li()
export const Em = Box('em')
export const _Em = Em()
export const P = Box('p')
export const _P = P()

export const ClearFix = Span({t: 'clearfix'})

export const _RED = Span({
  style: { color: 'red', },
})

export const _GREEN = Span({
  style: { color: 'green', },
})

export const _YELLOW = Span({
  style: { color: 'yellow', },
})

export const _BLUE = Span({
  style: { color: 'blue', },
})

export const _Img = (options) => {
  let {alt, src } = options
  options = options || {}
  options.attributes = options.attributes || {}
  return El({
    ...options,
    type: 'img',
    attributes: {
      ...options.attributes,
      src: src || '/asset/missing.jpg',
      alt,
    },
  })
}

export const _Link = (options) => {
  let {href, text} = options
  options = options || {}
  options.attributes = options.attributes || {}
  return El({
    ...options,
    type: 'a',
    text,
    attributes: {
      ...options.attributes,
      href,
    },
  })
}

export const _Input = (options) => {
  let {type, name, placeholder, value} = options
  type = type || 'text'
  options = options || {}
  options.attributes = options.attributes || {}
  options.attributes = {
    ...options.attributes,
    type,
  }
  if (name) {
    options.attributes.name = name
  }
  if (placeholder) {
    options.attributes.placeholder = placeholder
  }
  if (value){
    options.attributes.value = value
  }
  return El({
    ...options,
    type: 'input',
  })
}


export const _if_ = (test) => (el) => {
  if (test) {
    return el
  }
  return NONE
}

export const _html_ = (innerHTML) => {
  let div = document.createElement('div')
  div.innerHTML = innerHTML
  return div.children[0] || document.createTextNode("")
}

export const $ = {
  id: (id) => document.getElementById(id),
  value: (id) => document.getElementById(id).value,
  checked: (id) => document.getElementById(id).checked,
  form: (id) => {
    let data = new FormData(document.getElementById(id))
    let result = {}
    data.forEach((value, key) => {
      result[key] = value
    })
    return result
  }
}
