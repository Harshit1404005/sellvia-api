import url from 'url';
import { healthCheck } from './controllers/health.controller.js';

export function router(req, res){
    const parsedUrl = url.parse.url(req.url,true);
    const method = req.method;
    const path = parsedUrl.pathname;

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
 
    if(method === 'OPTIONS'){
        res.writeHead(204);
        res.end();
        return;
    }

    // Health Check Route
    if (method === 'GET' && path === '/') {
    return healthCheck(req, res);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
}