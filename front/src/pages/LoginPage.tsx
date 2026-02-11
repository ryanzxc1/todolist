import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/authApi';
import { SignInRequest, SignUpRequest } from '../types/auth.types';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const data: SignInRequest = { email, password };
    const response = await authApi.signIn(data);

    if (response.token) {
      // 토큰과 이메일 저장 - 순서 중요!
      localStorage.setItem('token', response.token);
      localStorage.setItem('email', email);  // 이 부분 확인
      
      console.log('Saved email:', email); // 디버깅용
      console.log('Saved token:', response.token); // 디버깅용
      
      navigate('/todos');
    }
  } catch (err: any) {
    setError(err.response?.data?.message || '로그인에 실패했습니다.');
  } finally {
    setLoading(false);
  }
};

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data: SignUpRequest = { email, password, nickname };
      await authApi.signUp(data);
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      setIsSignUp(false);
      setPassword('');
      setNickname('');
    } catch (err: any) {
      setError(err.response?.data?.message || '회원가입에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h1 style={styles.title}>{isSignUp ? '회원가입' : '로그인'}</h1>

        <form onSubmit={isSignUp ? handleSignUp : handleSignIn} style={styles.form}>
          <input
            type="email"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          {isSignUp && (
            <input
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              style={styles.input}
            />
          )}

          {error && <p style={styles.error}>{error}</p>}

          <button type="submit" disabled={loading} style={styles.button}>
            {loading ? '처리중...' : isSignUp ? '회원가입' : '로그인'}
          </button>
        </form>

        <p style={styles.toggleText}>
          {isSignUp ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}
          <button
            type="button"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError('');
            }}
            style={styles.toggleButton}
          >
            {isSignUp ? '로그인' : '회원가입'}
          </button>
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
  },
  formWrapper: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  error: {
    color: '#f44336',
    textAlign: 'center',
    margin: '0',
  },
  toggleText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#666',
  },
  toggleButton: {
    marginLeft: '5px',
    color: '#4CAF50',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    fontSize: '14px',
  },
};

export default LoginPage;