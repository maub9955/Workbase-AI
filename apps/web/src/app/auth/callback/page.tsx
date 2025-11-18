'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      // Workbase-AI 토큰을 API로 전달하여 검증
      fetch(`${API_URL}/auth/imweb`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('인증 실패');
          }
          return res.json();
        })
        .then((data) => {
          if (data.user && data.token) {
            // 로컬 스토리지에 토큰 저장
            localStorage.setItem('auth_token', data.token);
            // 워크스페이스로 리다이렉트
            router.push('/workspace');
          } else {
            throw new Error('사용자 정보를 받을 수 없습니다.');
          }
        })
        .catch((error) => {
          console.error('인증 실패:', error);
          alert('로그인에 실패했습니다. 다시 시도해주세요.');
          router.push('/my-space');
        });
    } else {
      // 토큰이 없으면 로그인 페이지로 리다이렉트
      router.push('/my-space');
    }
  }, [token, router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>로그인 처리 중...</div>
      <div style={{ color: '#666' }}>잠시만 기다려주세요.</div>
    </div>
  );
}

