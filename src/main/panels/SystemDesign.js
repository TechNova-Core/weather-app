import { memo } from "react";
import { ReactComponent as Snowy } from "../../shared/icons/hourly-snow.svg";
const SystemDesignPanel = memo(() => {
  //--------------------------------------------------------

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      <section className="bg-natural-100 rounded-1 p-4 mb-3 min-w-[420px]">
        <h1 className="font-segoe font-bold text-h1 mb-1">Typography</h1>
        <div>
          <h2 className="font-segoe text-h2 my-1">
            You can use segoe font like this!
          </h2>
          <div className="font-segoe text-h2 my-1">
            You can also use segoe font like this!
          </div>
        </div>
      </section>
      <section className="bg-natural-100 rounded-1 p-4 mb-3 min-w-[420px]">
        <h1 className="font-segoe font-bold text-h1 mb-1">Icons</h1>
        <div className="flex justify-between">
          <h3 className="font-segoe text-h3 my-1 flex items-center">
            You can add your Icons like this!
          </h3>
          <Snowy className="text-[64px] justify-end"></Snowy>
        </div>
      </section>
      <section className="bg-natural-100 rounded-1 p-4 mb-3 min-w-[420px]">
        <h1 className="font-segoe font-bold text-h1 mb-1">Colors</h1>
        <h3 className="font-segoe text-h3 my-1 flex items-center">
            You can use our custom colors like this!
          </h3>
        <div className="flex justify-between pt-5">
          <div className=" bg-natural-200 w-7 h-7 rounded-sm"></div>
          <div className=" bg-light-blue-200 w-7 h-7 rounded-sm"></div>
          <div className=" bg-dark-blue-200 w-7 h-7 rounded-sm"></div>
          <div className=" bg-blue-gray-200 w-7 h-7 rounded-sm"></div>
          <div className=" bg-gray-200 w-7 h-7 rounded-sm"></div>
        </div>
      </section>
    </div>
  );
});

export default SystemDesignPanel;
