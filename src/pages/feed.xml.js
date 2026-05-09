import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = (await getCollection('posts', p => !p.data.draft))
    .sort((a, b) => b.data.date.localeCompare(a.data.date));

  return rss({
    title: 'whisperx00@kali — offsec notes',
    description: 'windows & AD, web exploitation, custom tooling.',
    site: context.site,
    items: posts.map(p => ({
      title: p.data.title,
      pubDate: new Date(p.data.date),
      link: `/posts/${p.id}/`,
    })),
    customData: `<language>en</language>`,
  });
}
