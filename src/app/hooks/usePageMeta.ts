import { useEffect } from "react";

const BASE_URL = "https://ga-webdesign.de";

export function usePageMeta({
  title,
  description,
  path = "",
}: {
  title: string;
  description: string;
  path?: string;
}) {
  useEffect(() => {
    document.title = title;

    const set = (selector: string, attr: string, value: string) => {
      document.querySelector(selector)?.setAttribute(attr, value);
    };

    set('meta[name="description"]', "content", description);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    set('meta[property="og:url"]', "content", `${BASE_URL}${path}`);
    set('link[rel="canonical"]', "href", `${BASE_URL}${path}`);
    set('meta[name="twitter:title"]', "content", title);
    set('meta[name="twitter:description"]', "content", description);
  }, [title, description, path]);
}
