// Optional: include in server if vrei headere CSP implicite
export function csp(req,res,next){
  res.setHeader('Content-Security-Policy',"default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'");
  next();
}
