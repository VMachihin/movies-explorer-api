const allowedCors = [
  'https://api.movies.lib.nomoredomains.rocks',
  'http://api.movies.lib.nomoredomains.rocks',
  'https://movies.lib.nomoredomains.rocks',
  'http://movies.lib.nomoredomains.rocks',
  'localhost:3000',
  'http://localhost:3000',
  'localhost:8000',
  'http://localhost:8000',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
  const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // проверяем, что источник запроса есть среди разрешённых
  if (allowedCors.includes(origin)) {
    // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
    // res.header('Access-Control-Allow-Origin', origin);
    // устанавливаем заголовок, который разрешает браузеру запросы из любого источника
    res.header('Access-Control-Allow-Origin', '*');
  }

  if (method === 'OPTIONS') {
    // разрешаем кросс-доменные запросы любых типов (по умолчанию)
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    // разрешаем кросс-доменные запросы с этими заголовками
    res.header('Access-Control-Allow-Headers', requestHeaders);
    // завершаем обработку запроса и возвращаем результат клиенту
    return res.end();
  }

  return next();
};
