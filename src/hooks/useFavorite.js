import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../config';
import { useAuth } from '../contexts/AuthContext';

export const useFavorite = (type, targetId) => {
  const { isAuthenticated } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const getAuthHeader = () => {
    const token = localStorage.getItem('accessToken');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  // 즐겨찾기 여부 확인
  const checkFavorite = useCallback(async () => {
    if (!isAuthenticated || !type || !targetId) {
      setIsFavorite(false);
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/favorites/check?type=${type}&targetId=${targetId}`,
        { headers: getAuthHeader() }
      );
      const data = await response.json();
      if (data.success) {
        setIsFavorite(data.data.isFavorite);
      }
    } catch (err) {
      console.error('Check favorite error:', err);
    }
  }, [isAuthenticated, type, targetId]);

  useEffect(() => {
    checkFavorite();
  }, [checkFavorite]);

  // 즐겨찾기 토글
  const toggleFavorite = async () => {
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      return false;
    }

    setLoading(true);
    try {
      if (isFavorite) {
        // 삭제
        const response = await fetch(
          `${API_BASE_URL}/favorites?type=${type}&targetId=${targetId}`,
          {
            method: 'DELETE',
            headers: getAuthHeader()
          }
        );
        const data = await response.json();
        if (data.success) {
          setIsFavorite(false);
          return true;
        }
      } else {
        // 추가
        const response = await fetch(`${API_BASE_URL}/favorites`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...getAuthHeader()
          },
          body: JSON.stringify({ type, targetId })
        });
        const data = await response.json();
        if (data.success) {
          setIsFavorite(true);
          return true;
        }
      }
    } catch (err) {
      console.error('Toggle favorite error:', err);
    } finally {
      setLoading(false);
    }
    return false;
  };

  return { isFavorite, loading, toggleFavorite, checkFavorite };
};

// 즐겨찾기 목록 조회 훅
export const useFavoriteList = () => {
  const { isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState({ drivers: [], constructors: [], totalCount: 0 });
  const [loading, setLoading] = useState(true);

  const fetchFavorites = useCallback(async () => {
    if (!isAuthenticated) {
      setFavorites({ drivers: [], constructors: [], totalCount: 0 });
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/favorites`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setFavorites(data.data);
      }
    } catch (err) {
      console.error('Fetch favorites error:', err);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return { favorites, loading, refresh: fetchFavorites };
};
