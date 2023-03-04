
/*
 * style gide for this under construction page
 *
 * variables_use_snake_case
 * functionsUseCamelCase
 * CONSTANTS_USE_UPPER_CASE
 */

// -- CONSTANTS
const DAMAGE_MAX = 100
const DISBLE_LOG = false

const EL_DIALOG = document.getElementById("dialog")

const UNDER = "under"
const CONSTRUCTION = "construction"
const UNDER_CONSTRUCTION = UNDER.concat(CONSTRUCTION)
const LIST_DIRECTION = ["up", "down", "left", "right"]
const LIST_GRUNT = [
  "Ah, that feels better!","Thank you.","I can feel my strength returning.",
  "Biff!", "Boom!", "Crack!", "Crash!", "Crunch!", "Kaboom!", "Kapow!", 
  "Bluh!", "Boo!", "Brr!", "D'oh!", "Dang!", "Derp!", "Duh!", "Eep!", "Feh!", 
  "F*@#", "WHYYY", "Ouch!", "MMMMh", "UGGH", "MY EYES", "YOU ARE A MONSTER", 
  "Gah!", "Grr!", "Hmph!", "Hoo!", "Hurk!", "Mmmph!", "Ngh!", "Nyah!", "Oops!", 
  "Hmm...", "Well...", "Er...", "Erm...", "OOOF!", "!!OUCH", 
  "Huh?", "Mm-hmm!", "Mmm!", "Pah!", "Tut!", "Tsk!", "Uh-huh!", "Umm...", 
  "I HATE YOU", "NO NO NO", "Whhy me?", "STOP", "I...", "GUHh", "!", 
  "I can feel my wounds closing up.","I thought I was a goner there for a minute.",
  "I can't thank you enough.","That's exactly what I needed.",
  "I couldn't have made it without you.","You're the best.","I'm feeling like a million bucks!",
  "I feel like I could run a marathon!","I'm feeling the healing power of your touch.","You're a master of your craft.",
  "I feel like a new person!","I owe you one.","I'm in awe of your skills.",
  "I'm back in the game!","Thanks for having my back.","I feel like I could take on the world!",
  "I'm feeling like I could take on the world!","I'm feeling better already, thanks to you.",
  "I'm feeling like a new person thanks to your healing.","You're a true master of your craft.",
  "I'm feeling rejuvenated and ready to go.","You're a true legend.","I'm feeling like I can do anything!",
  "I'm feeling rejuvenated.","You're a true gem.","I'm feeling the energy of your healing powers.",
  "I'm feeling the strength of your healing powers.","You're a real hero in my book.",
  "I'm ready to get back in the fight.","You have my eternal gratitude.",
  "Ker-splat!", "Ker-thump!", "Ker-whack!", "Pow!", "Pop!", "Smash!", 
  "Make it stop!", "Please, no more!", "This is agony!", "I can't take it!", "It's too much!",
  "My wounds...", "I'm in pain...", "This is unbearable!", "I'm dying...", "Somebody help me!",
  "Oh, that's the spot.","I'm starting to feel like myself again.",
  "Owie!", "Phew!", "Pfft!", "Phooey!", "Pshaw!", "Rats!", "Sheesh!", "Shh!", 
  "Shoo!", "Sigh!", "Sput!", "Squee!", "Squish!", "Uck!", "Urgh!", "Urf!", 
  "Snap!", "Splat!", "Squish!", "Thud!", "Thump!", "Twack!", "Whack!", 
  "That's just what the doctor ordered." ,"I'm forever in your debt.","You're a true lifesaver.",
  "This is the end...", "I can't go on...", "I don't want to die...",
  "Uh!", "Ow!", "Eek!", "Ugh!", "Ack!", "Agh!", "Argh!", "Bleh!", "Blergh!", 
  "Vom!", "Wham!", "Whoa!", "Whomp!", "Womp!", "Yech!", "Yuck!", "Yow!", 
  "Whammy!", "Zap!", "Zing!", "Zip!", "Zoom!", "Ahem!", "Hem!", "Hic!", "Hm!", 
  "Why me?", "Not again!", "No, please...", "Stop the pain...", "I can barely move...",
  "Yikes!", "Yip!", "Yipe!", "Yowza!", "Zoinks!", "Zowie!", "Bang!", "Bash!", 
  "You really got me that time", "Ahh!", "Ow!", "Ugh!", "It hurts!", "That stings!",
  "You're a lifesaver.","That's just what I needed.", "FUCK THAT HURTS", 
  "You're a miracle worker.","I'm ready to kick some butt!","You saved my life.","I'm feeling stronger by the second.",
  "You're a real hero.","That's the good stuff.","You're a top-notch healer.","I'm in your debt.",
  "You're a real pro when it comes to healing.","I'm feeling like I can take on the world thanks to you.",
  "You're a true angel.","I'm feeling like a brand new person thanks to you.",
  "You're a true friend.","I'm feeling better already.","You have no idea how much this means to me.",
  "You're a true godsend.","I'm feeling the healing power of your magic.","You're a true master of the healing arts.",
  "You're a true hero in every sense of the word.","I'm feeling the healing energy of your touch.",
  "You're a true wizard.","I'm feeling like a superhero!","You're a true miracle worker.",
  "You're an amazing healer.","I'm feeling the power of your healing touch.","You're a true champion of healing.",
  "You're the best healer around.","You're a real superstar.","I'm back in fighting form.",
  ,"You're a real pro.","I'm ready to go the extra mile!","You're a true champion.",
]
const FAKE_ERROR_MESSAGES = [
  "Unexpected token", "Undefined variable", "Cannot read property 'x' of undefined", "Invalid argument",
  "Syntax error", "Unexpected end of input", "Cannot set property 'x' of undefined", "Object is not a function", "Maximum call stack size exceeded",
  "Cannot convert undefined or null to object", "Type error", "Reference error", "Cannot read property 'length' of undefined",
  "Cannot read property 'x' of null", "Cannot read property 'x' of undefined", "Cannot read property 'x' of non-object", "Cannot set property 'length' of undefined",
  "Cannot set property 'x' of non-object", "Cannot set property 'x' of read-only object", "Cannot set property 'x' of sealed object", "Cannot set property 'x' of frozen object", "Cannot create property 'x' on non-object",
  "Cannot delete property 'x' of non-object", "Cannot define property 'x' on non-object", "Cannot redefine property 'x'", "Cannot use 'in' operator to search for 'x' in non-object", "Cannot use 'delete' operator to delete 'x' in non-object",
  "Cannot use 'instanceof' operator on non-object", "Cannot use 'typeof' operator on undefined", "Cannot assign to const variable", "Cannot assign to a function declaration",
  "Cannot assign to a non-writable property", "Cannot assign to a getter-only property", "Cannot assign to a non-existent property", "Cannot assign to read-only property",
  "Cannot assign to constant variable", "Cannot assign to a getter/setter", "Cannot create property 'x' on immutable object", "Cannot modify an immutable binding",
  "Cannot change the value of a non-configurable property", "Cannot delete a non-configurable property", "Cannot define a non-configurable property", "Cannot redeclare a var",
  "Cannot redeclare a function", "Duplicate parameter name", "Missing initializer in const declaration", "Missing initializer in destructuring declaration",
  "Missing initializer in var declaration", "Unexpected number", "Unexpected string", "Unexpected identifier",
  "Unexpected boolean", "Unexpected null", "Unexpected object", "Unexpected array",
  "Unexpected character", "Invalid regular expression", "Invalid left-hand side in assignment", "Invalid left-hand side in for-loop", "Invalid left-hand side in post-increment expression",
  "Invalid left-hand side in pre-increment expression", "Invalid right-hand side in assignment", "Invalid right-hand side in comparison", "Invalid right-hand side in logical expression",
  "Invalid right-hand side in binary expression", "Invalid operands to binary expression", "Invalid use of void operator", "Invalid use of delete operator",
  "Invalid use of new operator", "Invalid use of this keyword", "Invalid use of super keyword", "Invalid use of import keyword",
  "Invalid use of export keyword", "Invalid argument for function", "Invalid callback function", "Invalid arity", "Invalid number of arguments",
  "Invalid type for argument", "Invalid type for return value", "Invalid property descriptor", "Invalid array length", "Invalid JSON",
  "Async function was not awaited", "Missing catch or finally clause", "Invalid catch variable", 
]
// -- STATE
const state = {
  test_state: {
    list_error: [],
    list_test: [],
    count_passed: 0,
    count_failed: 0,
  },
  percent_bugs_patched: 0,
  count_click: 0,
  count_grunt: 0,
  count_damage: 0,
  mode_interval: false,
  mode_smash: false,
  mode_too_far: false,
  list_offset_position: null,
}

