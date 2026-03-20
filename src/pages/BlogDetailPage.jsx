import { Link, Navigate, useParams } from 'react-router-dom'
import { blogs } from '../blogData.js'

export function BlogDetailPage() {
  const { slug } = useParams()
  const blog = blogs.find((entry) => entry.slug === slug)

  if (!blog) {
    return <Navigate replace to="/blogs" />
  }

  const relatedBlogs = blogs.filter((entry) => entry.slug !== blog.slug).slice(0, 3)

  return (
    <main className="page page-blog-detail">
      <article className="blog-detail">
        <section className="blog-detail__hero">
          <Link className="blog-detail__backlink" to="/blogs">
            Back to blogs
          </Link>

          <div className="blog-detail__hero-copy">
            <p className="eyebrow">{blog.category}</p>
            <h1>{blog.title}</h1>
            <p>{blog.intro}</p>
            <div className="blogs-meta">
              <span>{blog.date}</span>
              <span>{blog.readTime}</span>
            </div>
          </div>

          <div className="blog-detail__hero-media">
            <img src={blog.image} alt={blog.title} />
          </div>
        </section>

        <section className="blog-detail__content">
          {blog.sections.map((section) => (
            <section className="blog-detail__section" key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </section>
      </article>

      <section className="blog-related">
        <div className="section-heading section-heading--row">
          <div>
            <p className="eyebrow">More Reading</p>
            <h2>Keep the story moving with the next three reads.</h2>
          </div>
          <Link className="button-secondary button-secondary--small" to="/blogs">
            View all blogs
          </Link>
        </div>

        <div className="blogs-grid">
          {relatedBlogs.map((entry) => (
            <Link className="blog-card" key={entry.slug} to={`/blogs/${entry.slug}`}>
              <div className="blog-card__media">
                <img src={entry.image} alt={entry.title} />
              </div>
              <div className="blog-card__body">
                <p className="eyebrow">{entry.category}</p>
                <h3>{entry.title}</h3>
                <p>{entry.excerpt}</p>
                <div className="blogs-meta">
                  <span>{entry.date}</span>
                  <span>{entry.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
