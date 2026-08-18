import * as React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'

const AboutPage = () => {
  return (
    <Layout pageTitle="About">
      <p>This blog predominantly serves as a way to record my configs and development decisions.  It is also my attempt to replicate the array of tech blogs that have helped me over the years. And to try and contribute to what makes/made the internet so useful.</p>
    </Layout>
  )
}

export const Head = () => <Seo title="About" />

export default AboutPage