const WEEKS_TO_BREAK: number = 8
const firstGoal: number = 54
const occurrences: number = 10

const getPerWeekDecrement = (firstGoal: number, totalWeeks: number) => {
  return firstGoal < totalWeeks ? 1 : Math.ceil(firstGoal/totalWeeks)
}

const calculateGoal = (firstGoal: number, perWeekDecrement: number, week: number) => {
  const nextGoal = firstGoal - (perWeekDecrement * (week - 1))
  return nextGoal < 0 ? 0 : nextGoal
}

const outputWeeklyGoal = (week: number, goal: number) => {
  console.log(`Week ${week}: ${goal}`)
}

function calculateProgress (occurrences: number, goal: number) {
    const progress: number = goal-occurrences
    if(progress > 3) {
        console.log("You are on track to achieve this week's goal!")
        return true
    } else if(progress < 1) {
        console.log("You have failed your goal") // if fail prompt to restart with fail number as initial goal
        return false
    } else {
        console.log(`You are ${progress} occurrences away from failing your goal :(`)
        return true
    }
}


const perWeekDecrement = getPerWeekDecrement(firstGoal, WEEKS_TO_BREAK)

for (let week = 1; week <= WEEKS_TO_BREAK; week++) {
  const goal = calculateGoal(firstGoal, perWeekDecrement, week)
  outputWeeklyGoal(week, goal)
  calculateProgress(occurrences, goal)
}

console.log("Week 9: 0")