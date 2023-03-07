import './css/main.css'
import  morphdom from 'morphdom'
import * as el from './framework.js'

const debug = console.log 

const isTruthy = (x) => !!x

const LOREM = "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.\n---\nLorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups."

const debouce = (ms, fn) => {
  let timeout = null
  return (...args) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => fn(...args), ms)
  }
}

const storeCreate = () => {
  let state = {
    tweet_list: [],
    editer_content: LOREM,
  }
  const hook_list = []
  return {
    get: () => state,
    sub: (fn) => hook_list.push(fn),
    update: (fn) => {
      state = fn(state)
      hook_list.forEach((hook) => {
        try {
          hook(state)
        } catch (error) {
          console.error(error)
        }
      })
    },
  }
}
const store = storeCreate()

const App = (state, update) => {
  const tweet_split = state.editer_content
    .split("\n---\n")
    .filter(isTruthy)

  debug({tweet_split})

  return el.Div({
    style: {
      margin: "0 auto",
      maxWidth: "53rem",
      color: "#ccf",
      padding: "0.5rem",
      textAlign: "right",
      marginBottom: "3rem",
      float: "left",
    },
  })(
    el.H3({style: {background: "black", padding: "1rem"}})("this"),
    el.H3({style: {background: "black", padding: "0.5rem"}})("page is under"),
    el.H3({style: {background: "black", padding: "0.25rem"}})("under construction"),
    el.Div({
    })(
      el.El({
        id: 'wat_editor',
        type: "textarea",
        hook: {
          onBeforeElUpdated: () => {
            console.log("i got called")
            return false
          }
        },
        attributes: {
          id: "scrathpad",
          placeholder: "This is a tweet thread composer.",
        },
        style: {
          float: "left",
          width: "25rem",
          height: "25rem",
          padding: "0.5rem",
        },
        event: {
          keydown: debouce(100, (e) => {
            if (!e) return
            const value = e?.target?.value
            store.update((state) => ({
              ...state,
              editer_content: value,
            }))
            document.getElementById('wat_editor').focus()
          }),
        },
      }),
      el._if_(0 != tweet_split.length)(
        el.Div({
          style: {
            float: "left",
            paddingLeft: "0.5rem",
            width: "25rem",
          }
        })(
          ...tweet_split.filter(isTruthy).map((tweet) => {
            const tweet_length = tweet.length
            const is_too_long = 240 > tweet_length
            const color = is_too_long ? "#ccf" : "#fcc"
            return el.Div({
              style: {
                position: "relative",
                background: color,
                padding: "0.5rem",
                marginBottom: "0.5rem"
              }
            })(
              el.Pre({
                style: {
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  color: "black",
                }
              })(tweet),
              el.P({
                style: {
                  position: "absolute",
                  bottom: "-1rem",
                  right: "-2.5rem",
                  padding: "0.25rem",
                  background: color,
                  color: "black",
                  width: "2rem",
                  textAlign: "right"
                },
              })(tweet.length)
            )
          })
        )
      )
    )
  )
}

const container = document.querySelector('#app')
console.log({container, app: App(store.get()), morphdom})
morphdom(container, App(store.get()))


const getElHookHandlerFromFirstArg = (fallback) => (hook_name) => (e) => {
  const handler = el._fetch_hook_(e.id, hook_name) || fallback
  return handler(e)
}

const getElHookHandlerFromSecondArg = (fallback) => (hook_name) => (f, e) => {
  const handler = el._fetch_hook_(e.id, hook_name) || fallback
  return handler(f, e)
}

const morphdom_hook_handler_fetcher_map = {
  getNodeKey: getElHookHandlerFromFirstArg((x) => x.id),
  addChild: getElHookHandlerFromSecondArg((parrent_node, child_node) => parrent_node.appendChild(child_node)),
  onBeforeNodeAdded: getElHookHandlerFromFirstArg( (x) => x),
  onNodeAdded: getElHookHandlerFromFirstArg(() => undefined),
  onBeforeElUpdated: getElHookHandlerFromFirstArg(() => true),
  onElUpdated: getElHookHandlerFromFirstArg(() => undefined),
  onBeforeNodeDiscarded: getElHookHandlerFromFirstArg(() => true),
  onNodeDiscarded: getElHookHandlerFromFirstArg(() => undefined),
  onBeforeElChildrenUpdated: getElHookHandlerFromSecondArg(() => true),
}

const morphdom_config = 
  Object.entries(morphdom_hook_handler_fetcher_map)
  .reduce((result, [hook_name, fetcher]) => {
  return {
    ...result,
    [hook_name]: fetcher(hook_name),
  }
}, {})

console.log({morphdom_config})

store.sub((state) => {
  console.log({state})
  morphdom(container, App(store.get()), morphdom_config)
})
