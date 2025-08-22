"use client";
import { ReactElement, ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactElement;
  children: ReactNode;
};

export const WeatherCard = ({ title, icon, children }: Props) => {
  return (
    <div className="sm:h-[150px]  md:h-[190px]  lg:h-[200px] min-w-[130px]  w-full py-2 p bg-white/10 backdrop-blur-md border border-white/20 shadow-lg rounded-xl overflow-hidden">
      <header className="flex items-center text-[#3b658c] pl-2">
        <i className="mr-[5px]">{icon}</i>
        <p className="uppercase text-[13px]">{title}</p>
      </header>
      <div className="p-[8px] h-[85%]">{children}</div>
    </div>
  );
};
