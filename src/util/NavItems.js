import { useStaticQuery, graphql } from 'gatsby';

export function useNavItems() {
  const {
    allContentfulNavItemsNavItemsListJsonNode: { edges },
  } = useStaticQuery(graphql`
    query LEFT_NAV_QUERY {
      allContentfulNavItemsNavItemsListJsonNode {
        edges {
          node {
            hasDivider
            pages {
              path
              title
            }
            title
          }
        }
      }
    }
  `);

  const navItems = edges.map(({ node }) => node);
  return navItems;
}
