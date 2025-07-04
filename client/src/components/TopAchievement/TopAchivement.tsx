import { useEffect, useState } from "react";

interface IFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const TopFeatures = () => {
  const [features, setFeatures] = useState<IFeature[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/topFeatures.json")
      .then((res) => res.json())
      .then((data) => {
        setFeatures(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching features:", error);
        setLoading(false);
      });
  }, []);

  const visibleFeatures = showAll ? features : features.slice(0, 3);

  return (
    <section className="py-16">
      <div className=" mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Books Management Highlights
          </h2>
          <p className="text-gray-500 mt-2">
            Powerful features that simplify your library system
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <p className="text-center text-gray-500">Loading features...</p>
        ) : (
          <>
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="bg-white p-6 rounded-2xl border border-green-500 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105 text-center"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Show More/Less Button */}
            {features.length > 3 && (
              <div className="text-center mt-10">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-5 py-2   bg-[#6af34b] hover:bg-[#3eb3f1] text-white transition rounded-xl text-lg font-medium"
                >
                  {showAll ? "See Less" : "See More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default TopFeatures;
