import { useNavigate } from "react-router-dom";

const PremiumShowcase = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-black py-16 text-white sm:py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-12">
        
        {/* Content */}
        <div className="order-2 lg:order-1">
          <p className="mb-4 text-sm font-semibold tracking-[0.25em] text-orange-400">
            PREMIUM SHOWCASE
          </p>

          <h2 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
            Designed for Your
            <span className="block text-orange-400">
              Everyday Experience
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg">
            Discover premium products designed with style, convenience, and
            functionality in mind.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => navigate("/products")}
              className="rounded-xl bg-orange-500 px-7 py-3 font-semibold text-white transition hover:bg-orange-600"
            >
              Shop Now
            </button>

            <button
              onClick={() => navigate("/premiumshowcase")}
              className="rounded-xl border border-white/30 px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Explore More
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="order-1 flex items-center justify-center lg:order-2">
          <div className="w-full max-w-xl overflow-hidden rounded-3xl">
            <img
              src="/images/premium-showcase.png"
              alt="Premium product showcase"
              className="h-auto w-full object-cover transition duration-500 hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default PremiumShowcase;