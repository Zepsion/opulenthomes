"use client";

import { useState, useEffect, useRef } from "react";

const GoogleMapSection = () => {
  const [isMapVisible, setIsMapVisible] = useState(false);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isMapVisible) {
            setIsMapVisible(true);
          }
        });
      },
      {
        rootMargin: '100px',
        threshold: 0.1
      }
    );

    if (mapContainerRef.current) {
      observer.observe(mapContainerRef.current);
    }

    return () => {
      if (mapContainerRef.current) {
        observer.unobserve(mapContainerRef.current);
      }
    };
  }, [isMapVisible]);

  // Mira Road coordinates based on the reference image
  const mapLocation = "Mira+Road+East,+Mira+Bhayandar,+Maharashtra";
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30128.037052065964!2d72.85593692413974!3d19.282164795755207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0458cf7298b%3A0x468ed839e9df2b21!2sMira%20Road%20East%2C%20Mira%20Bhayandar%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1787227072002!5m2!1sen!2sin`;

  return (
    <section className="w-full bg-gray-50">
      <div className="w-full">
        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-12">
          <div className="text-center mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Find Us Here
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Visit us at our location in Mira Road East, easily accessible from major areas
            </p>
          </div>
        </div>

        {/* Map Container */}
        <div 
          ref={mapContainerRef}
          className="w-full relative"
          style={{ minHeight: '450px' }}
        >
          {isMapVisible ? (
            <iframe
              src={embedUrl}
              width="100%"
              height="600"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
              className="w-full h-96 sm:h-[500px] lg:h-[600px]"
            />
          ) : (
            <div className="w-full h-96 sm:h-[500px] lg:h-[600px] bg-gray-200 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-pulse">
                  <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  <p className="text-gray-500 text-sm">Loading map...</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GoogleMapSection;