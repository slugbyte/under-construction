/*
 * style gide for this under construction page
 *
 * variables_use_snake_case
 * functionsUseCamelCase
 * CONSTANTS_USE_UPPER_CASE
 */

// -- CONSTANTS
const DISBLE_LOG = false
const UNDER = "under"
const CONSTRUCTION = "construction"
const UNDER_CONSTRUCTION = UNDER.concat(CONSTRUCTION)
const LIST_DIRECTION = ["up", "down", "left", "right"]

// -- STATE
const state = {
  test_state: {
    list_error: [],
    list_test: [],
    count_passed: 0,
    count_failed: 0,
  },
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

/** execute every test stored in state.test_state.list_test */
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

  if (0 !== state.test_state.list_error.length) {
    throw new Error("Test Suite Failed")
  }
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
  assertTrue("should return min", () =>  0 == clampMin(0, -1) )
  assertTrue("should return value", () =>  5 == clampMin(0, 5) )
})

/** do not allow values smaller than min or larger than max */
const clamp = (min, max, value) => {
  if (value < min) return min
  if (value > max) return max
  return value
}
test("clamp", () => {
  assertTrue("should return min", () =>  0 == clamp(0, 5, -1) )
  assertTrue("should return max", () =>  5 == clamp(0, 5, 10) )
  assertTrue("should return value", () =>  3 == clamp(0, 5, 3) )
})


// ---- RANDOM
/*
 * return a number between 0 and max
 * (including zero)
 * (not including max) */
const randomInt = (min, max) => {
  return min + Math.floor(Math.random() * (max - min))
}

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
 */
const stateUpdateOffsetPosition = (index, direction) => {
  const offset_amount = 1
  const list_offset_position = state.list_offset_position
  if (0 === list_offset_position.length) {
    return
  }
  const index_safe = clamp(0, list_offset_position.length - 1, index)
  // debug({index_safe, index, offset_amount, list_offset_position})
  const offset_position = list_offset_position[index_safe]
  const current_value = offset_position[direction]
  offset_position[direction] = clampMin(0, current_value - offset_amount)
  return list_offset_position
}

/** update a randomDirection for each offset_position in state.list_offset_position */
const stateUpdateEveryOffsetPosition = () => {
  state.list_offset_position.forEach((_, index) => {
    stateUpdateOffsetPosition(index, randomDirection())
  })
}

/** return true if all directioins of all offset_position are zero */
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

// -- RENDER VIEWS
/** replace the innerHTML of the body with
 * a list of error messages from failed tests */
const renderListError = () => {
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

const renderUnderConstructionOffset = () => {
  Array.prototype.forEach.call(document.getElementsByTagName('img'), (img, index) => {
    const list_offset_postition = state.list_offset_position
    const safe_index = clamp(0, list_offset_postition.length -1 , index)
    const offset_position = list_offset_postition[safe_index]
    img.style.transform = offsetToCSSTransform(offset_position)
  })
}

/** run renderListError if an error is thrown */
const renderErrorIfHandlerThrows = (handler )  => {
  try {
    handler()
  } catch (error) {
    state.test_state.count_failed++
    state.test_state.list_error.push(error)
    renderListError()
  }
}

// MAIN
const main = () => {
  renderErrorIfHandlerThrows(() => {
    testSuiteRun()
    stateResetListOffsetPostition(true)
    renderUnderConstructionOffset()
    const interval_id = setInterval(() => {
      renderErrorIfHandlerThrows(() => {
        if (stateCheckIfEveryOffsetPostionIsZero()) {
          console.log("done")
          clearInterval(interval_id)
          return
        }
        stateUpdateEveryOffsetPosition()
        renderUnderConstructionOffset()
      })
    }, 10)
  })
}

main()
