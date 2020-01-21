import React from 'react';
import Helmet, { HelmetProps } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

interface Props {
  description?: string;
  meta?: HelmetProps['meta'];
}

function SEO({ description, meta = [] }: Props) {
  const { site, shareImage } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            hostname
          }
        }
        shareImage: file(relativePath: { eq: "share-image.png" }) {
          publicURL
        }
      }
    `,
  );

  const { title, hostname } = site.siteMetadata;
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
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          property: 'og:image',
          content: `${hostname}${shareImage.publicURL}`,
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          name: 'twitter:image',
          content: `${hostname}${shareImage.publicURL}`,
        },
        // @ts-ignore
      ].concat(meta)}
    />
  );
}

export default SEO;
