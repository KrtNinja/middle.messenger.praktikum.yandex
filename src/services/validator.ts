type TCallback = () => string;

export interface IRule {
  pattern: string | TCallback;
  required: boolean;
  msg: string;
}

export interface IReturnValid {
  valid: boolean;
  msg: string;
}

export type TField = 'email' | 'login' | 'name' | 'phone' | 'password';

export class Validator {
  public readonly rules: Record<TField, IRule> = {
    email: {
      pattern: '.+@[^@]+[a-z]+\\.[^@]{2,}$',
      required: true,
      msg: 'Обязательное поле. Пример: pochta@yandex.ru'
    },
    login: {
      pattern: '^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$',
      required: true,
      msg: 'Обязательное поле. Только англ. буквы, символ _ и точка'
    },
    name: {
      pattern: '^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$',
      required: true,
      msg: 'Обязательное поле. Только буквы, дефис и точка'
    },
    phone: {
      pattern: '^[+-d]?\\d{10,15}$',
      required: true,
      msg: 'Обязательное поле. Пример: +79991112233'
    },
    password: {
      pattern: '^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,40}$',
      required: true,
      msg: 'Обязательно. Минимум 8 символов, 1 заглавный, 1 цифра'
    }
  };

  private isEmpty(value: string | null): boolean {
    return value == null || value.length === 0;
  }

  public validate(rule: IRule, value: string): IReturnValid {
    const pattern = typeof rule.pattern === 'string' ? rule.pattern : rule.pattern();
    const test = RegExp(pattern).test(value);
    const isValid = test && (rule.required ? !this.isEmpty(value) : true);

    return {
      valid: isValid,
      msg: isValid ? '' : rule.msg
    };
  }
}

export default new Validator();
