import Joi from 'joi';

export const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Email inválido',
      'any.required': 'Email é obrigatório'
    }),
    password: Joi.string().required().messages({
      'any.required': 'Senha é obrigatória'
    })
  });

  return schema.validate(data);
};

export const validatePasswordReset = (data) => {
  const schema = Joi.object({
    token: Joi.string().required(),
    password: Joi.string()
      .min(8)
      .regex(/^(?=.*[A-Z])(?=.*\d)/)
      .required()
      .messages({
        'string.min': 'A senha deve ter no mínimo 8 caracteres',
        'string.pattern.base': 'A senha deve conter pelo menos uma letra maiúscula e um número',
        'any.required': 'Nova senha é obrigatória'
      })
  });

  return schema.validate(data);
};