// -- UTILS
// ---- LOGGING

/** console.log if DISBLE_LOG is false */
const logInfo = (...args) => {
  if (DISBLE_LOG) return
  console.log (...args)
}

/** console.error if DISBLE_LOG is false */
const logWarn = (...args) => {
  if (DISBLE_LOG) return
  console.error(...args)
}

/** pretty print data in variables - debug({some_data, other_data}) */
const debug = (arg) => {
  if (DISBLE_LOG) return arg
  console.dir(arg, {depth: 100})
  return arg
}

/**
 * print the hint and value and return the value
 * - doSomething(1234, debugValue("doSomething 2nd Arg", some_data))
 */
const debugValue = (hint, value) => {
  logInfo(hint, value);
  return value
}

// ---- TESTING
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
    logInfo(`    passed: ${description}`)
  } catch (error) {
    error.message = `     Assert ${description} failed with Error: ${error.message}`
    logWarn(error)
    throw error
  }
}

/** register a test into state.test_state.list_test */
const test = (test_name, test_handler) => {
  state.test_state.list_test.push({
    test_name,
    test_handler,
  })

}

const testSuiteRun = () => {
  state.test_state.list_test.forEach(({test_name, test_handler}) => {
    try {
      logInfo(`TEST: ${test_name}`)
      test_handler()
      state.test_state.count_passed++
    } catch (error) {
      state.test_state.count_failed++
      state.test_state.list_error.push(error)
      logWarn(`TEST: ${test_name} failed`)
      logWarn(error)
    }
  })
}

