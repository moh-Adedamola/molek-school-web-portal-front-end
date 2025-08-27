import { useContext } from 'react';
import { WebsiteContentContext } from '../context/WebsiteContentContext';

const useWebsiteContent = () => {
  const context = useContext(WebsiteContentContext);

  if (!context) {
    throw new Error('useWebsiteContent must be used within WebsiteContentProvider');
  }

  const { content, loading, updateContent, getContent } = context;

  return {
    content,
    loading,
    updateContent,
    getContent,

    // helpers
    getSchoolInfo: () => getContent('school'),
    getHeroContent: () => getContent('hero'),
    getAboutContent: () => getContent('about'),
    getStats: () => getContent('stats'),
    getFeatures: () => getContent('features'),

    updateSchoolInfo: (newInfo) => updateContent('school', newInfo),
    updateAbout: (newAbout) => updateContent('about', newAbout),
    updateStats: (newStats) => updateContent('stats', newStats),
  };
};

export default useWebsiteContent;
