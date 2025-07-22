import { useEffect, useState } from "react";
import ArrowSvg from "../SVGs/ArrowSvg";

import { PhoneInput } from "react-international-phone";
import { isValidPhoneNumber } from "libphonenumber-js";
import { useHover } from "@/app/hooks/HoverContext";

export default function FooterForm() {
  const { setIsHovering } = useHover();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    setErrors(isValidData());
  }, [fullName, phone, message]);

  function isValidData() {
    let arr = [];

    if (!fullName || fullName.length < 6) {
      arr.push("fullname");
    }
    if (!message || message.split(" ").length < 3) {
      arr.push("message");
    }
    if (!phone || !isValidPhoneNumber(phone)) {
      arr.push("phone");
    }

    return arr;
  }

  return (
    <form
      action="https://formsubmit.co/houssaririwa@gmail.com"
      method="POST"
      className="body-3 flex w-[min(90vw,500px)] flex-col gap-10 pt-12 xl:w-[min(50vw,600px)]"
    >
      <div className="flex items-center justify-between">
        <h2 className="h2-medium">Let's Talk</h2>
        <button
          type="submit"
          className="bg-background not-disabled:hover:bg-green-500 not-disabled:hover:scale-110 relative aspect-square w-16 cursor-pointer rounded-full text-white duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!!errors.length}
        >
          <div className="-translate-1/2 absolute left-1/2 top-1/2 -rotate-90">
            <ArrowSvg width={24} strokeWidth={3} />
          </div>
        </button>
      </div>
      <div className="flex flex-col gap-4">
        {/* full name */}
        <div>
          <input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            onMouseEnter={() => {
              setIsHovering({hover: "normal", videoNum: 0});
            }}
            onMouseLeave={() => {
              setIsHovering({hover: "none", videoNum: 0});
            }}
            required
            type="text"
            name="fullname"
            placeholder="Full Name"
            className="border-background footer-input relative block w-full cursor-pointer rounded-full border-2 px-8 py-3 outline-0 duration-200 ease-in-out hover:scale-105 focus:scale-105"
            style={{
              borderColor: errors.includes("fullname")
                ? "var(--color-background)"
                : "var(--color-green-500)",
            }}
          />
          <p
            className="instruction ps-8 pt-2 text-sm opacity-0 duration-200 ease-in-out"
            style={{
              visibility: errors.includes("fullname") ? "visible" : "hidden",
            }}
          >
            min 6 characters
          </p>
        </div>

        {/* phone number */}
        <div className="phone-main-div">
          <div
            style={{
              borderColor: errors.includes("phone")
                ? "var(--color-background)"
                : "var(--color-green-500)",
            }}
            className="cursor-pointer rounded-full border-2 duration-200 ease-in-out hover:scale-105 focus:scale-105"
            onMouseEnter={() => {
              setIsHovering({hover: "normal", videoNum: 0});
            }}
            onMouseLeave={() => {
              setIsHovering({hover: "none", videoNum: 0});
            }}
          >
            <PhoneInput
              className="footer-input"
              value={phone}
              onChange={setPhone}
              defaultCountry="lb"
              name="phone"
            />
          </div>
          <p
            className="instruction ps-8 pt-2 text-sm opacity-0 duration-200 ease-in-out"
            style={{
              visibility: errors.includes("phone") ? "visible" : "hidden",
            }}
          >
            invalid phone number
          </p>
        </div>

        {/* message */}
        <div>
          <textarea
            onMouseEnter={() => {
              setIsHovering({hover: "normal", videoNum: 0});
            }}
            onMouseLeave={() => {
              setIsHovering({hover: "none", videoNum: 0});
            }}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            required
            name="message"
            id="message"
            placeholder="Your Message"
            rows={4}
            className="border-background rounded-4xl footer-input w-full cursor-pointer resize-none border-2 px-8 py-6 outline-0 duration-200 ease-in-out hover:scale-105 focus:scale-105"
            style={{
              borderColor: errors.includes("message")
                ? "var(--color-background)"
                : "var(--color-green-500)",
            }}
          ></textarea>
          <p
            className="instruction ps-8 pt-2 text-sm opacity-0 duration-200 ease-in-out"
            style={{
              visibility: errors.includes("message") ? "visible" : "hidden",
            }}
          >
            min 3 words
          </p>
        </div>
      </div>
    </form>
  );
}
