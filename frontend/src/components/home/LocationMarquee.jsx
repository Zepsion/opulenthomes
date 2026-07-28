const MARKETS = ["Mira Road", "Bhayandar", "Mumbai", "Mira Road", "Bhayandar", "Mumbai","Thane",];

const LocationMarquee = () => {
  return (
    <div className="overflow-hidden border-y border-gold-500/20 bg-charcoal-900 py-4">
      <div className="flex w-max animate-marquee gap-12">
        {[...MARKETS, ...MARKETS].map((market, index) => (
          <span
            key={`${market}-${index}`}
            className="flex items-center gap-12 text-sm uppercase tracking-widest2 text-ivory/50"
          >
            {market}
            <span className="h-1 w-1 rounded-full bg-gold-500" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default LocationMarquee;
