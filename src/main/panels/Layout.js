import { memo, useEffect, useState } from "react";
import { useStore } from "../../shared/components/store";
import Navbar from "../../shared/components/Navbar/Navbar"
// import { icons } from "shared/components/icons";
import { images } from "shared/components/images";
const Layout = memo(() => {
  //--------------------------------------------------------
const weatherType = useStore((state) => state.weatherType)
const [image, setImage] = useState(null);


// const weatherIcon = (type) => {

//   return icons[`daily`+type] || null
// };
// useEffect(() => {
//   setIcon(weatherIcon(weatherType));
// }, [weatherType]);

const weatherImage = (type) => {

  return images[type.toLowerCase()] || null
};
useEffect(() => {
  setImage(weatherImage(weatherType));
}, [weatherType]);


// memari network dar projjhe reacti chejoori bayad bashe ba estefade axios (react query va etc nmikham)
// closure and debounce and theratul

//https://medium.com/@bs903944/debounce-and-throttling-what-they-are-and-when-to-use-them-eadd272fe0be

// hadaghal ye wrapper bade estefade az core niyaz (name dige interceptore)

// what is suspence react 

//getter setter in zustand

  return (
    <div>
      <section className="py-4 px-[13px] bg-dark-blue-100">
        <Navbar></Navbar>
        <section className="flex justify-between px-4">
          <div>
            <div>
              <h1 className="font-black text-[96px] h-[114px] text-white">
                {useStore((state) => state.weatherDegree)}
                <span className="text-h2 relative bottom-[67px] right-0.5">
                  c<span className=" text-[35px] font-black relative left-1.5">°</span>
                </span>
              </h1>
            </div>
            <div className="text-white text-body-3 pt-3">{useStore((state) => state.weatherType)}</div>
          </div>
          <div className="self-end">{image}</div>
        </section>
      </section>
    </div>
  );
});

export default Layout;
