export async function onRequest(context) {
    const { request, next } = context;
    const url = new URL(request.url);
    const referer = request.headers.get('Referer');
    
    // Allow your mask worker to access
    if (referer && referer.includes('workers.dev')) {
        return next();
    }
    
    // Allow images and assets
    if (url.pathname.match(/\.(png|jpg|jpeg|gif|css|js|ico|svg)$/i)) {
        return next();
    }
    
    // Block suspicious access (view-source, direct URL)
    if (!referer) {
        return new Response(`<!DOCTYPE html>
<html>
<head><title>Access Restricted</title></head>
<body style="text-align:center; padding:50px;">
    <h1>🔒 Access Restricted</h1>
    <p>Please use the official exam link.</p>
</body>
</html>`, {
            headers: { 'Content-Type': 'text/html' }
        });
    }
    
    return next();
}
