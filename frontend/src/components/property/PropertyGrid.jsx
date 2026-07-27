import PropertyCard from "@components/property/PropertyCard.jsx";
import EmptyState from "@components/common/EmptyState.jsx";

/**
 * Pure presentational grid. Unlike the old Vite version, this never
 * fetches or manages loading state itself — the Server Component page
 * that renders this already has the data by the time this runs.
 */
const PropertyGrid = ({ properties, emptyMessage }) => {
  if (!properties || properties.length === 0) {
    return (
      <EmptyState
        title="No properties match yet"
        description={
          emptyMessage || "Try widening your budget or exploring a different property type."
        }
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property, index) => (
        <PropertyCard key={property._id} property={property} index={index} />
      ))}
    </div>
  );
};

export default PropertyGrid;
