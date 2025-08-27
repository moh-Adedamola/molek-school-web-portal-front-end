// pages/website/news-events/Newsletter.jsx
import { Download, Mail, Calendar, Eye } from 'lucide-react';

const Newsletter = () => {
  // Mock newsletter data
  const newsletters = [
    {
      id: 1,
      title: "December 2024 Newsletter",
      description: "Year-end review, student achievements, upcoming events, and holiday wishes from our school community.",
      date: "December 2024",
      publishDate: "2024-12-01",
      downloadUrl: "/newsletters/dec-2024.pdf",
      coverImage: "/api/placeholder/300/400",
      downloads: 234,
      featured: true
    },
    {
      id: 2,
      title: "November 2024 Newsletter",
      description: "Inter-house sports results, academic excellence awards, parent-teacher conference recap, and upcoming examinations.",
      date: "November 2024",
      publishDate: "2024-11-01",
      downloadUrl: "/newsletters/nov-2024.pdf",
      coverImage: "/api/placeholder/300/400",
      downloads: 189
    },
    {
      id: 3,
      title: "October 2024 Newsletter",
      description: "New teacher introductions, first term examination schedule, student spotlight, and facility updates.",
      date: "October 2024",
      publishDate: "2024-10-01",
      downloadUrl: "/newsletters/oct-2024.pdf",
      coverImage: "/api/placeholder/300/400",
      downloads: 167
    },
    {
      id: 4,
      title: "September 2024 Newsletter",
      description: "Welcome back message, new academic year updates, enrollment statistics, and upcoming school events.",
      date: "September 2024",
      publishDate: "2024-09-01",
      downloadUrl: "/newsletters/sep-2024.pdf",
      coverImage: "/api/placeholder/300/400",
      downloads: 203
    }
  ];

  const NewsletterCard = ({ newsletter }) => (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg ${
      newsletter.featured ? 'ring-2 ring-primary-500' : ''
    }`}>
      {newsletter.featured && (
        <div className="bg-primary-600 text-white text-center py-2 text-sm font-medium">
          Latest Newsletter
        </div>
      )}
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Cover Image */}
          <div className="md:w-1/3">
            <img 
              src={newsletter.coverImage} 
              alt={`${newsletter.title} Cover`}
              className="w-full h-48 md:h-full object-cover rounded-lg shadow-sm"
            />
          </div>
          
          {/* Content */}
          <div className="md:w-2/3 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-neutral-800">
                {newsletter.title}
              </h3>
              {newsletter.featured && (
                <span className="bg-accent-100 text-accent-800 px-2 py-1 rounded-full text-xs font-medium">
                  New
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-neutral-600">
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span>{newsletter.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye size={14} />
                <span>{newsletter.downloads} downloads</span>
              </div>
            </div>
            
            <p className="text-neutral-600 text-sm leading-relaxed">
              {newsletter.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="btn-primary px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2">
                <Download size={16} />
                <span>Download PDF</span>
              </button>
              <button className="btn-secondary px-4 py-2 rounded-lg text-sm font-medium">
                View Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-primary-50">
      {/* Header */}
      <div className="bg-primary-800 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">School Newsletter Archive</h1>
            <p className="text-xl text-primary-200 max-w-3xl mx-auto">
              Stay connected with our school community through monthly newsletters featuring updates, achievements, and important information
            </p>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-gradient-to-r from-secondary-50 to-primary-50 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-lg font-semibold text-neutral-800 mb-1">
                  Subscribe to Our Newsletter
                </h3>
                <p className="text-neutral-600 text-sm">
                  Get the latest school updates delivered to your email monthly
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button className="btn-primary px-6 py-2 rounded-lg font-medium flex items-center space-x-2">
                  <Mail size={16} />
                  <span>Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Archive */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {newsletters.map(newsletter => (
            <NewsletterCard key={newsletter.id} newsletter={newsletter} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-primary px-8 py-3 rounded-lg">
            Load Older Newsletters
          </button>
        </div>
      </div>

      {/* Newsletter Info */}
      <div className="bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto">
                <Calendar className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold text-neutral-800">Monthly Updates</h3>
              <p className="text-sm text-neutral-600">
                New newsletters published every month with the latest school information
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mx-auto">
                <Download className="text-secondary-600" size={24} />
              </div>
              <h3 className="font-semibold text-neutral-800">PDF Downloads</h3>
              <p className="text-sm text-neutral-600">
                All newsletters available as downloadable PDF files for offline reading
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto">
                <Mail className="text-accent-600" size={24} />
              </div>
              <h3 className="font-semibold text-neutral-800">Email Delivery</h3>
              <p className="text-sm text-neutral-600">
                Subscribe to receive newsletters directly in your email inbox
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;