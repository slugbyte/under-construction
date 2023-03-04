/*
 * style gide for this under construction page
 *
 * variables_use_snake_case
 * functionsUseCamelCase
 * CONSTANTS_USE_UPPER_CASE
 */

/* return a number between 0 and max (not including max) */
const randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}

// CONSTANT
const UNDER = "under"
const CONSTRUCTION = "construction"
const UNDER_CONSTRUCTION = UNDER.concat(CONSTRUCTION)
const DIRECTION_LIST = ["up", "down", "left", "right"]
const SMASHER = document.getElementById("smasher")
const HEALER = document.getElementById("healer")
const DISBLE_LOG = false
const DAMAGE_MAX = 100
const GRUNT_LIST = [
  "I HATE YOU", "NO NO NO", "Whhy me?", "STOP", "I...", "GUHh", "!", 
  "Uh!", "Ow!", "Eek!", "Ugh!", "Ack!", "Agh!", "Argh!", "Bleh!", "Blergh!", 
  "Bluh!", "Boo!", "Brr!", "D'oh!", "Dang!", "Derp!", "Duh!", "Eep!", "Feh!", 
  "Gah!", "Grr!", "Hmph!", "Hoo!", "Hurk!", "Mmmph!", "Ngh!", "Nyah!", "Oops!", 
  "Owie!", "Phew!", "Pfft!", "Phooey!", "Pshaw!", "Rats!", "Sheesh!", "Shh!", 
  "Shoo!", "Sigh!", "Sput!", "Squee!", "Squish!", "Uck!", "Urgh!", "Urf!", 
  "Vom!", "Wham!", "Whoa!", "Whomp!", "Womp!", "Yech!", "Yuck!", "Yow!", 
  "Yikes!", "Yip!", "Yipe!", "Yowza!", "Zoinks!", "Zowie!", "Bang!", "Bash!", 
  "Biff!", "Boom!", "Crack!", "Crash!", "Crunch!", "Kaboom!", "Kapow!", 
  "Ker-splat!", "Ker-thump!", "Ker-whack!", "Pow!", "Pop!", "Smash!", 
  "Snap!", "Splat!", "Squish!", "Thud!", "Thump!", "Twack!", "Whack!", 
  "Whammy!", "Zap!", "Zing!", "Zip!", "Zoom!", "Ahem!", "Hem!", "Hic!", "Hm!", 
  "Huh?", "Mm-hmm!", "Mmm!", "Pah!", "Tut!", "Tsk!", "Uh-huh!", "Umm...", 
  "Hmm...", "Well...", "Er...", "Erm...", "OOOF!", "!!OUCH", 
  "F*@#", "WHYYY", "Ouch!", "MMMMh", "UGGH", "MY EYES", "YOU ARE A MONSTER", 
  ]

// STATE
const test_state = {
  count_passed: 0,
  count_failed: 0,
  error_list: [],
}

const createDefaultOffsetPositionList = () => {
  return Array.prototype.map.call(UNDER_CONSTRUCTION, () => {
    const randomStartOffset = () => randomInt(0, 200)
    return {
      up: randomStartOffset(),
      down: randomStartOffset(),
      left: randomStartOffset(),
      right: randomStartOffset(),
    }
  })
}

var offset_position_list = 
let count_click = 0
let smash_mode = true
let damage_meter = 0

// UTIL
/** assert if the predicate returns true
 *  on success it will log a success message
 *
 *  on failure it will log a error message 
 *  throw an error error
 * */
const assertTrue = (description, predicate) => {
  try {
    if (true !== predicate()) {
      throw new Error(`Assert ${description} failed: expected true but got false`)
    }
    console.log(`    passed: ${description}`)
  } catch (error) {
    error.message = `     Assert ${description} failed with Error: ${error.message}`
    console.error(error)
    throw error
  }
}

/** run the handler and update the test_state */
const test = (fn_name, test_handler) => {
  try {
    console.log(`TEST: ${fn_name}`)
    test_handler()
    test_state.count_passed++
  } catch (error) {
    test_state.count_failed++
    test_state.error_list.push(error)
    console.error(`TEST: ${fn_name} failed`)
    console.error(error)
  }
}

const log = (...args) => {
  if (DISBLE_LOG) return
  console.log (...args)
}

const debug = (arg) => {
  if (DISBLE_LOG) return arg
  console.dir(arg, {depth: 100})
  return arg
}

const debugValue = (name, value) => {
  console.log(name, value);
  return value
}


const clampMin = (min, value) => {
  if (value < min) return min
  return value
}

test("clampMin", () => {
  assertTrue("should return zero", () =>  0 == clampMin(0, -1) )
  assertTrue("should return value", () =>  5 == clampMin(0, 5) )
})

/** return a random direction from DIRECTION_LIST */
const randomDirection = () => {
  // const random_int = randomInt(0, 100)
  // const random_index = random_int % DIRECTION_LIST.length
  return DIRECTION_LIST[randomInt(0, DIRECTION_LIST.length)]
}

test("randomDirection", () => {
  assertTrue("should be a direction", () => {
    return -1 < DIRECTION_LIST.indexOf(randomDirection())
  })
})

