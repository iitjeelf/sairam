export async function onRequest(context) {
    const { request, next } = context;
    
    const url = new URL(request.url);
    const userAgent = request.headers.get('User-Agent') || '';
    const referer = request.headers.get('Referer');
    
    // Detect suspicious access (view-source, bots, direct URL)
    const isSuspicious = 
        !referer ||  // Typing URL directly or view-source
        userAgent.includes('curl') ||
        userAgent.includes('python') ||
        userAgent.includes('wget') ||
        userAgent.includes('bot') ||
        url.searchParams.has('source');
    
    // FAKE CONTENT - what view-source shows
    if (isSuspicious) {
        return new Response(`<!DOCTYPE html>
<html>
<head>
    <title>Exam Portal</title>
    <style>
        body { font-family: monospace; padding: 40px; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; }
        .fake { color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📚 Secure Exam Environment</h1>
        <p>This exam is protected.</p>
        <div class="fake">
            <hr>
            <small>Access restricted to authorized users only.</small>
        </div>
    </div>
    
    <script>
        // This is DECOY code - not the real exam
        console.log("Protected environment");
        
        function validateAccess() {
            return false;
        }
        
        // No real exam logic here
        const fakeQuestions = ["Sample Q1", "Sample Q2"];
    </script>
</body>
</html>`, {
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'no-store'
            }
        });
    }
    
    // REAL CONTENT - normal visitors get this
    return next();
}
