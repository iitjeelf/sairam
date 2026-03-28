export async function onRequest(context) {
    const { request, next } = context;
    
    const userAgent = request.headers.get('User-Agent') || '';
    const referer = request.headers.get('Referer');
    
    // Detect suspicious access (view-source, bots, direct URL)
    const isSuspicious = 
        !referer ||  // Direct URL access or view-source
        userAgent.includes('curl') ||
        userAgent.includes('python') ||
        userAgent.includes('wget') ||
        userAgent.includes('bot');
    
    // FAKE CONTENT - what view-source shows
    if (isSuspicious) {
        return new Response(`<!DOCTYPE html>
<html>
<head>
    <title>LFJC Exam Portal</title>
    <style>
        body {
            font-family: monospace;
            padding: 40px;
            background: #f5f5f5;
            text-align: center;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #4B0082;
        }
        .fake {
            color: #666;
            margin-top: 20px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔒 LFJC Online Examination</h1>
        <p>This is a secure exam environment.</p>
        <div class="fake">
            <hr>
            <small>Access restricted to authorized users only.</small>
            <br>
            <small>If you are a student, please contact your instructor.</small>
        </div>
    </div>
    <script>
        console.log("This is a decoy page - no real exam code here");
        // No real exam logic in this file
    </script>
</body>
</html>`, {
            headers: { 
                'Content-Type': 'text/html',
                'Cache-Control': 'no-store'
            }
        });
    }
    
    // REAL CONTENT - normal visitors get your actual exam
    return next();
}