/** return a random grunt from GRUNT_LIST */
const randomGrunt = () => {
  return GRUNT_LIST[randomInt(0, GRUNT_LIST.length)]
}

/**  every 10 clicks switch from incrament to decrament */
const getShouldIncrament = (count_click) => {
  // return (count_click % 20)  < 10
  return smash_mode
}
test("getShouldIncrament", () => {
  assertTrue("every other 10 range should be true", () => {
    return true
      && getShouldIncrament(0)
      && getShouldIncrament(9)
      && getShouldIncrament(20)
      && getShouldIncrament(29)
      && getShouldIncrament(40)
      && getShouldIncrament(49)
  })
  assertTrue("every other 10 range should be false", () => {
    return !(
      false
      && getShouldIncrament(10)
      && getShouldIncrament(19)
      && getShouldIncrament(30)
      && getShouldIncrament(39)
      && getShouldIncrament(50)
    )
  })
})

const updateOffsetPostion = (offset_position, index, direction, should_incrament) => {
    // incrament two random directions for each charicter to walk
    const current_value = offset_position[index][direction]
    if (should_incrament) {
      offset_position[index][direction] = current_value + 5
    } else {
      offset_position[index][direction] = clampMin(0, current_value - 5)
    }
  return offset_position
}
// test("updateOffsetPostion", () => {
//   assertTrue("should incarment up", () => {
//     const result = updateOffsetPostion([{up: 0, down: 0, left: 0, right: 0}], 0, "up", true)
//     return result[0].up === 1
//   })
//
//   assertTrue("should decrament up", () => {
//     const result = updateOffsetPostion([{up: 5, down: 0, left: 0, right: 0}], 0, "up", false)
//     return result[0].up === 4
//   })
//
//   assertTrue("should not decrament up", () => {
//     const result = updateOffsetPostion([{up: 0, down: 0, left: 0, right: 0}], 0, "up", false)
//     return result[0].up === 0
//   })
// })

/**
 * convenrt a error into a string with indents 
 * only inclueds the first 3 stack frames
 * */
const errorToPrettyString = (error) => {
  const stack_content = error.stack.split('\n')
    .slice(0, 3)
    .map((value) => '          '.concat(value))
    .join('\n')
  return error.message.concat('\n' + stack_content, '\n')
}

const offsetToCSSTransform = (offset_position) => {
  const {up, down, left, right} = offset_position
  return `translate(${right - left }px, ${down - up}px)`
}

const getWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

/** replace the innerHTML of the body with list of error message from
 * failed tests */
const renderTestErrorList = () => {
  log(`TEST RESULTS`)
  log(`    passed: ${test_state.count_passed}`)
  log(`    failed: ${test_state.count_failed}`)
  if (0 !== test_state.count_failed ) {
    const error_content_header = 'TESTS FAILED'
    const error_message_content = test_state.error_list
      .reduce((content, error) => {
        return content.concat(errorToPrettyString(error))
      }, '')

    document.body.innerHTML = `<pre class="error-test-fail">${error_content_header}\n${error_message_content}</pre>`
    throw new Error("TESTS FAILED: unable to run program")
  }
}

const renderClickSmasherEffect = () => {
  const window_size = getWindowSize()

  const padding = 200
  const random_x = randomInt(padding, window_size.width - padding)
  const random_y = randomInt(padding, window_size.height - padding)
  const font_size = randomInt(15, 50)
  
  // debug({random_x, random_y, font_size, ...window_size})

  const view_count_click = document.createElement('h3')
  view_count_click.className = 'view-count-click'
  view_count_click.textContent = randomGrunt()
  view_count_click.style.fontSize = `${font_size}px` 
  view_count_click.style.bottom = `${random_y}px`
  view_count_click.style.right = `${random_x}px`

  document.body.appendChild(view_count_click)

  setTimeout(() => {
    console.log('boom')
    view_count_click.remove()
    console.log('boom')
  }, 500)
}

const renderUpdateToUnderConstruction = () => {
  const should_incrament = getShouldIncrament(count_click)
  for (let i=0;i<offset_position_list.length;i++) {
    updateOffsetPostion(offset_position_list, i, randomDirection(), should_incrament)
  }
  // debug({img_list: document.getElementsByName('img')})

  Array.prototype.forEach.call(document.getElementsByTagName('img'), (img, i) => {
    img.style.transform = offsetToCSSTransform(offset_position_list[i])
    // debug({i, img, transform: offsetToCSSTransform(offset_position_list[i])})
  })

}

// MAIN
const main = () => {
  renderTestErrorList()

  // get window size
  var is_click_hold = false
  renderUpdateToUnderConstruction()

  SMASHER.addEventListener('click', ( ) => {
    count_click++
    renderUpdateToUnderConstruction()
    renderClickSmasherEffect()
    // debug({inital: false, state: offset_position_list, should_incrament, count_click})
  })

  SMASHER.addEventListener('mousedown', ( ) => {
    is_click_hold = true
  })

  SMASHER.addEventListener('mouseup', ( ) => {
    is_click_hold = false
  })

  setInterval(() => {
    if (!is_click_hold) {
      return 
    }
    renderUpdateToUnderConstruction()
    renderClickSmasherEffect()
  }, 50)
}

main()
