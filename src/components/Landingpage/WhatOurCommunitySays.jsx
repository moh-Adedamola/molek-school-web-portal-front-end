import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const testimonials = [
  {
    quote:
      "My daughter has excelled beyond our expectations. The teachers are dedicated and the WAEC preparation is exceptional. She scored distinctions in 7 subjects!",
    name: 'Mrs. Adebayo Olumide',
    role: 'Parent - SSS 3 Student',
    location: 'Lagos',
    type: 'Parent',
  },
  {
    quote:
      "The foundation I received here prepared me perfectly for university. The teachers went above and beyond to ensure we understood every concept.",
    name: 'Chioma Okwu',
    role: 'Alumni - Class of 2023',
    location: 'University of Lagos',
    type: 'Student/Alumni',
  },
  {
    quote:
      "The holistic approach to education here is remarkable. My son is not only academically strong but also developing great character and leadership skills.",
    name: 'Mr. Emeka Nwosu',
    role: 'Parent - JSS 2 Student',
    location: 'Abuja',
    type: 'Parent',
  },
  {
    quote:
      "I love the science laboratories and the way our teachers make complex topics easy to understand. I am confident about my WAEC exams.",
    name: 'Fatima Ibrahim',
    role: 'Current Student - SSS 2',
    location: 'Science Class',
    type: 'Student/Alumni',
  },
  {
    quote:
      "Both my children attend this school and they are thriving. The individual attention and care each student receives is outstanding.",
    name: 'Mrs. Grace Okafor',
    role: 'Parent - Twin Students',
    location: 'Port Harcourt',
    type: 'Parent',
  },
  {
    quote:
      "The career guidance and university preparation I received was invaluable. I secured admission to study Medicine thanks to my strong foundation.",
    name: 'David Adamu',
    role: 'Alumni - Class of 2022',
    location: 'Ahmadu Bello University',
    type: 'Student/Alumni',
  },
];

const WhatOurCommunitySays = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-24 py-16 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-900">What Our Community Says</h2>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Hear from parents, students, and alumni about their experiences and success stories at our school.
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
        className="max-w-3xl mx-auto"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <p className="text-lg italic text-gray-800 mb-4">“{t.quote}”</p>
              <h3 className="text-blue-900 font-semibold">{t.name}</h3>
              <p className="text-sm text-green-700">{t.role}</p>
              <p className="text-sm text-gray-500">{t.location}</p>
              <span className="inline-block mt-2 px-3 py-1 text-xs bg-orange-100 text-orange-600 rounded-full">
                {t.type}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default WhatOurCommunitySays;
