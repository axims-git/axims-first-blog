import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import ThemeToggle from './theme-toggle'
import {
  container,
  heading,
  headingRow,
  headingIcon,
  pageMetaText,
  navRow,
  navLinks,
  navLinkItem,
  navLinkText,
  siteTitleRow,
  siteTitle,
  siteLogo,
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
        <span className={siteTitle}>{data.site.siteMetadata.title}</span>
        <StaticImage
          src="../images/axims-logo.png"
          alt=""
          className={siteLogo}
          placeholder="none"
        />
      </header>
      <div className={navRow}>
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
          </ul>
        </nav>
        <ThemeToggle />
      </div>
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