"use client";
import { useScroll, useTransform, motion, useMotionValue } from "motion/react";
import QuotationsSvg from "../components/SVGs/QuotationsSvg";
import { useEffect, useRef, useTransition } from "react";

export default function Testimonials() {
  // scroll tracker
  const titleContainerRef = useRef(null);
  const { scrollYProgress: titleContainerScroll } = useScroll({
    target: titleContainerRef,
    offset: ["start start", "400vh start"],
  });

  // title
  const titleDivScale = useTransform(titleContainerScroll, [0, 0.25], [1, 0]);

  // testimonial 1
  const testOneDivScaleIn = useTransform(
    titleContainerScroll,
    [0, 0.25],
    [0, 1]
  );
  const testOneDivScaleOut = useTransform(
    titleContainerScroll,
    [0.25, 0.5],
    [1, 0]
  );
  const testOneDivScale = useMotionValue(0);
  useEffect(() => {
    const unsubscribe1 = testOneDivScaleIn.on("change", (v) =>
      testOneDivScale.set(v)
    );
    const unsubscribe2 = testOneDivScaleOut.on("change", (v) =>
      testOneDivScale.set(v)
    );

    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [testOneDivScaleIn, testOneDivScaleOut]);

  // testimonial 2
  const testTwoDivScale = useTransform(
    titleContainerScroll,
    [0.25, 0.5],
    [0, 1]
  );
  const testTwoDiOpacity = useTransform(
    titleContainerScroll,
    [0.5, 0.75],
    [1, 0]
  );

  return (
    <section className="bg-background max-h-[450vh] overflow-y-clip pt-[25vh] md:pt-[50vh]">
      {/* title */}
      <div className="h-[200vh]" ref={titleContainerRef}>
        <motion.div
          id="testimonials"
          className="scale sticky top-0 mx-auto flex h-dvh max-w-[90vw] origin-top flex-col items-center justify-center"
          style={{ scaleY: titleDivScale, opacity: titleDivScale }}
        >
          <h2 className="display-1 text-[max(56px,7vw)]! max-2xs:text-[48px]! mb-8 text-center">
            Don't Take My Word <span className="whitespace-pre">For It</span>
          </h2>
          <p className="text-[max(16px,1.5vw)]! max-2xs:text-[14px]! text-center opacity-70 md:max-w-[70vw]">
            Here's what my clients say about our collaboration. Their
            satisfaction and meeting expectations are my top priorities,
            ensuring the best experience possible.
          </p>
        </motion.div>
      </div>

      {/* testimonial 1 */}
      <div className="h-[200vh]">
        <motion.div
          style={{ scaleY: testOneDivScale, opacity: testOneDivScaleOut }}
          className="sticky top-[100vh] mx-auto flex h-dvh max-w-[80vw] origin-top -translate-y-full flex-col items-center justify-center sm:max-w-[90vw]"
        >
          <div className="w-10">
            <QuotationsSvg />
          </div>
          <p className="h2-medium mb-11 mt-20 max-w-[1000px] text-center">
            It's otherwordly, I love it! And the feedback I'm getting is🔥.
            Thank you so so much, you raised me to a whole new level.
          </p>

          <p className="text-[max(16px,1.5vw)]! max-2xs:text-[14px]! text-center font-light opacity-70 md:max-w-[70vw]">
            @mario_abboud
          </p>
        </motion.div>
      </div>

      {/* testimonial 2 */}
      <div className="h-[200vh]">
        <motion.div
          style={{ scaleY: testTwoDivScale, opacity: testTwoDiOpacity }}
          className="bg-background sticky top-[200vh] mx-auto flex h-dvh max-w-[80vw] origin-top -translate-y-[200vh] flex-col items-center justify-center sm:max-w-[90vw]"
        >
          <div className="w-10">
            <QuotationsSvg />
          </div>
          <p className="h2-medium mb-11 mt-20 max-w-[1000px] text-center">
            I love the new website. Thank you for your patience, your eye for detail, and for always offering multiple design options to choose from — it made the whole process easy and enjoyable
          </p>

          <p className="text-[max(16px,1.5vw)]! max-2xs:text-[14px]! text-center font-light opacity-70 md:max-w-[70vw]">
            @haifaa_bitar
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// export default function Testimonials() {
//   // animation 1 (title - testi 1)
//   const titleDivRef = useRef(null);
//   const { scrollYProgress: titleDivScroll } = useScroll({
//     target: titleDivRef,
//     offset: ["start start", "end start"],
//   });

//   const titleDivScaleY = useTransform(titleDivScroll, [0, 1], [1, 0]);
//   const titleDivTranslateY = useTransform(
//     titleDivScroll,
//     [0, 1],
//     ["0%", "100%"]
//   );

//   const testimonialDiv1ScaleY1 = useTransform(titleDivScroll, [0, 1], [0, 1]);

//   // aniamtion 2 (test 1 - testi 2)
//   const testimonialDivRef = useRef(null);
//   const { scrollYProgress: testimonialDivScroll } = useScroll({
//     target: testimonialDivRef,
//     offset: ["start start", "end start"],
//   });

//   const testimonialDiv1ScaleY2 = useTransform(
//     testimonialDivScroll,
//     [0, 1],
//     [1, 0]
//   );
//   const testimonialDiv1TranslateY = useTransform(
//     testimonialDivScroll,
//     [0, 1],
//     ["0%", "100%"]
//   );

//   const testimonialDiv2ScaleY = useTransform(
//     testimonialDivScroll,
//     [0, 1],
//     [0, 1]
//   );

//   // testimonial div 1 scale from both animations combined
//   const testimonialDiv1FinalScale = useMotionValue(0);

//   useEffect(() => {
//     const unsubscribe1 = testimonialDiv1ScaleY1.on("change", (v) =>
//       testimonialDiv1FinalScale.set(v)
//     );
//     const unsubscribe2 = testimonialDiv1ScaleY2.on("change", (v) =>
//       testimonialDiv1FinalScale.set(v)
//     );

//     return () => {
//       unsubscribe1();
//       unsubscribe2();
//     };
//   }, [testimonialDiv1ScaleY1, testimonialDiv1ScaleY2]);

//   // opacity fade out when footer comes in
//   const opacityRef = useRef(null);
//   const { scrollYProgress: opacityScroll } = useScroll({
//     target: opacityRef,
//     offset: ["start start", "end end"],
//   });
//   const fadeOutOpacity = useTransform(opacityScroll, [0, 0.5], [1, 0]);

//   return (
//     <section

//       className="bg-background  pt-[25vh] md:pt-[50vh]"
//     >
//       {/* title */}
//       <motion.div
//       id="testimonials"
//         style={{
//           scaleY: titleDivScaleY,
//           opacity: titleDivScaleY,
//           translateY: titleDivTranslateY,
//         }}
//         ref={titleDivRef}
//         className="scale mx-auto flex h-dvh max-w-[90vw] origin-top flex-col items-center justify-center"
//       >
//         <h2 className="display-1 text-[max(56px,7vw)]! max-2xs:text-[48px]! mb-8 text-center">
//           Don't Take My Word <span className="whitespace-pre">For It</span>
//         </h2>
//         <p className="text-[max(16px,1.5vw)]! max-2xs:text-[14px]! text-center opacity-70 md:max-w-[70vw]">
//           Here's what my clients say about our collaboration. Their satisfaction
//           and meeting expectations are my top priorities, ensuring the best
//           experience possible.
//         </p>
//       </motion.div>

//       {/* testimonial 1 */}
//       <motion.div
//         ref={testimonialDivRef}
//         style={{
//           scaleY: testimonialDiv1FinalScale,
//           opacity: testimonialDiv1ScaleY2,
//           translateY: testimonialDiv1TranslateY,
//         }}
//         className="mx-auto flex h-dvh max-w-[80vw] origin-top flex-col items-center justify-center sm:max-w-[90vw]"
//       >
//         <div className="w-10">
//           <QuotationsSvg />
//         </div>
//         <p className="h2-medium mb-11 mt-20 max-w-[1000px] text-center">
//           Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi.
//         </p>

//         <p className="text-[max(16px,1.5vw)]! max-2xs:text-[14px]! text-center font-light opacity-70 md:max-w-[70vw]">
//           @haifaa_bitar
//         </p>
//       </motion.div>

//       {/* testimonial 2 */}
//       <div ref={opacityRef} className="h-[200vh]">
//         <motion.div
//           style={{ scaleY: testimonialDiv2ScaleY, opacity: fadeOutOpacity }}
//           className="bg-background sticky top-0 mx-auto flex h-dvh max-w-[80vw] origin-top flex-col items-center justify-center sm:max-w-[90vw]"
//         >
//           <div className="w-10">
//             <QuotationsSvg />
//           </div>
//           <p className="h2-medium mb-11 mt-20 max-w-[1000px] text-center">
//             Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa
//             mi. Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
//             massa mi.
//           </p>

//           <p className="text-[max(16px,1.5vw)]! max-2xs:text-[14px]! text-center font-light opacity-70 md:max-w-[70vw]">
//             @arthyl
//           </p>
//         </motion.div>
//       </div>

//       {/* <div className="bg-accent h-dvh"></div> */}
//     </section>
//   );
// }
