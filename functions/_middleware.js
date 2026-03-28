export async function onRequest(context) {
    const { request } = context;
    
    // Get headers
    const referer = request.headers.get('Referer');
    const userAgent = request.headers.get('User-Agent') || '';
    
    // Detect suspicious access
    const isSuspicious = !referer || 
                         userAgent.includes('curl') || 
                         userAgent.includes('python') ||
                         userAgent.includes('bot');
    
    // If suspicious, show fake content
    if (isSuspicious) {
        return new Response(`<!DOCTYPE html>
<html>
<head><title>Exam Portal</title></head>
<body>
    <h1>Secure Exam System</h1>
    <p>Access restricted.</p>
</body>
</html>`, {
            headers: { 'Content-Type': 'text/html' }
        });
    }
    
    // Otherwise, serve normal content
    return context.next();
}
