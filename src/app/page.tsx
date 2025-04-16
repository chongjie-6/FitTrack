import Image from "next/image";

export default function LandingPage() {
  return (
    <>
      <header className="top-0 left-0 right-0 bg-gray-300 shadow-md z-50 border-b-2 ">
        <nav className="flex items-center justify-around h-16 sm:h-20">
          <p className="text-xl sm:text-3xl font-bold">
            <span className="text-blue-600">Fit</span>
            <span className="text-red-600">Track</span>
          </p>
          <button className="btn p-2 border-2 bg-blue-200 rounded-full">
            Login
          </button>
        </nav>
      </header>

      <section className="text-white flex flex-col sm:flex-row mt-20 mx-auto w-full max-w-7xl px-4 justify-center align-top">
        <div className="w-full space-y-5 mt-5 text-center sm:text-left">
          <h1 className="font-extrabold text-4xl sm:text-5xl leading-tight">
            Track Your Fitness Journey Like Never Before
          </h1>
          <p className="text-lg">
            FitTrack helps you monitor your workouts, nutrition, and progress
            all in one place. Set goals, track achievements, and transform your
            fitness journey.
          </p>
          <button className="btn px-6 py-3 border-2 bg-blue-200 text-black font-semibold rounded-full">
            Sign Up For Free
          </button>
        </div>

        <div className="relative w-full">
          {/*Desktop Image */}
          <div className="hidden sm:block">
            <Image
              src="/prototype.png"
              quality={100}
              fill={true}
              alt="Desktop App Preview"
              objectFit="contain"
            />
          </div>

          {/*Mobile Image */}
          <div className="block sm:hidden">
            <Image
              src="/mobile.png"
              quality={100}
              fill={true}
              alt="Mobile App Preview"
              objectFit="contain"
            />
          </div>
        </div>
      </section>
    </>
  );
}
