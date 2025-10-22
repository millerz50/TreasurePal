"use client";

import PropertyCard from "@/components/property/PropertyCard";

const properties = [
  {
    title: "Modern Family Home",
    description:
      "A cozy 3-bedroom house with garden and garage, perfect for families.",
    image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
    price: "$85,000",
    type: "House",
    location: "Bindura",
    rooms: 3,
  },
  {
    title: "Urban Studio",
    description: "Compact studio apartment ideal for professionals.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    price: "$45,000",
    type: "Studio",
    location: "Harare",
    rooms: 1,
  },
  {
    title: "City Loft",
    description: "Stylish loft with rooftop access.",
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg",
    price: "$60,000",
    type: "Loft",
    location: "Harare",
    rooms: 2,
  },
  {
    title: "Stylish Townhouse",
    description: "Elegant townhouse with courtyard.",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    price: "$120,000",
    type: "Townhouse",
    location: "Bulawayo",
    rooms: 4,
  },
  {
    title: "Suburban Retreat",
    description: "Quiet retreat near schools.",
    image: "https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg",
    price: "$110,000",
    type: "House",
    location: "Bulawayo",
    rooms: 3,
  },
  {
    title: "Downtown Flat",
    description: "Central location with balcony.",
    image: "https://images.pexels.com/photos/1643389/pexels-photo-1643389.jpeg",
    price: "$70,000",
    type: "Apartment",
    location: "Bulawayo",
    rooms: 2,
  },
  {
    title: "Lakeview Cottage",
    description: "Panoramic lake views.",
    image: "https://images.pexels.com/photos/221024/pexels-photo-221024.jpeg",
    price: "$65,000",
    type: "Cottage",
    location: "Bindura",
    rooms: 2,
  },
  {
    title: "Garden Duplex",
    description: "Private garden and patio.",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    price: "$95,000",
    type: "Duplex",
    location: "Bindura",
    rooms: 3,
  },
  {
    title: "Mountain View Villa",
    description: "Luxury villa with scenic views.",
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
    price: "$130,000",
    type: "Villa",
    location: "Mutare",
    rooms: 4,
  },
  {
    title: "Eco Bungalow",
    description: "Sustainable living in nature.",
    image: "https://images.pexels.com/photos/221027/pexels-photo-221027.jpeg",
    price: "$80,000",
    type: "Bungalow",
    location: "Mutare",
    rooms: 2,
  },
  {
    title: "Forest Cabin",
    description: "Rustic charm in the woods.",
    image: "https://images.pexels.com/photos/221024/pexels-photo-221024.jpeg",
    price: "$55,000",
    type: "Cabin",
    location: "Mutare",
    rooms: 2,
  },
  {
    title: "City Center Condo",
    description: "Modern condo in the heart of Gweru.",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    price: "$90,000",
    type: "Condo",
    location: "Gweru",
    rooms: 2,
  },
  {
    title: "Family Estate",
    description: "Spacious estate for large families.",
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
    price: "$150,000",
    type: "Estate",
    location: "Gweru",
    rooms: 5,
  },
  {
    title: "Studio Pod",
    description: "Compact and efficient living.",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
    price: "$40,000",
    type: "Studio",
    location: "Gweru",
    rooms: 1,
  },
  {
    title: "Lakefront Lodge",
    description: "Serene lodge with private access to Lake Chivero.",
    image: "https://images.pexels.com/photos/221027/pexels-photo-221027.jpeg",
    price: "$375,000",
    type: "Lodge",
    location: "Mashonaland West",
    rooms: 5,
  },
  {
    title: "Downtown Hotel",
    description: "Established hotel with reception and entertainment area.",
    image: "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg",
    price: "$450,000",
    type: "Hotel",
    location: "Beatrice",
    rooms: 10,
  },
  {
    title: "Industrial Warehouse",
    description: "Spacious warehouse with loading dock and power supply.",
    image: "https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg",
    price: "$300,000",
    type: "Warehouse",
    location: "Harare",
    rooms: 0,
  },
  {
    title: "Manufacturing Factory",
    description: "Fully equipped factory for production and logistics.",
    image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg",
    price: "$500,000",
    type: "Factory",
    location: "Bulawayo",
    rooms: 0,
  },
  {
    title: "Serviced Stand",
    description: "Ready-to-build stand with title deed and water access.",
    image: "https://images.pexels.com/photos/261146/pexels-photo-261146.jpeg",
    price: "$35,000",
    type: "Stand",
    location: "Gweru",
    rooms: 0,
  },
];

export default function PropertyList() {
  return (
    <section className="bg-base-100 px-6 py-12 animate-in fade-in duration-700">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary">
            Featured Properties
          </h2>
          <p className="text-sm text-muted-foreground">
            Handpicked listings across Zimbabwe’s top cities—from student pods
            to industrial investments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
}
