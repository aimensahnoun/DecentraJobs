const NavItem = ({Icon , isActive , onClick , title}) => {
  return (
    <div
      className={`flex space justify-between xl:2-[90%] 2xl:w-[65%] h-[2.5rem]  items-center px-3 rounded-lg cursor-pointer transition-all duration-300 select-none ${
        isActive  ? "bg-[#E2EDEE]" : "opacity-50 hover:opacity-100"
      }`}
      onClick={onClick}
    >
      <div className="flex gap-x-4">
        <Icon className="text-[#297979] text-[1.5rem]" />
        <span
          className={`${
            isActive  ? "text-[#297979]" : "text-[#555B5E]"
          }`}
        >
          {title}
        </span>
      </div>
      <div></div>
    </div>
  );
};

export default NavItem;