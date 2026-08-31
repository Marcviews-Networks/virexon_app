const AboutPage = () => {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-40">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
              About Virexon
            </p>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              Innovation designed
              <span className="block text-orange-400">
                for everyday life.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300">
              Virexon brings together practical products, modern technology,
              and thoughtful design to make everyday experiences simpler,
              smarter, and better.
            </p>
          </div>
        </div>
      </section>


      {/* Our Story */}
      <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
              Our Story
            </p>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Built around the way people live.
            </h2>
          </div>

          <div>
            <p className="text-base sm:text-lg leading-relaxed text-slate-600">
              At Virexon, we believe technology should feel natural and
              useful. Our goal is to bring together products that solve
              everyday problems while offering a balance of functionality,
              reliability, and thoughtful design.
            </p>

            <p className="mt-6 text-base sm:text-lg leading-relaxed text-slate-600">
              From camera accessories to smart everyday essentials, we focus
              on products that fit naturally into modern lifestyles and help
              people get more from every moment.
            </p>
          </div>

        </div>
      </section>


      {/* Why Virexon */}
      <section className="bg-slate-50 px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
              Why Virexon
            </p>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Simple ideas. Better experiences.
            </h2>

            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
              Every product is selected with a focus on usefulness,
              simplicity, and everyday value.
            </p>
          </div>


          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

            {/* Card 1 */}
            <div className="rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                ✦
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Thoughtful Design
              </h3>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                Products designed with simplicity, usability, and modern
                lifestyles in mind.
              </p>
            </div>


            {/* Card 2 */}
            <div className="rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                ◇
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Practical Innovation
              </h3>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                Useful technology that solves real problems instead of
                adding unnecessary complexity.
              </p>
            </div>


            {/* Card 3 */}
            <div className="rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                ✓
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Reliable Products
              </h3>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                We focus on products that deliver dependable performance
                in everyday situations.
              </p>
            </div>


            {/* Card 4 */}
            <div className="rounded-2xl bg-white border border-slate-200 p-7 shadow-sm hover:shadow-xl transition duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 text-xl">
                ∞
              </div>

              <h3 className="mt-6 text-xl font-semibold">
                Everyday Value
              </h3>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                We aim to make useful products accessible and valuable for
                everyday life.
              </p>
            </div>

          </div>
        </div>
      </section>


      {/* Vision */}
      <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">
        <div className="max-w-5xl mx-auto text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
            Our Vision
          </p>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight">
            Make everyday technology
            <span className="block text-orange-500">
              feel effortless.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed text-slate-600">
            We are building Virexon around a simple idea: the best products
            are the ones that naturally become part of your everyday life.
          </p>

        </div>
      </section>


      {/* Bottom CTA */}
      <section className="bg-slate-950 text-white px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">

          <div>
            <p className="text-2xl sm:text-3xl font-bold">
              Discover Virexon.
            </p>

            <p className="mt-2 text-slate-400">
              Explore products designed for everyday life.
            </p>
          </div>

          <a
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-orange-400 hover:text-white"
          >
            Explore Products
          </a>

        </div>
      </section>

    </main>
  );
};

export default AboutPage;