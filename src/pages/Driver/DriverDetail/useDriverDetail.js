import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../../../config';

export const useDriverDetail = (code) => {
  const [driver, setDriver] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!code) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/drivers/${code}`);

        if (!response.ok) {
          throw new Error('드라이버 정보를 찾을 수 없습니다.');
        }

        const result = await response.json();

        // ResponseData 구조: { success, status, message, data }
        if (result.success) {
          setDriver(result.data);
        } else {
          setError(result.message || '데이터를 불러오지 못했습니다.');
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("데이터 로드 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code]);

  return { driver, loading, error };
};
