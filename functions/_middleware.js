export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);
    const referer = request.headers.get('Referer');
    
    // Allow access from your Worker (mask URL)
    if (referer && (referer.includes('workers.dev') || referer.includes('exam-mask'))) {
        return next();
    }
    
    // Allow access if coming from your Worker's IP or request
    const userAgent = request.headers.get('User-Agent') || '';
    if (userAgent.includes('Cloudflare-Workers')) {
        return next();
    }
    
    // Allow images and assets
    if (url.pathname.match(/\.(png|jpg|jpeg|gif|css|js|ico|svg)$/i)) {
        return next();
    }
    
    // Block direct access (view-source, typing URL, etc.)
    if (!referer) {
        return new Response(`<!DOCTYPE html>
<html>
<head><title>Access Restricted</title></head>
<body style="text-align:center; padding:50px; font-family: Arial;">
    <h1>🔒 Access Restricted</h1>
    <p>Please use the official exam link.</p>
    <p style="color:#666; font-size:12px;">If you're a student, contact your instructor.</p>
</body>
</html>`, {
            headers: { 'Content-Type': 'text/html' }
        });
    }
    
    return next();
}
