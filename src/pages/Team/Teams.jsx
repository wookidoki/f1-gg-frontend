import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Zap } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import SeasonSelector from '../../components/common/SeasonSelector/SeasonSelector';

import {
  PageContainer, Header, Title, SearchBar, SearchInput,
  GridContainer, TeamCard, TeamHeader, TeamLogoPlaceholder,
  TeamInfo, TeamName, CarModel, StatsRow, StatItem
} from './style';

const Teams = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState('');

  useEffect(() => {
    if (!season) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/constructors?season=${season}`)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setTeams(response.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [season]);

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.nameKr.includes(searchTerm)
  );

  if (loading) return <div style={{padding:'2rem', color:'white'}}>Loading...</div>;

  return (
    <PageContainer>
      <Header>
        <Title>
          <Users size={28} /> {season} <span>CONSTRUCTORS</span>
        </Title>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <SeasonSelector value={season} onChange={setSeason} />
          <SearchBar>
            <Search size={18} style={{ opacity: 0.5 }} />
            <SearchInput
              placeholder="팀 이름 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
        </div>
      </Header>

      <GridContainer>
        {filteredTeams.map((team) => (
          <TeamCard
            key={team.constructorId}
            $teamColor={team.color}
            onClick={() => navigate(`/teams/${team.constructorId}?season=${season}`)}
          >
            <TeamHeader>
              <TeamLogoPlaceholder $color={team.color}>
                {team.name.substring(0, 1)}
              </TeamLogoPlaceholder>
              <Zap size={20} color={team.color} fill={team.color} />
            </TeamHeader>

            <TeamInfo>
              <CarModel>{team.nameKr}</CarModel>
              <TeamName>{team.name}</TeamName>
              {team.drivers && team.drivers.length > 0 && (
                <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                  {team.drivers.map(d => d.nameKr).join(' / ')}
                </p>
              )}
            </TeamInfo>

            <StatsRow>
              <StatItem>
                <span>PTS</span>
                <strong>{team.points}</strong>
              </StatItem>
              <StatItem>
                <span>WINS</span>
                <strong style={{ color: team.wins > 0 ? '#f1c40f' : 'inherit' }}>
                  {team.wins > 0 ? team.wins : '-'}
                </strong>
              </StatItem>
              <StatItem>
                <span>RANK</span>
                <strong>{team.rank}위</strong>
              </StatItem>
            </StatsRow>
          </TeamCard>
        ))}
      </GridContainer>
    </PageContainer>
  );
};

export default Teams;
