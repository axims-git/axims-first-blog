import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import ThemeToggle from './theme-toggle'
import AsciiBanner from './ascii-banner'
import {
  container,
  heading,
  headingRow,
  headingIcon,
  pageMetaText,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitleRow,
} from './layout.module.css'

const Layout = ({ pageTitle, titleIcon, titleIconColor, pageMeta, children }) => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={container}>
      <header className={siteTitleRow}>
        <AsciiBanner />
      </header>
      <nav>
        <ul className={navLinks}>
          <li className={navLinkItem}>
            <Link to="/" className={navLinkText}>
              Home
            </Link>
          </li>
          <li className={navLinkItem}>
            <Link to="/about" className={navLinkText}>
              About
            </Link>
          </li>
          <li className={navLinkItem}>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
      <main>
        <div className={headingRow}>
          <h1 className={heading}>{pageTitle}</h1>
          {titleIcon && (
            <span
              className={headingIcon}
              style={titleIconColor ? { '--icon-color': titleIconColor } : undefined}
              dangerouslySetInnerHTML={{ __html: titleIcon }}
            />
          )}
        </div>
        {pageMeta && <p className={pageMetaText}>{pageMeta}</p>}
        {children}
      </main>
    </div>
  )
}

export default Layout