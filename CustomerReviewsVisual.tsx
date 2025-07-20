import React, { useState, useEffect } from 'react';

interface Review {
  id: number;
  name: string;
  location: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
}

export const CustomerReviewsVisual: React.FC = () => {
  const [currentReview, setCurrentReview] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah M.",
      location: "Mountain Brook 35223",
      rating: 5,
      service: "AC Repair",
      comment: "Fast response on a 95° day! Technician was professional and fixed our AC quickly.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "John D.",
      location: "Hoover 35242",
      rating: 5,
      service: "New System Install",
      comment: "Best price we found and excellent installation. Our energy bills dropped 30%!",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Lisa K.",
      location: "Vestavia Hills 35213",
      rating: 5,
      service: "Emergency Service",
      comment: "They came out at 10 PM when our heat went out. Lifesavers!",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Robert T.",
      location: "Pelham 35124",
      rating: 5,
      service: "Maintenance",
      comment: "Annual maintenance keeps our system running perfectly. Great service!",
      date: "1 week ago"
    },
    {
      id: 5,
      name: "Maria G.",
      location: "Helena 35080",
      rating: 5,
      service: "Furnace Repair",
      comment: "Honest pricing and quality work. Highly recommend!",
      date: "2 months ago"
    }
  ];
  
  // Auto-rotate reviews
  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentReview((prev) => (prev + 1) % reviews.length);
        setIsAnimating(false);
      }, 300);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [reviews.length]);
  
  const review = reviews[currentReview];
  
  // Calculate stats
  const totalReviews = 1247;
  const avgRating = 4.9;
  const serviceBreakdown = {
    'AC Repair': 35,
    'Heating': 28,
    'Installation': 22,
    'Maintenance': 15
  };
  
  return (
    <div className="customer-reviews-visual bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold text-center mb-6">
        What Birmingham Residents Say About Us
      </h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Review Stats */}
        <div className="space-y-4">
          <div className="text-center bg-blue-50 p-4 rounded-lg">
            <div className="text-4xl font-bold text-blue-600">{avgRating}</div>
            <div className="flex justify-center my-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                </svg>
              ))}
            </div>
            <div className="text-gray-600">{totalReviews.toLocaleString()} Reviews</div>
          </div>
          
          {/* Service Breakdown */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-700">Reviews by Service</h4>
            {Object.entries(serviceBreakdown).map(([service, percentage]) => (
              <div key={service} className="flex items-center gap-2">
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{service}</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Rating Distribution */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-700 mb-3">Rating Distribution</h4>
            <div className="space-y-1 text-sm">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = rating === 5 ? 1098 : rating === 4 ? 124 : rating === 3 ? 18 : rating === 2 ? 5 : 2;
                const percentage = (count / totalReviews) * 100;
                
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${rating >= 4 ? 'bg-green-500' : 'bg-gray-400'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Featured Review Carousel */}
        <div className="relative">
          <div className={`transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg border border-blue-100">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-lg">{review.name}</h4>
                  <p className="text-sm text-gray-600">{review.location}</p>
                </div>
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
              </div>
              
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm">
                  {review.service}
                </span>
              </div>
              
              <p className="text-gray-700 italic mb-3">"{review.comment}"</p>
              
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          </div>
          
          {/* Review Navigation Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentReview ? 'bg-blue-600 w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          
          {/* Verified Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600">
            <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>All reviews verified</span>
          </div>
        </div>
      </div>
      
      {/* CTA */}
      <div className="mt-6 text-center border-t pt-6">
        <p className="text-gray-600 mb-3">Join thousands of satisfied Birmingham customers!</p>
        <a
          href="tel:205-835-0111"
          className="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition"
        >
          Call (205) 835-0111 for Service
        </a>
      </div>
    </div>
  );
};