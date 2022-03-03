//Next JS imports
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

//React import
import { useEffect } from "react";

//Near imports
import { signIn, wallet, viewFunction, signOut } from "../../near/near-setup";

//Assets import
import Hero from "../../public/assets/images/hero.svg";

//Gsap import
import gsap from "gsap";

//Recoil import
import { useRecoilState } from "recoil";
import { userProfile } from "../recoil/state";

export default function Home() {
  //Next JS router
  const router = useRouter();

  //User profile state
  const [userProfileState, setUserProfileState] = useRecoilState(userProfile);

  useEffect(() => {
    const user = wallet.getAccountId();
    const authenticating = localStorage.getItem("authenticating");

    try {
      //Checking if user logged in before refresh
      if (user != "" && authenticating) {
        viewFunction("getProfile", { accountId: user }).then((result) => {
          setUserProfileState(result);
        });

        localStorage.removeItem("authenticating");
        //If user has profile redirect to dashboard page
        if (userProfileState) {
          router.push("/dasboard");
        }
        //Else redirect to onboarding page
        router.push("/onboarding");
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  //Logo and hero section animation
  useEffect(() => {
    gsap.fromTo(
      "#hero_section",
      { x: -100, opacity: 0 },
      { duration: 1, x: 0, opacity: 1 }
    );
    gsap.fromTo(
      ".letter",
      { y: "100%" },
      { y: 0, duration: 0.2, delay: 1, stagger: 0.1 }
    );
  }, []);

  return (
    <div className="w-screen h-screen bg-white">
      <Head>
        <title>DecentraJobs</title>
        <meta name="description" content="Decentralized freelance platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="w-screen h-[5rem] py-4 xl:px-[30rem] flex items-center justify-between">
        <h2 className="font-medium text-decentra-green text-[1.5rem] overflow-hidden">
          <span className="letter inline-block">D</span>
          <span className="letter inline-block">e</span>
          <span className="letter inline-block">c</span>
          <span className="letter inline-block">e</span>
          <span className="letter inline-block">n</span>
          <span className="letter inline-block">t</span>
          <span className="letter inline-block">r</span>
          <span className="letter inline-block">a</span>
          <span className="letter inline-block">J</span>
          <span className="letter inline-block">o</span>
          <span className="letter inline-block">b</span>
          <span className="letter inline-block">s</span>
        </h2>

        <div
          className="p-2 bg-decentra-green text-white rounded-lg cursor-pointer"
          onClick={() => {
            const user = wallet.getAccountId();
            if (user == "") {
              //Saving authentication state to localStorage
              localStorage.setItem("authenticating", true);
              return signIn();
            }
          }}
        >
          <span>Get Started</span>
        </div>
      </nav>

      <main
        className="w-screen xl:px-[30rem] h-[91%] bg-[#F6F6F6] py-5 flex justify-between items-center"
        id="hero_section"
      >
        <section>
          <span className="text-[3rem] font-bold text-decentra-green">
            Hire top talents,
            <br />
            Get hired. Work freely
          </span>
          <span className="block text-[1.5rem] mb-[2rem]">
            DecentraJobs offers a decentralized freelance experience
          </span>

          <div className="flex items-center gap-x-4">
            <button className="w-[6rem] h-[3rem] bg-decentra-green text-white rounded-lg outline-none">
              Start Hiring
            </button>
            <button className="w-[6rem] h-[3rem]  border-[2px] border-black text-decentra-black rounded-lg outline-none">
              Find Work
            </button>
          </div>
        </section>

        <Image
          src={Hero}
          alt="hero"
          className="w-[50%] h-[10rem]"
          width="500"
        />
      </main>
    </div>
  );
}
