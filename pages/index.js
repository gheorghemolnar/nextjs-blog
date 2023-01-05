import Head from 'next/head'
import Link from 'next/link'

import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import {getSortedPostsData} from '../lib/posts'

export default function Home({ staticData = [], dynaData }) { 
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={utilStyles.headingMd}>
        <h1>Blogs</h1>
        <ul className={utilStyles.list}>
        {
            dynaData.map(({ id, date, title }) => 
              <li key={id} className={utilStyles.listItem}>
                <Link href={`/posts/${id}`}>{title}</Link>
                <br />
                <small className={utilStyles.lightText}>
                  <Date dateString={date} />
                </small>
              </li>)
        }
        </ul>
        
      </section>
    </Layout>
  );
}

// export async function getStaticProps() {
//   // Get external data from the file system, API, DB, etc.
//   const data = getSortedPostsData();

//   // The value of the `props` key will be
//   //  passed to the `Home` component
//   return {
//     props: {
//       data
//     }
//   }
// }

export async function getServerSideProps(context) {
  // const url = 'https://swapi.dev/api/films'
  // const result = await (await fetch(url)).json();
  const result = await getSortedPostsData();

  return {
    props: {
      dynaData: result
    },
  };
}
