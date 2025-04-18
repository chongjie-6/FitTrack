import Footer from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import LandingPageDemo from "@/components/ui/landing_page_demo";
import LandingGrid from "@/components/ui/landing_page_grid";
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

        <Footer></Footer>
      </div>
    </>
  );
}
