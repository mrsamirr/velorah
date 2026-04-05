import { redirect, notFound } from "next/navigation";

export default async function ArticleRedirectPage({
  searchParams,
}: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const params = await searchParams;
  const slug = params.slug;
  if (!slug) notFound();
  redirect(`/article/${slug}`);
}
