export async function get() {
    return {
        xml: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
	<url>
		<loc>https://cascadiajs.com/</loc>
	</url>
    <url>
		<loc>https://cascadiajs.com/2025/tickets</loc>
	</url>
	<url>
		<loc>https://cascadiajs.com/2025/attend</loc>
	</url>
    <url>
		<loc>https://cascadiajs.com/2025/cfp</loc>
	</url>
    <url>
		<loc>https://cascadiajs.com/2025/trainings</loc>
	</url>
    <url>
		<loc>https://cascadiajs.com/2025/scholarships</loc>
	</url>
</urlset>`
    }
}