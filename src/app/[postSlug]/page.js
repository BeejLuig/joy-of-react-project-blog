import React from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import COMPONENT_MAP from '@/helpers/component-map';

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  console.log('Generating metadata for:', postSlug);
  const { frontmatter } = await loadBlogPost(postSlug);

  return {
    title: frontmatter.title,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const blogPost = await loadBlogPost(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={blogPost.frontmatter.title}
        publishedOn={new Date(blogPost.frontmatter.publishedOn)}
      />
      <div className={styles.page}>
        <MDXRemote source={blogPost.content}
          components={COMPONENT_MAP}
        />
      </div>
    </article>
  );
}

export default BlogPost;
