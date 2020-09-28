const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');

exports.onPreBootstrap = ({ store, reporter }) => {
  const { program } = store.getState();

  const dirs = [
    path.join(program.directory, 'src/images'),
    path.join(program.directory, 'src/data'),
  ];

  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      reporter.log(`creating the ${dir} directory`);
      mkdirp.sync(dir);
    }
  });
};

exports.createPages = async (
  { graphql, actions: { createPage } },
  pluginOptions
) => {
  const results = await graphql(`
    query ReadContentfulPosts {
      allContentfulPage {
        nodes {
          slug
        }
      }
    }
  `);

  const { titleType = 'page' } = pluginOptions;

  if (results.errors) {
    throw results.errors;
  }

  results.data.allContentfulPage.nodes.forEach((node) => {
    createPage({
      path: `${node.slug}`,
      component: require.resolve('./src/templates/DefaultContentful.js'),
      context: {
        slug: node.slug,
        titleType,
      },
    });
  });
};

// Create medium feed schema incase the plugin isn't used or you're on an ✈️
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions;

  const typeDefs = [
    schema.buildObjectType({
      name: 'MediumFeed',
      interfaces: ['Node'],
      fields: {
        author: 'String',
        slug: 'String',
        thumbnail: 'String',
        title: 'String',
        link: 'String',
        date: {
          type: 'Date',
          extensions: {
            dateformat: {},
          },
        },
      },
    }),
  ];

  createTypes(typeDefs);
};
