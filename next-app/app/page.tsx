import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

import CompanyHealth from "@/components/company-health";
import LiveFeed from "@/components/live-feed";

export default function Home() {
  return (
    <main className="flex h-screen bg-zinc-950">
      <Sidebar />

      <section className="flex flex-1 flex-col">
        <Navbar />

        <div className="grid grid-cols-12 gap-6 p-6">

          <div className="col-span-8">
            <CompanyHealth />
          </div>

          <div className="col-span-4">
            <LiveFeed />
          </div>

        </div>
      </section>
    </main>
  );
}
