interface Weeks {
    [key: string]: Date;
}

const MILLISECONDS_IN_SECOND = 1000
const SECONDS_IN_MINUTE = 60
const MINUTES_IN_HOUR = 60
const HOURS_IN_DAY = 24
const DAYS_IN_WEEK = 7

const currentDate = new Date

export const calculateWeeks = (currentDate: Date) => {
    const millisecondsInWeek =
      MILLISECONDS_IN_SECOND *
      SECONDS_IN_MINUTE *
      MINUTES_IN_HOUR *
      HOURS_IN_DAY *
      DAYS_IN_WEEK
  
    return {
      week1: currentDate,
      week2: new Date(currentDate.getTime() + millisecondsInWeek),
      week3: new Date(currentDate.getTime() + 2 * millisecondsInWeek),
      week4: new Date(currentDate.getTime() + 3 * millisecondsInWeek),
      week5: new Date(currentDate.getTime() + 4 * millisecondsInWeek),
      week6: new Date(currentDate.getTime() + 5 * millisecondsInWeek),
      week7: new Date(currentDate.getTime() + 6 * millisecondsInWeek),
      week8: new Date(currentDate.getTime() + 7 * millisecondsInWeek),
      week9: new Date(currentDate.getTime() + 8 * millisecondsInWeek),
    }
}


const currentWeek = (weeks: Weeks) => Object.keys(weeks).find(week => currentDate > weeks[week])