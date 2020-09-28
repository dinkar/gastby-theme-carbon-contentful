import React from 'react';
import slugify from 'slugify';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';

import Utils from '../components/Utils';
import Layout from '../components/Layout';
import PageHeader from '../components/PageHeader';
import NextPrevious from '../components/NextPrevious';
import PageTabs from '../components/PageTabs';
import Main from '../components/Main';

export const data = graphql`
  query($slug: String!) {
    page: contentfulPage(slug: { eq: $slug }) {
      slug
      content {
        childMdx {
          frontmatter {
            description
            title
          }
          body
        }
      }
    }
  }
`;

const Default = ({ data: { page: pageContext }, location, Title }) => {
  const {
    content: {
      childMdx: { frontmatter = {}, body },
    },
    titleType,
  } = pageContext;
  const { tabs, title, theme, description, keywords } = frontmatter;

  const { slug } = pageContext;

  const getCurrentTab = () => {
    if (!tabs) return '';
    return (
      slug.split('/').filter(Boolean).slice(-1)[0] ||
      slugify(tabs[0], { lower: true })
    );
  };

  const currentTab = getCurrentTab();

  return (
    <Layout
      tabs={tabs}
      homepage={false}
      theme={theme}
      pageTitle={title}
      pageDescription={description}
      pageKeywords={keywords}
      titleType={titleType}>
      <PageHeader title={Title ? <Title /> : title} label="label" tabs={tabs} />
      {tabs && <PageTabs slug={slug} tabs={tabs} currentTab={currentTab} />}
      <Main padded>
        <MDXRenderer>{body}</MDXRenderer>
      </Main>
      <NextPrevious
        frontmatter={frontmatter}
        location={location}
        slug={slug}
        tabs={tabs}
        currentTab={currentTab}
      />
      <Utils />
    </Layout>
  );
};

export default Default;
