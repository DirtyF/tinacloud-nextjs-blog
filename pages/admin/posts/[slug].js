import React from "react";
import { useGraphqlForms } from "tina-graphql-gateway";
import { useRouter } from "next/router";
import Post from "../../posts/[slug]";

export default function () {
  const query = (gql) => gql`
    query BlogPostQuery($relativePath: String!) {
      getPostsDocument(relativePath: $relativePath) {
        data {
          __typename
          ... on Post_Doc_Data {
            title
            excerpt
            coverImage
            date
            author {
              name
              picture
            }
            ogImage {
              url
            }
            _body
          }
        }
      }
    }
  `;

  const router = useRouter();
  const [payload, isLoading] = useGraphqlForms({
    query,
    variables: { relativePath: `${router.query.slug}.md` },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const { _body, ...post } = payload.getPostsDocument.data;
  const pageData = { post, content: _body };
  return <Post content={pageData.content}{...pageData} />;
}
