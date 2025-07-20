import React from 'react'

interface TagLineProps {
  text: React.ReactNode;
  width: string;
}

interface TitleProps {
  text: React.ReactNode;
  spanText: React.ReactNode;
  className?: string; 
}

export const TagLine = ({text, width}: TagLineProps) => {
  return (
     <div className={`rounded-3xl tracking-wider p-px bg-gradient-to-r from-pink-600 ${width} via-pink-400 to-transparent  mx-auto box-content uppercase`}> 
          <div className="bg-[#08021b] rounded-xl ">
          <p className=" bg-gradient-to-r from-pink-600 to-white text-transparent bg-clip-text">{text}</p> 
          </div>
          </div>
  )
}

export const Title = ({text, spanText, className}: TitleProps) => {
  return (
    <p className={`${className || " leading-16 mt-8"} text-white  text-6xl text-center font-semibold `}>
            {text} {" "}
            <span className="bg-gradient-to-r from-pink-600 to-rose-300 text-transparent bg-clip-text">
              {spanText}
            </span>
          </p>
  )
}