// ---- BROWSER
/** get width width and height */
const getWindowSize = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

// ---- NUMBERS
/** do not allow values smaller than min */
const clampMin = (min, value) => {
  if (value < min) return min
  return value
}
test("clampMin", () => {
  assertTrue("should return zero", () =>  0 == clampMin(0, -1) )
  assertTrue("should return value", () =>  5 == clampMin(0, 5) )
})

/** do not allow values smaller than min or larger than max */
const clamp = (min, max, value) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

/*
 * return a number between 0 and max
 * (including zero)
 * (not including max) */
const randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}


// random strings
/** return a random direction from DIRECTION_LIST */
const randomDirection = () => {
  // const random_int = randomInt(0, 100)
  // const random_index = random_int % DIRECTION_LIST.length
  return LIST_DIRECTION[randomInt(0, LIST_DIRECTION.length)]
}
test("randomDirection", () => {
  assertTrue("should be a direction", () => {
    return -1 < LIST_DIRECTION.indexOf(randomDirection())
  })
})

/** return a random grunt from GRUNT_LIST */
const randomGrunt = () => {
  return LIST_GRUNT[randomInt(0, LIST_GRUNT.length)]
}
test("randomGrunt", () => {
  assertTrue("should be a grun", () => {
    return -1 < LIST_GRUNT.indexOf(randomGrunt())
  })
})

// STATE

/**
 * initalize state.list_offset_position
 * create one {up, down, left, right} for each charicter in UNDER_CONSTRUCTION
 * if should_random is true
 *    each direction will be a different random number between 0 and 100
 * if should_random is false it will be 0
 */
const stateResetListOffsetPostition = (should_random) => {
  const getValue = should_random ? () => randomInt(0, 200) : () => 0
  state.list_offset_position = Array.prototype.map.call(UNDER_CONSTRUCTION, () => {
    return {
      up: getValue(),
      down: getValue(),
      left: getValue(),
      right: getValue(),
    }
  })
}

/**
 * update the direction of an offset_position in state.list_offset_position
 * if state.mode_smash the direction's offset will incrament
 * else the direction's offset will decrement, but never go below zero
 */
