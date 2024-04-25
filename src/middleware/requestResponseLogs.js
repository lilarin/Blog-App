const logs = (req, res, next) => {
    const now = new Date();
    const timestamp = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()} ${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()}`;
    console.log(`[${timestamp}] - ${req.method} ${req.originalUrl}`);
    res.on('finish', () => {
      console.log(`[${timestamp}] - ${res.statusCode} ${res.statusMessage}`);
    });
    next();
  };
  
  module.exports = logs;
  