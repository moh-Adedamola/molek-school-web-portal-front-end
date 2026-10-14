import { API_BASE_URL } from './apiBase.js';

// Fallback news item
const fallbackNews = {
  id: 1,
  title: 'MOLEK Schools - Updates Coming Soon',
  description: 'Stay tuned for the latest news and announcements from MOLEK Schools.',
  media_url: '/excel.webp',
  content_type: 'news',
  publish_date: new Date().toISOString(),
};

// ============================================
// 📰 FETCH ALL CONTENT (News, Images, Videos)
// ============================================

// ============================================
// 📰 FETCH ONE PAGE OF CONTENT (News page "Load more")
// The API returns 25 items per page. We ask by page number rather than
// following the API's absolute "next" link, which can come back as http://
// behind the hosting proxy and be blocked on an https:// site.
// ============================================
export const fetchContentPage = async (page = 1) => {
  const response = await fetch(`${API_BASE_URL}/api/content/public/?page=${page}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.status === 404) return { items: [], hasMore: false }; // past the last page
  if (!response.ok) throw new Error(`Failed to fetch content: ${response.status}`);
  const data = await response.json();
  if (Array.isArray(data)) return { items: data, hasMore: false };
  return { items: data.results || [], hasMore: Boolean(data.next) };
};

// ============================================
// 📰 FETCH NEWS ONLY (for LatestNews component)
// ============================================
export const fetchAllNews = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/content/public/?content_type=news`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`HTTP ${response.status}: ${response.statusText}`);
      throw new Error(`Failed to fetch news: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle both paginated and non-paginated responses
    if (data.results && Array.isArray(data.results)) {
      return data.results.length > 0 ? data.results : [fallbackNews];
    }
    
    return Array.isArray(data) && data.length > 0 ? data : [fallbackNews];
  } catch (error) {
    console.error('Error fetching news:', error.message);
    
    // Return cached data if available
    const cachedNews = localStorage.getItem('latestNews');
    if (cachedNews) {
      try {
        const parsed = JSON.parse(cachedNews);
        return Array.isArray(parsed) && parsed.length > 0 ? parsed : [fallbackNews];
      } catch {
        return [fallbackNews];
      }
    }
    
    return [fallbackNews];
  }
};

// ============================================
// 🖼️ FETCH GALLERIES (for Galleries component)
// ============================================
export const fetchAllGalleries = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/galleries/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error(`HTTP ${response.status}: ${response.statusText}`);
      throw new Error(`Failed to fetch galleries: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Handle both paginated and non-paginated responses
    if (data.results && Array.isArray(data.results)) {
      console.log('Galleries fetched:', data.results.length);
      return data.results;
    }
    
    if (Array.isArray(data)) {
      console.log('Galleries fetched:', data.length);
      return data;
    }
    
    console.warn('Unexpected gallery response format:', data);
    return [];
  } catch (error) {
    console.error('Error fetching galleries:', error.message);
    return [];
  }
};

// ============================================
// 📚 FETCH SPECIFIC CONTENT TYPE
// ============================================
// ============================================
// 📰 FETCH SINGLE CONTENT ITEM BY ID (for NewsDetail page)
// Tries the public-detail endpoint first; falls back to scanning the
// public list so it still works before the backend endpoint is deployed.
// ============================================
export const fetchContentById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/content/${id}/public-detail/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('public-detail fetch failed, falling back to list:', error.message);
  }

  // Fallback: look for it in the public list, a page at a time (25 per page).
  try {
    for (let page = 1; page <= 20; page += 1) {
      const { items, hasMore } = await fetchContentPage(page);
      const found = items.find((c) => String(c.id) === String(id));
      if (found) return found;
      if (!hasMore) break;
    }
    return null;
  } catch (error) {
    console.error('Error fetching content by id:', error.message);
    return null;
  }
};
