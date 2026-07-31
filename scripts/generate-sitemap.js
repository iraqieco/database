import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const { data, error } = await supabase
  .from("organisms")
  .select("id, updated_at, image")
  .order("id");

if (error) {
  console.error(error);
  process.exit(1);
}

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<url>
  <loc>https://iraqieco.github.io/database/</loc>
  <changefreq>daily</changefreq>
  <priority>1.0</priority>
</url>

<url>
  <loc>https://iraqieco.github.io/database/news.html</loc>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>
`;

for (const item of data) {
  xml += `
<url>
  <loc>https://iraqieco.github.io/database/organism.html?id=${item.id}</loc>
  <lastmod>${(item.updated_at ?? new Date().toISOString()).split("T")[0]}</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>`;
}

xml += `
</urlset>`;

fs.writeFileSync("sitemap.xml", xml);

console.log(`تم إنشاء sitemap.xml ويحتوي على ${data.length} كائناً.`);
