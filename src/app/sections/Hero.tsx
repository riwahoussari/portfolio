import Image from "next/image";
import ArrowSvg from "../components/SVGs/ArrowSvg";
import MyImage from "../../../public/me.png";

export default function Hero() {
    return (
      <section className="relative md:min-h-dvh pt-32 pb-20 flex flex-col md:justify-between">
        <div className="grid-system">
          <h1 className="h1-regular xl:col-span-5 col-span-4 ">
            Web Designer & Developer
          </h1>
        </div>
  
        <div className=" xl:mt-40 md:mt-32 mt-14 w-full  max-md:relative">
          <div className="grid-system">
            <p className="body-3 spaced col-span-4 xl:col-start-5 text-justify">
              Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
              mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
              fringilla, mattis ligula consectetur, ultrices mauris.
            </p>
          </div>
  
          <div className="side-padding xl:mt-0 mt-14 xl:-translate-y-full ">
            <ArrowSvg aria-hidden width={32} strokeWidth={2} />
          </div>
  
          <div className="overflow-hidden md:mt-16 mt-32">
            <h1 className="display-1 spaced w-max mix-blend-difference text-white -translate-x-1/4">
              RIWA HOUSSARI — RIWA HOUSSARI —{" "}
            </h1>
          </div>
  
          
  
          <div className="grid-system max-md:justify-items-end absolute -z-1 md:bottom-10 bottom-0 max-md:translate-y-3/4 w-full overflow-hidden ">
            <Image
              alt="Image of Riwa Houssari Playing Basketball."
              src={MyImage}
              className="col-span-4 xl:col-start-9 md:col-start-5 object-cover object-top max-md:max-w-[380px] max-md:aspect-5/6 max-md:translate-x-1/4"
            />
          </div>
        </div>
      </section>
    );
  }