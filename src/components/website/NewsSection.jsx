import { useState } from 'react';

const NewsSection = ({ 
  title = "Latest News & Updates", 
  subtitle = "Stay informed about school events, achievements, and important announcements",
  news = null,
  showAll = false 
}) => {
  
  const [activeCategory, setActiveCategory] = useState('all');

  const defaultNews = [
    {
      id: 1,
      title: "Molek School Achieves 98% WAEC Pass Rate",
      excerpt: "Our SSS 3 students have excelled in the recent WAEC examinations with an outstanding 98% pass rate, placing us among the top-performing schools in Nigeria.",
      category: "Achievement",
      date: "2024-08-20",
      author: "Dr. Samuel Oladele",
      image: "/api/placeholder/400/250",
      readTime: "3 min read",
      tags: ["WAEC", "Achievement", "Students"],
      priority: "high"
    },
    {
      id: 2,
      title: "New Science Laboratory Complex Opens",
      excerpt: "State-of-the-art laboratory facilities are now open for JSS and SSS students, featuring modern equipment for Physics, Chemistry, and Biology practicals.",
      category: "Infrastructure",
      date: "2024-08-18",
      author: "Mrs. Grace Emenike",
      image: "/api/placeholder/400/250",
      readTime: "2 min read",
      tags: ["Infrastructure", "Science", "Laboratory"],
      priority: "medium"
    },
    {
      id: 3,
      title: "Inter-House Sports Competition 2024",
      excerpt: "The annual inter-house sports competition begins next month with exciting events including football, athletics, and traditional Nigerian games.",
      category: "Events",
      date: "2024-08-15",
      author: "Mr. Chinedu Okafor",
      image: "/api/placeholder/400/250",
      readTime: "4 min read",
      tags: ["Sports", "Competition", "Houses"],
      priority: "medium"
    },
    {
      id: 4,
      title: "JSS 1 Orientation Program Scheduled",
      excerpt: "New JSS 1 students and their parents are invited to attend the comprehensive orientation program covering school policies, curriculum, and expectations.",
      category: "Announcement",
      date: "2024-08-12",
      author: "Mrs. Adunni Okonkwo",
      image: "/api/placeholder/400/250",
      readTime: "2 min read",
      tags: ["Orientation", "JSS 1", "Parents"],
      priority: "high"
    },
    {
      id: 5,
      title: "Digital Library Expansion",
      excerpt: "Our digital library now features over 10,000 books and research materials, supporting both JSS and SSS curriculum requirements.",
      category: "Academic",
      date: "2024-08-10",
      author: "Mr. Ibrahim Hassan",
      image: "/api/placeholder/400/250",
      readTime: "3 min read",
      tags: ["Library", "Digital", "Resources"],
      priority: "low"
    },
    {
      id: 6,
      title: "Parent-Teacher Conference Reminder",
      excerpt: "Monthly parent-teacher conferences are scheduled for next week. Parents can book appointments through the parent portal.",
      category: "Announcement",
      date: "2024-08-08",
      author: "Dr. Samuel Oladele",
      image: "/api/placeholder/400/250",
      readTime: "1 min read",
      tags: ["Parents", "Teachers", "Conference"],
      priority: "medium"
    }
  ];

  const displayNews = news || defaultNews;
  const categories = ['all', ...new Set(displayNews.map(item => item.category))];
  
  const filteredNews = activeCategory === 'all' 
    ? displayNews 
    : displayNews.filter(item => item.category === activeCategory);

  const displayedNews = showAll ? filteredNews : filteredNews.slice(0, 6);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Achievement': 'bg-secondary-100 text-secondary-800',
      'Infrastructure': 'bg-primary-100 text-primary-800',
      'Events': 'bg-accent-100 text-accent-800',
      'Announcement': 'bg-purple-100 text-purple-800',
      'Academic': 'bg-emerald-100 text-emerald-800'
    };
    return colors[category] || 'bg-neutral-100 text-neutral-800';
  };

  const getPriorityIndicator = (priority) => {
    const indicators = {
      'high': 'border-l-4 border-red-500',
      'medium': 'border-l-4 border-accent-500',
      'low': 'border-l-4 border-secondary-500'
    };
    return indicators[priority] || '';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-50 to-primary-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary-100/20 rounded-full translate-x-36 -translate-y-36 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-100/20 rounded-full -translate-x-48 translate-y-48 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-primary-800 mb-6">
            {title}
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-primary-600 text-white shadow-lg scale-105'
                  : 'bg-white text-neutral-600 hover:bg-primary-50 hover:text-primary-600 shadow-md hover:shadow-lg'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Featured News */}
        {displayedNews.length > 0 && (
          <div className="mb-16">
            <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden ${getPriorityIndicator(displayedNews[0].priority)}`}>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={displayedNews[0].image} 
                    alt={displayedNews[0].title}
                    className="w-full h-64 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12">
                  {/* Featured badge */}
                  <div className="inline-flex items-center px-4 py-2 bg-accent-100 text-accent-800 rounded-full text-sm font-medium mb-4">
                    <span className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse"></span>
                    Featured News
                  </div>

                  {/* Category and date */}
                  <div className="flex items-center mb-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium mr-3 ${getCategoryColor(displayedNews[0].category)}`}>
                      {displayedNews[0].category}
                    </span>
                    <span className="text-neutral-500">{formatDate(displayedNews[0].date)}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-800 mb-4 leading-tight">
                    {displayedNews[0].title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-neutral-700 leading-relaxed mb-6">
                    {displayedNews[0].excerpt}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-neutral-600">
                      <span className="font-medium">{displayedNews[0].author}</span>
                      <span className="mx-2">•</span>
                      <span>{displayedNews[0].readTime}</span>
                    </div>
                    <button className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors duration-300 text-sm font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Grid */}
        {displayedNews.length > 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedNews.slice(1).map((article, index) => (
              <article 
                key={article.id}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group ${getPriorityIndicator(article.priority)}`}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {article.category}
                    </span>
                  </div>
                  {article.priority === 'high' && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Date */}
                  <div className="text-sm text-neutral-500 mb-3">
                    {formatDate(article.date)}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-primary-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-300">
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-neutral-600 leading-relaxed mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.tags?.slice(0, 2).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                    <div className="flex items-center text-sm text-neutral-600">
                      <span className="font-medium">{article.author}</span>
                      <span className="mx-2">•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <button className="text-primary-600 hover:text-primary-800 font-medium text-sm transition-colors duration-300">
                      Read →
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load More / View All */}
        {!showAll && filteredNews.length > 6 && (
          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              View All News ({filteredNews.length - 6} more)
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20">
          <div className="bg-gradient-to-r from-secondary-600 to-primary-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-secondary-100 mb-8 text-lg">
                Get the latest news and updates delivered to your inbox weekly
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-3 rounded-xl text-neutral-900 placeholder-neutral-500 focus:outline-none focus:ring-4 focus:ring-white/20"
                />
                <button className="px-8 py-3 bg-accent-600 hover:bg-accent-700 text-white font-semibold rounded-xl transition-colors duration-300 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              
              <p className="text-secondary-200 text-sm mt-4">
                Join 5,000+ parents and educators receiving our newsletter
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;