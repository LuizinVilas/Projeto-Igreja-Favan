export default function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Erro de validação',
      errors: err.details
    });
  }

  if (err.name === 'PrismaClientKnownRequestError') {
    return res.status(400).json({
      message: 'Erro de banco de dados',
      error: err.message
    });
  }

  return res.status(500).json({
    message: 'Erro interno do servidor'
  });
}