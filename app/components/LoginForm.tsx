import { useForm } from 'react-hook-form';
import { useState } from 'react';

type FormInputs = {
  email: string;
  password: string;
};

type ApiError = {
  ErrorCode: number;
  ErrorMessageJP: string;
  ErrorMessageEN: string;
};

type LoginResponse = {
  token: string;
};

export const LoginForm = () => {
  const [apiError, setApiError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>({
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    setApiError('');
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('APIレスポンス:', errorText);
        throw new Error('ログインに失敗しました');
      }
  
      const responseData = await response.json();
      localStorage.setItem('token', responseData.token);
      
    } catch (error) {
      setApiError(error instanceof Error ? error.message : '予期せぬエラーが発生しました');
      console.error('エラーの詳細:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {apiError}
        </div>
      )}

      <div>
        <label htmlFor="email" className="block mb-2">
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          className="border p-2 w-full rounded"
          {...register('email', {
            required: 'メールアドレスは必須です',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: '有効なメールアドレスを入力してください'
            }
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block mb-2">
          パスワード
        </label>
        <input
          id="password"
          type="password"
          className="border p-2 w-full rounded"
          {...register('password', {
            required: 'パスワードは必須です',
            minLength: {
              value: 8,
              message: 'パスワードは8文字以上である必要があります'
            }
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <button 
        type="submit"
        disabled={isLoading}
        className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? 'ログイン中...' : 'ログイン'}
      </button>
    </form>
  );
};
