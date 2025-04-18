import Footer from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import LandingPageDemo from "@/components/ui/landing_page_demo";
import LandingGrid from "@/components/ui/landing_page_grid";
import Link from "next/link";
export default function LandingPage() {
  return (
    <>
      <Header />

      <div className="demo_container">
        <LandingPageDemo />

        <section className="bg-zinc-800 w-full space-y-15 items-center flex flex-col py-20">
          <h2 className="font-extrabold text-4xl md:text-5xl">Features</h2>
          <div className="max-w-7xl px-5">
            <LandingGrid></LandingGrid>
          </div>
        </section>

        <div className="landing_banner">
          <div className="mx-auto">
            <h2 className="text-5xl font-bold text-white mb-4 ">
              Bookmark FitTrack Today
            </h2>
            <p className="text-xl text-gray-100 mb-10">
              Start your fitness journey with FitTrack. Available everywhere for
              free now and forever!
            </p>
            <Link
              href={"/register"}
              className="bg-white text-indigo-800 hover:bg-indigo-100 font-medium p-5 h-full rounded-lg transition-all duration-300 shadow-lg"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
