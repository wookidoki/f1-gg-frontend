import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, User, Users, ChevronRight, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useFavoriteList } from '../../hooks/useFavorite';
import {
  PageContainer, PageTitle, Section, SectionTitle,
  EmptyState, FavoriteCard, CardInfo
} from './style';

const Favorites = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { favorites, loading, refresh } = useFavoriteList();

  // 로그인 필요
  if (!isAuthenticated) {
    return (
      <PageContainer>
        <EmptyState>
          <Heart size={48} style={{ opacity: 0.3 }} />
          <h3>로그인이 필요합니다</h3>
          <p>즐겨찾기 기능을 이용하려면 로그인해주세요.</p>
          <button onClick={() => navigate('/login')}>
            <LogIn size={18} /> 로그인하기
          </button>
        </EmptyState>
      </PageContainer>
    );
  }

  if (loading) {
    return <PageContainer style={{ padding: '2rem', color: 'white' }}>Loading...</PageContainer>;
  }

  const hasDrivers = favorites.drivers && favorites.drivers.length > 0;
  const hasConstructors = favorites.constructors && favorites.constructors.length > 0;
  const isEmpty = !hasDrivers && !hasConstructors;

  return (
    <PageContainer>
      <PageTitle>
        <Heart size={28} color="#e10600" fill="#e10600" />
        내 즐겨찾기
        {favorites.totalCount > 0 && (
          <span style={{ fontSize: '1rem', fontWeight: '500', opacity: 0.6, marginLeft: '8px' }}>
            ({favorites.totalCount})
          </span>
        )}
      </PageTitle>

      {isEmpty ? (
        <EmptyState>
          <Heart size={48} style={{ opacity: 0.3 }} />
          <h3>아직 즐겨찾기가 없습니다</h3>
          <p>좋아하는 드라이버나 팀을 즐겨찾기에 추가해보세요!</p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={() => navigate('/drivers')}>
              <User size={18} /> 드라이버 보기
            </button>
            <button onClick={() => navigate('/teams')} style={{ background: 'transparent', border: '1px solid #e10600', color: '#e10600' }}>
              <Users size={18} /> 팀 보기
            </button>
          </div>
        </EmptyState>
      ) : (
        <>
          {/* 드라이버 섹션 */}
          {hasDrivers && (
            <Section>
              <SectionTitle>
                <User size={20} /> 드라이버 ({favorites.drivers.length})
              </SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {favorites.drivers.map((item) => (
                  <FavoriteCard
                    key={item.targetId}
                    onClick={() => navigate(`/drivers/${item.targetId}`)}
                  >
                    <CardInfo>
                      <User size={20} />
                      <span className="target-id">{item.targetId}</span>
                    </CardInfo>
                    <ChevronRight size={20} style={{ opacity: 0.5 }} />
                  </FavoriteCard>
                ))}
              </div>
            </Section>
          )}

          {/* 팀 섹션 */}
          {hasConstructors && (
            <Section>
              <SectionTitle>
                <Users size={20} /> 팀 ({favorites.constructors.length})
              </SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {favorites.constructors.map((item) => (
                  <FavoriteCard
                    key={item.targetId}
                    onClick={() => navigate(`/teams/${item.targetId}`)}
                  >
                    <CardInfo>
                      <Users size={20} />
                      <span className="target-id">{item.targetId.replace(/_/g, ' ')}</span>
                    </CardInfo>
                    <ChevronRight size={20} style={{ opacity: 0.5 }} />
                  </FavoriteCard>
                ))}
              </div>
            </Section>
          )}
        </>
      )}
    </PageContainer>
  );
};

export default Favorites;
