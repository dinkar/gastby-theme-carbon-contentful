import React from 'react';
import Layout from '../components/Layout';
import { HomepageBanner, HomepageCallout } from '../components/Homepage';
import Carbon from '../images/carbon.jpg';
import Main from '../components/Main';
import Utils from '../components/Utils';

import NextPrevious from '../components/NextPrevious';

const Homepage = ({
  children,
  Banner,
  FirstCallout,
  SecondCallout,
  location,
  pageContext,
}) => {
  const { frontmatter = {}, titleType } = pageContext;
  const { title, description, keywords } = frontmatter;

  return (
    <Layout
      pageTitle={title}
      pageDescription={description}
      pageKeywords={keywords}
      titleType={titleType}
      homepage
      theme="dark">
      {Banner}
      {FirstCallout}
      <Main>{children}</Main>
      {SecondCallout}
      <NextPrevious isHomepage location={location} frontmatter={frontmatter} />
      <Utils />
    </Layout>
  );
};
Homepage.defaultProps = {
  Banner: (
    <HomepageBanner
      renderText={() => (
        <h1>
          Carbon
          <br />
          Design System
        </h1>
      )}
      image={Carbon}
    />
  ),
  FirstCallout: <HomepageCallout />,
  SecondCallout: (
    <HomepageCallout color="inverse01" backgroundColor="#061f80" />
  ),
};

export default Homepage;
