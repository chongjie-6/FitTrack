import LandingGrid from "@/components/ui/landing_page_grid";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <header className="top-0 left-0 right-0 bg-gray-300 shadow-md z-50 border-b-2 ">
        <nav className="flex items-center justify-around h-16 sm:h-20">
          <p className="text-xl sm:text-3xl font-bold">
            <span className="text-blue-600">Fit</span>
            <span className="text-red-600">Track</span>
          </p>
          <Link
            href={"/login"}
            className="btn p-3 border-2 bg-blue-200 rounded-full"
          >
            Login
          </Link>
        </nav>
      </header>

      <div className="flex flex-col items-center justify-center mx-auto space-y-20 text-center">
        {/* Example of application and main headings */}
        <section className="text-white flex flex-col md:flex-row mt-20 max-w-7xl justify-start items-start px-4">
          <div className="space-y-5 text-center md:text-left md:w-1/2 mb-12 pr-5">
            <h1 className="font-extrabold text-4xl md:text-5xl">
              Track Your Fitness Journey Like Never Before
            </h1>
            <p className="text-md max-w-lg mx-auto md:mx-0">
              FitTrack helps you monitor your workouts, nutrition, and progress
              all in one place. Set goals, track achievements, and transform
              your fitness journey.
            </p>
            <Link
              href="/register"
              className="btn px-6 py-3 border-2 bg-blue-200 text-black font-semibold rounded-full hover:bg-blue-300 transition-colors"
            >
              Sign Up For Free
            </Link>
          </div>

          <div className="relative w-full md:w-1/2 h-96 sm:h-112 md:h-96 lg:h-112">
            <div className="hidden md:block relative h-full">
              <Image
                src={"/desktop.png"}
                alt="Desktop App Preview"
                className="object-contain object-top"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>

            <div className="md:hidden relative h-full">
              <Image
                src={"/mobile.png"}
                alt="Mobile App Preview"
                className="object-contain object-top"
                fill
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-700 w-full space-y-15 items-center flex flex-col py-20">
          <h2 className="font-extrabold text-4xl md:text-5xl">Features</h2>
          <div className="max-w-7xl px-5">
            <LandingGrid></LandingGrid>
          </div>
        </section>
      </div>
    </>
  );
}
