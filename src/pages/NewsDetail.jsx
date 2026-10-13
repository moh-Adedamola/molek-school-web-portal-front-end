import usePageTitle from '../hooks/usePageTitle.js';
import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Newspaper } from "lucide-react";
import DOMPurify from "dompurify";
import { fetchContentById } from "../service/auth";

const ARTICLE_CSS = `
.article-content { color: #1f2937; font-size: 1.05rem; line-height: 1.85; }
.article-content p { margin: 0 0 1.1rem; }
.article-content h1 { font-size: 1.9rem; font-weight: 800; color: #1F3B6B; margin: 1.6rem 0 0.8rem; }
.article-content h2 { font-size: 1.55rem; font-weight: 700; color: #1F3B6B; margin: 1.5rem 0 0.7rem; }
.article-content h3 { font-size: 1.25rem; font-weight: 700; color: #1F3B6B; margin: 1.2rem 0 0.6rem; }
.article-content ul { list-style: disc; padding-left: 1.6rem; margin: 0 0 1.1rem; }
.article-content ol { list-style: decimal; padding-left: 1.6rem; margin: 0 0 1.1rem; }
.article-content li { margin: 0.4rem 0; }
.article-content blockquote { border-left: 4px solid #3B82F6; padding: 0.4rem 0 0.4rem 1.1rem; margin: 0 0 1.1rem; color: #475569; font-style: italic; background: #f8fafc; border-radius: 0 0.5rem 0.5rem 0; }
.article-content a { color: #2563eb; text-decoration: underline; }
.article-content strong { font-weight: 700; }
`;

const looksLikeHtml = (s) => /<\/?[a-z][\s\S]*>/i.test(s || "");
const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Build safe HTML from either rich HTML or legacy plain text (with \n).
const renderBody = (desc) => {
  if (!desc) return "";
  if (looksLikeHtml(desc)) return DOMPurify.sanitize(desc);
  const html = desc
    .split(/\n{2,}/)
    .map((block) => `<p>${block.split(/\n/).map(escapeHtml).join("<br>")}</p>`)
    .join("");
  return DOMPurify.sanitize(html);
};

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  } catch {
    return iso;
  }
};

const NewsDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [item, setItem] = useState(location.state?.item || null);
  const [loading, setLoading] = useState(!location.state?.item);
  const [notFound, setNotFound] = useState(false);
  usePageTitle(item?.title || (notFound ? 'Article not found' : 'News & Events'));

  useEffect(() => {
    window.scrollTo(0, 0);
    if (item) return;
    let active = true;
    (async () => {
      setLoading(true);
      const data = await fetchContentById(id);
      if (!active) return;
      if (data) setItem(data);
      else setNotFound(true);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto animate-pulse">
          <div className="h-6 w-32 bg-gray-200 rounded-full mb-8" />
          <div className="h-10 bg-gray-200 rounded-xl w-3/4 mb-6" />
          <div className="h-64 bg-gray-200 rounded-2xl mb-8" />
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        </div>
      </section>
    );
  }

  if (notFound || !item) {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="text-7xl mb-6">📰</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Article not found</h1>
        <p className="text-gray-600 mb-8">It may have been removed or unpublished.</p>
        <button
          onClick={() => navigate("/news")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#3B82F6] text-white rounded-full font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Back to News
        </button>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-[#FAFAFA] to-white px-4 sm:px-6 lg:px-8 py-12 lg:py-16"
    >
      <style>{ARTICLE_CSS}</style>
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate("/news")}
          className="inline-flex items-center gap-2 text-[#3B82F6] font-semibold mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Back to News
        </button>

        <div className="inline-flex items-center gap-2 bg-[#3B82F6]/10 px-4 py-1.5 rounded-full mb-4">
          <Newspaper className="w-4 h-4 text-[#3B82F6]" />
          <span className="text-[#3B82F6] font-semibold text-xs uppercase tracking-wider">
            {item.content_type === "news" ? "News" : item.content_type}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[#1F3B6B] leading-tight mb-4">
          {item.title}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-8">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {formatDate(item.publish_date || item.created_at)}
          </span>
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4" />
            {item.created_by?.full_name || "Admin"}
          </span>
        </div>

        {item.media_url && item.content_type === "image" && (
          <img
            src={item.media_url}
            alt={item.title}
            className="w-full rounded-2xl shadow-lg mb-10"
            onError={(e) => (e.target.style.display = "none")}
          />
        )}
        {item.media_url && item.content_type === "video" && (
          <video src={item.media_url} controls className="w-full rounded-2xl shadow-lg mb-10" />
        )}

        <article
          className="article-content"
          dangerouslySetInnerHTML={{ __html: renderBody(item.description) }}
        />
      </div>
    </motion.section>
  );
};

export default NewsDetail;
