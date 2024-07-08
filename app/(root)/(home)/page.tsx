//@ts-nocheck

"use client";

import MeetingTypeList from "@/components/MeetingTypeList";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call } from "@stream-io/node-sdk";
import { useEffect, useState } from "react";

const Home = () => {
  const now = new Date();
  const { upcomingCalls } = useGetCalls();

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);

  const calls = upcomingCalls;
  console.log(upcomingCalls);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full justify-between max-md:px-5 max-md:py-8 lg:p-11">
          {/* current date and time */}
          <div className="flex flex-col gap-2 w-full">
            <h1 className="text-4xl lg:text-7xl font-extrabold">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>

          {/* list of all the upcoming meetings */}
          <div className="flex flex-col gap-2 overflow-y-scroll w-full">
            {calls && calls.length > 0 ? (
              calls.map((call: Call) => (
                <ul
                  key={call.id}
                  className="glassmorphism rounded p-2"
                >
                  <li className="max-w-[270px] rounded text-base font-normal">
                    {call.state?.custom?.description?.substring(0, 30)}
                  </li>
                  <li className="max-w-[270px] rounded text-base font-normal">
                    {call.state?.startsAt.toLocaleTimeString()}
                  </li>
                </ul>
              ))
            ) : (
              <h2 className="glassmorphism rounded py-3 text-center text-base font-normal">
                No Upcoming Meeting
              </h2>
            )}
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
