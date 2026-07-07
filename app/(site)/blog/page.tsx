import type { Metadata } from "next";

import BlogClient from "./BlogClient";

import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

import { dictionaries } from "@/i18n/dictionaries";

import { buildBlogIndexJsonLd } from "@/lib/seo/blog-jsonld";

import { pageMetadata } from "@/lib/seo/metadata";



const en = dictionaries.en.pages.blog;


export const metadata: Metadata = pageMetadata({

  path: "/blog",

  title: en.title,

  description: en.subtitle,

});



const breadcrumbs = [

  { name: dictionaries.en.nav.home, href: "/" },

  { name: en.title },

];



export default function BlogPage() {

  return (

    <main>

      <BreadcrumbJsonLd items={breadcrumbs} />

      <script

        type="application/ld+json"

        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBlogIndexJsonLd()) }}

      />

      <BlogClient />

    </main>

  );

}


