/**
 * Services Grid Component
 * Displays 7 service buttons in a grid layout
 */

import Link from "next/link";

const services = [
  {
    name: "Tour",
    href: "/tours",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="25"
        fill="none"
        viewBox="0 0 27 25">
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.083 23.75.75 19.438V.75l8.333 4.313m0 18.687 8.334-4.312M9.083 23.75V5.063m0 0L17.417.75m0 18.688 8.333 4.312V5.063L17.417.75m0 18.688V.75"></path>
      </svg>
    ),
  },
  {
    name: "Domestic flight",
    href: "/flights/domestic",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="none"
        viewBox="0 0 25 25">
        <path
          stroke="#000"
          strokeWidth="1.5"
          d="M18.847 22.909a2.872 2.872 0 1 0 4.062-4.062l-3.385-3.384 2.523-10.068a1.35 1.35 0 0 0-.35-1.28l-.328-.332a1.354 1.354 0 0 0-2.09.2l-4.493 6.741L9.37 5.31V2.485c0-.36-.142-.704-.396-.957l-.381-.381a1.354 1.354 0 0 0-2.133.285l-1.828 3.2-3.2 1.828a1.354 1.354 0 0 0-.285 2.133l.38.38c.254.255.599.397.958.397h2.824l5.415 5.416-6.74 4.493a1.354 1.354 0 0 0-.2 2.09l.33.328c.337.332.823.465 1.281.35l10.068-2.523z"></path>
      </svg>
    ),
  },
  {
    name: "International flight",
    href: "/flights/international",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="none"
        viewBox="0 0 25 25">
        <path
          stroke="#000"
          strokeWidth="1.5"
          d="M18.847 1.591a2.872 2.872 0 1 1 4.062 4.062l-3.385 3.384 2.523 10.068c.115.459-.018.944-.35 1.28l-.328.332a1.354 1.354 0 0 1-2.09-.2l-4.493-6.741L9.37 19.19v2.824c0 .36-.142.704-.396.957l-.381.381c-.631.632-1.69.49-2.133-.285l-1.828-3.2-3.2-1.828a1.354 1.354 0 0 1-.285-2.133l.38-.38c.254-.255.599-.397.958-.397h2.824l5.415-5.416-6.74-4.493a1.354 1.354 0 0 1-.2-2.09l.33-.328a1.35 1.35 0 0 1 1.281-.35l10.068 2.523z"></path>
      </svg>
    ),
  },
  {
    name: "Hotel",
    href: "/hotels",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="29"
        fill="none"
        viewBox="0 0 27 29">
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M.75 27.75H3.5m0 0h6.875m-6.875 0v-27m6.875 27h5.5m-5.5 0v-7.5h-2.75c2.75-4 8.25-4 11 0h-2.75v7.5M3.5.75H.75m2.75 0h19.25m-6.875 27h6.875m0 0h2.75m-2.75 0v-27m0 0h2.75M9 6h1.375m5.5 0h1.375M9 12h1.375m5.5 0h1.375"></path>
      </svg>
    ),
  },
  {
    name: "International train",
    href: "/trains",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="29"
        fill="none"
        viewBox="0 0 22 29">
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M.75 12.75h20.417M6.583 23.25l-4.375 4.5m13.125-4.5 4.375 4.5m-8.75-15V2.25m-5.833 16.5h.015m11.652 0h.014m-11.39 4.5H16.5c1.634 0 2.45 0 3.074-.327a2.96 2.96 0 0 0 1.275-1.311c.318-.642.318-1.482.318-3.162V5.55c0-1.68 0-2.52-.318-3.162a2.96 2.96 0 0 0-1.275-1.311C18.95.75 18.134.75 16.5.75H5.417c-1.634 0-2.45 0-3.074.327a2.96 2.96 0 0 0-1.275 1.311C.75 3.03.75 3.87.75 5.55v12.9c0 1.68 0 2.52.318 3.162a2.96 2.96 0 0 0 1.275 1.311c.623.327 1.44.327 3.074.327"></path>
      </svg>
    ),
  },
  {
    name: "Airport formalities",
    href: "/airport-formalities",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="22"
        fill="none"
        viewBox="0 0 34 22">
        <path
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M10.25 17.75h12.667m-12.667 0c0 1.565-1.418 2.833-3.167 2.833s-3.166-1.268-3.166-2.833m6.333 0c0-1.565-1.418-2.833-3.167-2.833s-3.166 1.268-3.166 2.833m19 0c0 1.565 1.417 2.833 3.166 2.833 1.75 0 3.167-1.268 3.167-2.833m-6.333 0c0-1.565 1.417-2.833 3.166-2.833 1.75 0 3.167 1.268 3.167 2.833m-25.333 0h-.634c-.886 0-1.33 0-1.668-.154a1.5 1.5 0 0 1-.692-.62c-.173-.302-.173-.7-.173-1.493v-1.7c0-1.586 0-2.38.345-2.986A3.02 3.02 0 0 1 2.48 9.559c.677-.309 1.564-.309 3.338-.309h19c1.176 0 1.765 0 2.257.07 2.71.384 4.836 2.285 5.265 4.71.078.44.078.967.078 2.02 0 .263 0 .395-.02.505-.107.606-.638 1.082-1.316 1.178-.123.017-.27.017-.564.017H29.25M13.417.75v8.5m-9.5 0 .525-2.818c.376-2.019.564-3.028 1.127-3.785a4.65 4.65 0 0 1 2.01-1.525C8.508.75 9.652.75 11.94.75h5.327c1.487 0 2.23 0 2.906.183a5 5 0 0 1 1.635.784c.545.4.958.954 1.783 2.061l4.077 5.472"></path>
      </svg>
    ),
  },
  {
    name: "Travel insurance",
    href: "/insurance",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="27"
        fill="none"
        viewBox="0 0 24 27">
        <path
          fill="#231F20"
          d="M22.995 3.442 12.057.039a.8.8 0 0 0-.498 0L.62 3.447a.88.88 0 0 0-.448.338A1 1 0 0 0 0 4.342v10.233C0 23.48 11.126 26.56 11.603 26.687a.8.8 0 0 0 .437-.004c.683-.183 11.585-3.286 11.585-12.108V4.342c0-.203-.061-.4-.175-.562a.88.88 0 0 0-.455-.338m-1.12 11.133c0 6.844-8.592 9.797-10.062 10.233-1.47-.436-10.063-3.375-10.063-10.233V5.05l10.063-3.14 10.062 3.14z"></path>
        <path
          fill="#231F20"
          d="M10.938 7.497v.98a2.6 2.6 0 0 0-1.626 1.052 2.96 2.96 0 0 0-.537 1.953c.055.7.352 1.353.833 1.83a2.53 2.53 0 0 0 1.767.747h1.313c.232 0 .455.099.619.275a.97.97 0 0 1 .256.663.97.97 0 0 1-.256.662.85.85 0 0 1-.62.275h-2.624a.85.85 0 0 0-.619.275.97.97 0 0 0-.256.663c0 .248.092.487.256.663a.85.85 0 0 0 .619.274h.875v.938c0 .248.092.487.256.663a.85.85 0 0 0 .619.274.85.85 0 0 0 .619-.274.97.97 0 0 0 .256-.663v-.938a2.54 2.54 0 0 0 1.856-.824 2.92 2.92 0 0 0 .769-1.988c0-.746-.277-1.462-.769-1.99a2.54 2.54 0 0 0-1.856-.823h-1.313a.85.85 0 0 1-.618-.274.97.97 0 0 1-.257-.663c0-.25.093-.488.257-.663a.85.85 0 0 1 .618-.275H14a.85.85 0 0 0 .62-.274.97.97 0 0 0 .255-.663.97.97 0 0 0-.256-.663.85.85 0 0 0-.619-.275h-1.312v-.937a.97.97 0 0 0-.256-.663.85.85 0 0 0-.62-.275.85.85 0 0 0-.618.275.97.97 0 0 0-.256.663"></path>
      </svg>
    ),
  },
];

export default function ServicesGrid() {
  return (
    <section className="pt-4 px-3 md:px-[16vw] ">
      <div className="container mx-auto">
        <div className="grid grid-cols-3  md:grid-cols-5 gap-1 mx-auto">
          {services && services.length > 0 &&services.map((service) => (
            <Link
              key={service.name}
              href={service.href}
              className="grid-1 flex flex-col items-center  p-4 bg-white rounded-2xl border border-[#E6E6E6] hover:border-teal-500 hover:shadow-md transition-all cursor-pointer">
              <div className="text-4xl w-10 h-10 flex justify-center mb-1">
                {service.icon}
              </div>
              <span className="text-sm md:text-base  text-slate-500 text-center">
                {service.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
