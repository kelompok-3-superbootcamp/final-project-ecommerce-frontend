import React from "react"
import { format } from "date-fns"

const Dashboard = () => {
  return (
    <div className="flex h-full w-auto flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-3xl font-bold">Hello, username</h1>
      <div className="rounded-lg bg-primary-blue p-4 text-center">
        <p className="text-lg text-white">{format(new Date(), "EEEE, dd MMMM yyyy")}</p>
      </div>
    </div>
  )
}

export default Dashboard
