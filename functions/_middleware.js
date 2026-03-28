export async function onRequest(context) {
    // Allow everything - no blocking
    return context.next();
}
