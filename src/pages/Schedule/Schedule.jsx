import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Trophy, ChevronRight } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import SeasonSelector from '../../components/common/SeasonSelector/SeasonSelector';
import {
  ScheduleContainer, PageHeader, RaceList, RaceCard,
  DateBox, RaceInfo, RaceAction, WinnerBadge, TicketButton
} from './stlye';

const Schedule = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState('');

  useEffect(() => {
    if (!season) return;
    setLoading(true);
    fetch(`${API_BASE_URL}/schedule?season=${season}`)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setSchedule(response.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [season]);

  if (loading) return <div style={{padding:'2rem', color:'white'}}>Loading...</div>;
  if (!schedule) return <div style={{padding:'2rem', color:'white'}}>데이터를 불러올 수 없습니다.</div>;

  return (
    <ScheduleContainer>
      <PageHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div>
            <h2>{schedule.season} <span>SEASON</span></h2>
            <p>전체 {schedule.totalRaces}개 그랑프리 일정 및 결과를 확인하세요.</p>
          </div>
          <SeasonSelector value={season} onChange={setSeason} />
        </div>
      </PageHeader>

      <RaceList>
        {schedule.races.map((race) => (
          <RaceCard key={race.round} $isUpcoming={race.status === 'UPCOMING'}>
            {/* 날짜 박스 */}
            <DateBox>
              <span>R{race.round}</span>
              <span>{race.countryFlag}</span>
            </DateBox>

            {/* 경기 정보 */}
            <RaceInfo>
              <h3>{race.raceNameKr}</h3>
              <p>
                <MapPin size={14} /> {race.circuitKr}
              </p>
              <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                <Calendar size={14} /> {race.date}
              </p>
            </RaceInfo>

            {/* 우측 액션 (결과 또는 예매) */}
            <RaceAction>
              {race.status === 'FINISHED' && race.winner ? (
                <WinnerBadge>
                  <Trophy size={14} /> {race.winner.nameKr}
                </WinnerBadge>
              ) : (
                <TicketButton>
                  예정 <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }}/>
                </TicketButton>
              )}
            </RaceAction>
          </RaceCard>
        ))}
      </RaceList>
    </ScheduleContainer>
  );
};

export default Schedule;
