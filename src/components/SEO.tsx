import React from 'react';
import Helmet, { HelmetProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  description?: string;
  meta?: HelmetProps['meta'];
}

function SEO({ description, meta = [] }: Props) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `,
  );

  const title = site.siteMetadata.title;
  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
      }}
      defaultTitle={title}
      titleTemplate={`%s | ${title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        // @ts-ignore
      ].concat(meta)}
    />
  );
}

export default SEO;