const stateUpdateOffsetPosition = (index, direction) => {
  const offset_amount = 5
  const list_offset_position = state.list_offset_position
  if (0 === list_offset_position.length) {
    return
  }
  const index_safe = clamp(0, list_offset_position.length - 1, index)
  // debug({index_safe, index, offset_amount, list_offset_position})
  const offset_position = list_offset_position[index_safe]
  const current_value = offset_position[direction]
  if (state.mode_smash) {
    offset_position[direction] = current_value + offset_amount
  } else {
    offset_position[direction] = clampMin(0, current_value - offset_amount)
  }
  return list_offset_position
}

const stateUpdateEveryOffsetPosition = () => {
  state.list_offset_position.forEach((_, index) => {
    stateUpdateOffsetPosition(index, randomDirection())
  })
}

const stateCheckIfEveryOffsetPostionIsZero = () => {
  const sum = state.list_offset_position.reduce((result, offset_position) => {
    return result
    + offset_position.up
    + offset_position.down
    + offset_position.left
    + offset_position.right
  }, 0)

  return sum === 0
}

const stateSetModeSmash = (is_on) => {
  state.mode_smash = is_on
}

const stateSetModeTooFar = (is_on) => {
  state.mode_too_far = is_on
}


/* -- UI HELPERS */
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

/** convenrt an offset_position into a valid css translate string */
const offsetToCSSTransform = (offset_position) => {
  const {up, down, left, right} = offset_position
  return `translate(${right - left}px, ${down - up}px)`
}


// -- RENDER VIEWS
/** replace the innerHTML of the body with list of error message from
 * failed tests */
const renderTestErrorList = () => {
  const test_state = state.test_state
  logInfo(`TEST RESULTS`)
  logInfo(`    passed: ${test_state.count_passed}`)
  logInfo(`    failed: ${test_state.count_failed}`)
  if (0 !== test_state.count_failed ) {
    const error_content_header = 'TESTS FAILED'
    const error_message_content = test_state.list_error
      .reduce((content, error) => {
        return content.concat(errorToPrettyString(error))
      }, '')

    document.body.innerHTML = `
    <pre class="error-test-fail">
      ${error_content_header}\n${error_message_content}
    </pre>`.trim()
    throw new Error("TESTS FAILED: unable to run program")
  }
}

/** render a grunt in a random location on the window for a short duration*/
const renderGrunt = () => {
  const display_for_ms = 3000
  const window_size = getWindowSize()
  const padding = 200
  const random_x = randomInt(padding, window_size.width - padding)
  const random_y = randomInt(padding, window_size.height - padding)
  const random_font_size = randomInt(15, 50)

  const view_count_click = document.createElement('h3')
  view_count_click.className = 'grunt'
  view_count_click.textContent = randomGrunt()
  view_count_click.style.fontSize = `${random_font_size}px` 
  view_count_click.style.bottom = `${random_y}px`
  view_count_click.style.right = `${random_x}px`
  document.body.appendChild(view_count_click)

  setTimeout(() => {
    view_count_click.remove()
  }, display_for_ms)
}

const renderUnderConstructionOffset = () => {
  Array.prototype.forEach.call(document.getElementsByTagName('img'), (img, index) => {
    const list_offset_postition = state.list_offset_position
    const safe_index = clamp(0, list_offset_postition.length -1 , index)
    const offset_position = list_offset_postition[safe_index]
    img.style.transform = offsetToCSSTransform(offset_position)
  })
}

// MAIN
const main = () => {
  try {
    testSuiteRun()
    stateSetModeSmash(false)
    stateResetListOffsetPostition(true)
    renderUnderConstructionOffset()

    const interval_id = setInterval(() => {
      if (stateCheckIfEveryOffsetPostionIsZero()) {
        console.log("done")
        clearInterval(interval_id)
        return
      }

      console.log("auto updateing updateing ")

      stateUpdateEveryOffsetPosition()
      renderUnderConstructionOffset()
    }, 25)

  } catch (error) {
    state.test_state.count_failed++
    state.test_state.list_error.push(error)
    renderTestErrorList()
  }
}

main()
