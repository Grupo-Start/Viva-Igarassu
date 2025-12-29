export function success(res, data = null, status = 200) {
  return res.status(status).json({ success: true, data });
}

export function error(res, message = 'Erro interno do servidor', status = 500, meta = null) {
  return res.status(status).json({ success: false, message, meta });
}

export default {
  success,
  error
};
