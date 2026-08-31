const ContactPage = () => {
  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.18),transparent_35%)]" />

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 sm:py-32 lg:py-36">
          <div className="max-w-4xl">

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
              Contact Virexon
            </p>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-tight">
              Let's get in
              <span className="block text-orange-400">
                touch.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base sm:text-lg lg:text-xl leading-relaxed text-slate-300">
              Have a question, suggestion, or need help with an order?
              We'd love to hear from you.
            </p>

          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section className="px-5 sm:px-8 lg:px-12 py-20 sm:py-24 lg:py-32">

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Contact Information */}
          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-500">
              Get in touch
            </p>

            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              We're here to help.
            </h2>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600">
              Whether you have a question about a product, need assistance
              with an order, or simply want to learn more about Virexon,
              feel free to reach out.
            </p>


            {/* Email */}
            <div className="mt-10 flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                @
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Email
                </p>

                <p className="mt-1 text-slate-600">
                  info@virexon.com
                </p>
              </div>
            </div>


            {/* Phone */}
            <div className="mt-7 flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                ☎
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Phone
                </p>

                <p className="mt-1 text-slate-600">
                  +91 XXXXX XXXXX
                </p>
              </div>
            </div>


            {/* Location */}
            <div className="mt-7 flex items-start gap-4">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500">
                ●
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Location
                </p>

                <p className="mt-1 text-slate-600">
                  India
                </p>
              </div>
            </div>

          </div>


          {/* Contact Form */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:p-10">

            <h2 className="text-2xl sm:text-3xl font-bold">
              Send us a message
            </h2>

            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Fill out the form and we'll get back to you.
            </p>


            <form className="mt-8 space-y-5">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>


              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>


              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-slate-700"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  type="text"
                  placeholder="How can we help?"
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>


              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows={5}
                  placeholder="Write your message..."
                  className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />
              </div>


              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-500"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>
      </section>


      {/* Bottom CTA */}
      <section className="bg-slate-950 text-white px-5 sm:px-8 lg:px-12 py-16 sm:py-20">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-2xl sm:text-3xl font-bold">
            Have something in mind?
          </p>

          <p className="mt-3 text-slate-400">
            Explore our products and discover something useful for your
            everyday life.
          </p>

          <a
            href="/products"
            className="mt-7 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition hover:bg-orange-400 hover:text-white"
          >
            Explore Products
          </a>

        </div>

      </section>

    </main>
  );
};

export default ContactPage;