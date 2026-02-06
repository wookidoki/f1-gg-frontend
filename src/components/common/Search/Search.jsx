import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search as SearchIcon, User, Users, ChevronRight, X } from 'lucide-react';
import { API_BASE_URL } from '../../../config';

import {
  SearchWrapper, SearchButton, SearchOverlay, SearchModal,
  SearchInputWrapper, SearchResults, ResultSection, ResultItem, NoResults
} from './style';

const Search = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [driversRes, teamsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/standings/drivers?season=2024`).then(r => r.json()),
          fetch(`${API_BASE_URL}/standings/constructors?season=2024`).then(r => r.json())
        ]);

        if (driversRes.success) {
          setDrivers(driversRes.data.standings.map(s => ({
            code: s.driver?.code,
            nameKr: s.driver?.nameKr,
            nameEn: s.driver?.nameEn,
            team: s.constructor?.nameKr,
            teamColor: s.constructor?.color
          })));
        }

        if (teamsRes.success) {
          setTeams(teamsRes.data.standings.map(s => ({
            id: s.constructor?.constructorId,
            nameKr: s.constructor?.nameKr,
            name: s.constructor?.name,
            color: s.constructor?.color
          })));
        }
      } catch (err) {
        console.error('Search data fetch error:', err);
      }
    };

    fetchData();
  }, []);

  // Keyboard shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    setQuery('');
  };

  const handleSelect = (type, id) => {
    handleClose();
    if (type === 'driver') {
      navigate(`/drivers/${id}?season=2024`);
    } else {
      navigate(`/teams/${id}?season=2024`);
    }
  };

  // Filter results
  const filteredDrivers = query
    ? drivers.filter(d =>
        d.nameKr?.toLowerCase().includes(query.toLowerCase()) ||
        d.nameEn?.toLowerCase().includes(query.toLowerCase()) ||
        d.code?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredTeams = query
    ? teams.filter(t =>
        t.nameKr?.toLowerCase().includes(query.toLowerCase()) ||
        t.name?.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const hasResults = filteredDrivers.length > 0 || filteredTeams.length > 0;

  return (
    <SearchWrapper>
      <SearchButton onClick={() => setIsOpen(true)} title="검색 (Ctrl+K)">
        <SearchIcon size={18} />
      </SearchButton>

      {isOpen && (
        <SearchOverlay onClick={handleClose}>
          <SearchModal onClick={e => e.stopPropagation()}>
            <SearchInputWrapper>
              <SearchIcon size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="드라이버, 팀 검색..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              <span className="shortcut">ESC</span>
            </SearchInputWrapper>

            <SearchResults>
              {query && !hasResults && (
                <NoResults>
                  <SearchIcon size={40} />
                  <p>"{query}"에 대한 검색 결과가 없습니다</p>
                </NoResults>
              )}

              {filteredDrivers.length > 0 && (
                <ResultSection>
                  <div className="section-title">드라이버</div>
                  {filteredDrivers.slice(0, 5).map(driver => (
                    <ResultItem
                      key={driver.code}
                      $color={driver.teamColor}
                      onClick={() => handleSelect('driver', driver.code)}
                    >
                      <div className="icon">
                        <User size={20} />
                      </div>
                      <div className="info">
                        <div className="name">{driver.nameKr}</div>
                        <div className="sub">{driver.team} • {driver.code}</div>
                      </div>
                      <ChevronRight size={16} className="arrow" />
                    </ResultItem>
                  ))}
                </ResultSection>
              )}

              {filteredTeams.length > 0 && (
                <ResultSection>
                  <div className="section-title">팀</div>
                  {filteredTeams.map(team => (
                    <ResultItem
                      key={team.id}
                      $color={team.color}
                      onClick={() => handleSelect('team', team.id)}
                    >
                      <div className="icon">
                        <Users size={20} />
                      </div>
                      <div className="info">
                        <div className="name">{team.nameKr}</div>
                        <div className="sub">{team.name}</div>
                      </div>
                      <ChevronRight size={16} className="arrow" />
                    </ResultItem>
                  ))}
                </ResultSection>
              )}

              {!query && (
                <NoResults>
                  <SearchIcon size={40} />
                  <p>드라이버 또는 팀 이름을 입력하세요</p>
                </NoResults>
              )}
            </SearchResults>
          </SearchModal>
        </SearchOverlay>
      )}
    </SearchWrapper>
  );
};

export default Search;
