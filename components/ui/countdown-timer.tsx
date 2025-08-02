"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const targetDate = new Date("2025-09-18T00:00:00").getTime()

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex items-center space-x-1 px-3 py-2 rounded animate-pulse">
      <div className="flex items-center space-x-1 text-sm md:text-base font-bold">
        <div className="flex flex-col items-center leading-none">
          <span className="text-base md:text-lg font-extrabold animate-bounce bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            {timeLeft.days}
          </span>
          <span className="text-[8px] md:text-[10px] bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
            DAYS
          </span>
        </div>
        <span className="text-base md:text-lg animate-ping bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
          :
        </span>
        <div className="flex flex-col items-center leading-none">
          <span className="text-base md:text-lg font-extrabold animate-bounce bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            {timeLeft.hours.toString().padStart(2, "0")}
          </span>
          <span className="text-[8px] md:text-[10px] bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
            HRS
          </span>
        </div>
        <span className="text-base md:text-lg animate-ping bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
          :
        </span>
        <div className="flex flex-col items-center leading-none">
          <span className="text-base md:text-lg font-extrabold animate-bounce bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </span>
          <span className="text-[8px] md:text-[10px] bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
            MIN
          </span>
        </div>
        <span className="text-base md:text-lg animate-ping bg-gradient-to-r from-red-500 to-yellow-500 bg-clip-text text-transparent">
          :
        </span>
        <div className="flex flex-col items-center leading-none">
          <span className="text-base md:text-lg font-extrabold animate-bounce bg-gradient-to-r from-yellow-400 to-red-500 bg-clip-text text-transparent">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </span>
          <span className="text-[8px] md:text-[10px] bg-gradient-to-r from-yellow-300 to-red-400 bg-clip-text text-transparent">
            SEC
          </span>
        </div>
      </div>
    </div>
  )
}
