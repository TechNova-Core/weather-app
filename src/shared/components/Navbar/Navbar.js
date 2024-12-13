import { memo } from "react";
import { useStore } from "../store";
import { icons } from "../icons";

const Navbar = memo(() => {
  //--------------------------------------------------------

  return (
    <>
        <header className="flex justify-between items-center px-4 mb-1">
          <h1 className="font-segoe font-semibold text-h1 text-white">
            {useStore((state) => state.city)}
          </h1>
          <div className="text-h2">{icons.hamburger}</div>
        </header>
    </>
  );
});

export default Navbar;
