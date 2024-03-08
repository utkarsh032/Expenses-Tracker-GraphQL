import { TypewriterEffectSmooth } from "../ui/TypeWriter";

export function Header() {
  const words = [
    {
      text: "Expenses",
      className: "text-[#fff] ",
    },
    {
      text: "Tracker",
      className: "text-[#fff] ",
    },
    {
      text: "GQL",
      className: "text-[#e10098] ",
    },
    {
      text: ".",
      className: "text-[#fff] ",
    },
  ];
  return (
    <div className="mb-10 md:text-6xl text-4xl lg:text-8xl font-bold text-center  relative z-50 text-white pt-10">
      <p className="text-xs sm:text-base  ">

      </p>
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
