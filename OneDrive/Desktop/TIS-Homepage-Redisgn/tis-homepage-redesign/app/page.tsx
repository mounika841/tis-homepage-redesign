"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const height =
        document.documentElement.scrollHeight - window.innerHeight;

      setScrollProgress(height > 0 ? (scrollTop / height) * 100 : 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((current) =>
              current.includes(entry.target.id)
                ? current
                : [...current, entry.target.id]
            );
          }
        });
      },
      { threshold: 0.15 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const reveal = (id: string) =>
    visibleSections.includes(id)
      ? "translate-y-0 opacity-100"
      : "translate-y-10 opacity-0";

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div
        className="fixed left-0 top-0 z-50 h-1 bg-blue-700 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-xl font-bold text-blue-900">
              TULAS INTERNATIONAL SCHOOL
            </h1>
            <p className="text-xs tracking-widest text-slate-500">
              LEARN • LEAD • INSPIRE
            </p>
          </div>

          <div className="hidden gap-6 md:flex">
            <a href="#about" className="transition hover:text-blue-700">
              About
            </a>
            <a href="#academics" className="transition hover:text-blue-700">
              Academics
            </a>
            <a href="#admissions" className="transition hover:text-blue-700">
              Admissions
            </a>
            <a href="#contact" className="transition hover:text-blue-700">
              Contact
            </a>
          </div>

          <a
            href="#admissions"
            className="rounded-full bg-blue-700 px-5 py-2.5 font-semibold text-white transition hover:scale-105 hover:bg-blue-800"
          >
            Apply Now
          </a>
        </nav>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-800 px-6 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 font-semibold uppercase tracking-[0.25em] text-blue-200">
            Tulas International School
          </p>

          <h2 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
            Shaping Curious Minds for a Brighter Tomorrow.
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-blue-100">
            A modern learning environment where students discover their
            potential, build confidence and prepare to lead with purpose.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#admissions"
              className="rounded-full bg-white px-7 py-3 font-bold text-blue-900 transition hover:scale-105"
            >
              Explore Admissions
            </a>

            <a
              href="#about"
              className="rounded-full border border-white/40 px-7 py-3 font-bold transition hover:bg-white/10"
            >
              Discover TIS
            </a>
          </div>
        </div>
      </section>

      <section
        id="about"
        className={`mx-auto max-w-7xl px-6 py-24 transition-all duration-1000 ${reveal(
          "about"
        )}`}
      >
        <p className="font-semibold uppercase tracking-widest text-blue-700">
          About TIS
        </p>

        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
          Education beyond classrooms.
        </h2>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          Tulas International School focuses on holistic development by
          combining strong academics with creativity, collaboration,
          leadership and real-world learning experiences.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            [
              "01",
              "Academic Excellence",
              "Strong foundations for lifelong learning.",
            ],
            [
              "02",
              "Holistic Growth",
              "Developing confident and responsible individuals.",
            ],
            [
              "03",
              "Future Ready",
              "Skills and experiences for tomorrow's world.",
            ],
          ].map(([number, title, description]) => (
            <article
              key={number}
              className="rounded-3xl border border-slate-200 p-8 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
            >
              <span className="text-sm font-bold text-blue-700">
                {number}
              </span>

              <h3 className="mt-5 text-2xl font-bold">{title}</h3>

              <p className="mt-3 leading-7 text-slate-600">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="academics"
        className={`bg-slate-50 px-6 py-24 transition-all duration-1000 ${reveal(
          "academics"
        )}`}
      >
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-blue-700">
            Academics
          </p>

          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Learning designed for every stage.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {["Early Years", "Primary School", "Senior School"].map(
              (program) => (
                <div
                  key={program}
                  className="rounded-3xl bg-white p-8 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-xl"
                >
                  <h3 className="text-2xl font-bold">{program}</h3>

                  <p className="mt-4 leading-7 text-slate-600">
                    Engaging learning experiences that encourage curiosity,
                    confidence and independent thinking.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      <section
        id="admissions"
        className={`px-6 py-24 transition-all duration-1000 ${reveal(
          "admissions"
        )}`}
      >
        <div className="mx-auto max-w-5xl rounded-[2rem] bg-blue-900 px-8 py-16 text-center text-white md:px-16">
          <p className="font-semibold uppercase tracking-widest text-blue-200">
            Admissions Open
          </p>

          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
            Give your child a place to grow, explore and lead.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-blue-100">
            Start the journey toward a confident and future-ready education.
          </p>

          <a
            href="#contact"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 font-bold text-blue-900 transition hover:scale-105"
          >
            Enquire Now
          </a>
        </div>
      </section>

      <footer
        id="contact"
        className={`bg-slate-950 px-6 py-12 text-white transition-all duration-1000 ${reveal(
          "contact"
        )}`}
      >
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row">
          <div>
            <h2 className="text-xl font-bold">
              TULAS INTERNATIONAL SCHOOL
            </h2>

            <p className="mt-2 text-slate-400">
              Learn • Lead • Inspire
            </p>
          </div>

          <p className="text-slate-400">
            © 2026 Tulas International School. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}