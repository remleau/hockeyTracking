import React, { useEffect, useState } from "react";

export default function PägeTitle({ title, icon }) {
  const [LucideIcon, setLucideIcon] = useState(null);

  useEffect(() => {
    // Dynamically import the icon
    import("lucide-react")
      .then((module) => {
        setLucideIcon(() => module[icon]);
      })
      .catch(() => {
        console.error(`Icon "${icon}" not found in lucide-react.`);
        setLucideIcon(null); // Fallback if icon is not found
      });
  }, [icon]);

  // Split the title into first word and the rest
  const [firstWord, ...restOfTitle] = title.split(" ");
  const restTitle = restOfTitle.join(" ");

  return (
    <div className="py-6 flex items-center">
      {LucideIcon && <LucideIcon size={20} className="mr-3" />}
      <h2 className="scroll-m-20 text-gray-800 text-3xl font-black font-[montserrat]">
        <span>{firstWord}</span> <span className="font-black">{restTitle}</span>
      </h2>
    </div>
  );
}
