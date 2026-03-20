import { Link } from 'react-router-dom'
import { blogs, getBlogPath } from '../blogData.js'

export function BlogsPage() {
  const featuredBlog = blogs[0]
  const otherBlogs = blogs.slice(1)

  return (
    <main className="page page-blogs">
      <section className="blogs-hero">
        <div className="blogs-hero__copy">
          <p className="eyebrow">Journal</p>
          <h1>Stories around the can, the lineup, and the page itself.</h1>
          <p>
            A small editorial layer for the promo site with product notes, design thinking,
            and fast reads built around the Red Bull lineup.
          </p>
        </div>

        <Link className="blogs-hero__feature" to={getBlogPath(featuredBlog.slug)}>
          <div className="blogs-hero__feature-media">
            <img src={featuredBlog.image} alt={featuredBlog.title} />
          </div>
          <div className="blogs-hero__feature-body">
            <p className="eyebrow">{featuredBlog.category}</p>
            <h2>{featuredBlog.title}</h2>
            <p>{featuredBlog.excerpt}</p>
            <div className="blogs-meta">
              <span>{featuredBlog.date}</span>
              <span>{featuredBlog.readTime}</span>
            </div>
          </div>
        </Link>
      </section>

      <section className="blogs-grid-section">
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">All Blogs</p>
            <h2>Five focused reads for the product-first version of the site.</h2>
          </div>
        </div>

        <div className="blogs-grid">
          {otherBlogs.map((blog) => (
            <Link className="blog-card" key={blog.slug} to={getBlogPath(blog.slug)}>
              <div className="blog-card__media">
                <img src={blog.image} alt={blog.title} />
              </div>
              <div className="blog-card__body">
                <p className="eyebrow">{blog.category}</p>
                <h3>{blog.title}</h3>
                <p>{blog.excerpt}</p>
                <div className="blogs-meta">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
