import AsyncStorage from '@react-native-async-storage/async-storage';

interface Weeks {
    [key: string]: Date;
}

const MILLISECONDS_IN_SECOND = 1000
const SECONDS_IN_MINUTE = 60
const MINUTES_IN_HOUR = 60
const HOURS_IN_DAY = 24
const DAYS_IN_WEEK = 7

// Sets 9 weeks from current date
export const calculateWeeks = (currentDate: Date) => {
    const millisecondsInWeek =
      MILLISECONDS_IN_SECOND * 5//* 
      //SECONDS_IN_MINUTE *
      // MINUTES_IN_HOUR *
      // HOURS_IN_DAY *
      // DAYS_IN_WEEK
  
    return {
      week0: currentDate,
      week1: new Date(currentDate.getTime() + millisecondsInWeek),
      week2: new Date(currentDate.getTime() + 2 * millisecondsInWeek),
      week3: new Date(currentDate.getTime() + 3 * millisecondsInWeek),
      week4: new Date(currentDate.getTime() + 4 * millisecondsInWeek),
      week5: new Date(currentDate.getTime() + 5 * millisecondsInWeek),
      week6: new Date(currentDate.getTime() + 6 * millisecondsInWeek),
      week7: new Date(currentDate.getTime() + 7 * millisecondsInWeek),
      week8: new Date(currentDate.getTime() + 8 * millisecondsInWeek),
      week9: new Date(currentDate.getTime() + 9 * millisecondsInWeek),
    }
}

// Calculate week that should be used based on current date to compare w/ last stored current week
export const calculateCurrentWeek = (weeks: Weeks, currDate: Date) => {
  let lastWeekKey = undefined
  Object.keys(weeks).forEach((week) => {
    if (currDate >= weeks[week]) {
      lastWeekKey = week
    }
  })
  return lastWeekKey
}

// Get amount to decrement goal each week
export const getPerWeekDecrement = (firstGoal: number, totalWeeks: number) => {
  return firstGoal < totalWeeks ? 1 : Math.ceil(firstGoal/totalWeeks)
}

// Calculate next goal for each week
export const calculateGoal = (firstGoal: number, perWeekDecrement: number, week: number) => {
  const nextGoal = firstGoal - (perWeekDecrement * (week - 1))
  return nextGoal < 0 ? 0 : nextGoal
}

export const getWeekNumber = (currentWeek: string) => {
  return parseInt(currentWeek.charAt(currentWeek.length - 1)) + 1
}


export const clearData = async (navigation: any, setHabit: any, setReset: any, setWeeks: any, setWeekDecrement: any, setOccurrences: any, setCurrentWeek: any) => {
    try {
        await AsyncStorage.removeItem('habit')
        await AsyncStorage.removeItem('weeks')
        await AsyncStorage.removeItem('currentWeek')
        await AsyncStorage.removeItem('goalDecrement')
        await AsyncStorage.setItem('occurrences', '0')
        
        // Navigate with delay for better visual experience
        setTimeout(() => {
            navigation.navigate('CreateHabitLayout', { screen: 'EnterHabitPage' })
        }, 200)

        // Clearing habit with delay prevents habit title from visually 
        // disappering before going to EnterHabitPage
        setTimeout(() => {
            setHabit({
                habitName: "",
                gem: "silver",
                goal: 0,  
            })
        }, 230)

        setReset(true)
        setWeeks({})
        setWeekDecrement(1)
        setOccurrences(0)
        setTimeout(() => {
          setCurrentWeek('')
        }, 400)

    } catch (error) {
        console.log(error)
    }
}