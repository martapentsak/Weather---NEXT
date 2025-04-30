import { ReactElement, ReactNode } from "react";

type Props = {
  title: string;
  icon: ReactElement;
  children: ReactNode;
};

export const WeatherCard = ({ title, icon, children }: Props) => {
  return (
    <div className="w-auto p-[8px] bg-[rgba(49,114,178,0.8)] backdrop-blur-md border border-white/20 shadow-lg rounded-xl p-6">
      <header className="flex items-center text-[#6cb9ff]">
        <i className="mr-[5px]">{icon}</i>
        <p className="uppercase text-{14px] ">{title}</p>
      </header>
      <div className="p-[8px] ">{children}</div>
    </div>
  );
};
