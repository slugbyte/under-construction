
// CONSTANTS
const UNDER = "under"
const CONSTRUCTION = "construction"
const UNDER_CONSTRUCTION = UNDER.concat(CONSTRUCTION)
const DIRECTION_LIST = ["up", "down", "left", "right"]
const SMASHER = document.getElementById("smasher")

// STATE
const offset_position = Array.prototype.map.call(UNDER_CONSTRUCTION, () => {
  return {
    up: 0,
    down: 0,
    left: 0,
    right: 0,
  }
})

var count_click = 0

// UTIL
const debug = (arg) => {
  console.dir(arg, {depth: 100})
  return arg
}

const assert = (message, handler) => {
  try {
    if (!handler()) {
      throw new Error(`${message} failed: handler returned false`)
    }
    console.log(`passed: ${message}`)
  } catch (error) {
    error.message = `assert ${assert} failed: ${error.message}`
    throw  error
  }
}

const clampMin = (min, value) => {
  if (value < min) return min
  return value
}

const randomDirection = () => {
  const randomInt = Math.floor(Math.random() * 100)
  const randomIndex = randomInt % DIRECTION_LIST.length
  return DIRECTION_LIST[randomIndex]
}

const getShouldIncrament = (count_click) => {
  // every 10 clicks switch from incrament to decrament
  return (count_click % 20)  < 10
}

(() => {
  console.log("testing getShouldIncrament")
  assert("every other 10 range should be true", () => {
    return true 
    && getShouldIncrament(0)
    && getShouldIncrament(9)
    // && getShouldIncrament(3l)
    // && getShouldIncrament(39)

  })
})()

const updateOffsetPostion = (offset_position, index, direction, should_incrament) => {
    // incrament two random directions for each charicter to walk
    const current_value = offset_position[index][direction]
    if (should_incrament) {
      offset_position[index][direction] = current_value + 1
    } else {
      offset_position[index][direction] = clampMin(0, current_value - 1)
    }
}

SMASHER.addEventListener('click', ( ) => {
  count_click++
  const should_incrament = getShouldIncrament(count_click)
  for (let i=0;i<offset_position.length;i++) {
    updateOffsetPostion(offset_position, i, randomDirection(), should_incrament)
  }

  debug({inital: false, state: offset_position, should_incrament, count_click})
})

debug({inital: true , state: offset_position})
