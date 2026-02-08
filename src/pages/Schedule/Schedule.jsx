import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar, MapPin, Trophy, ChevronRight, Download, CalendarPlus } from 'lucide-react';
import { API_BASE_URL } from '../../config';
import SeasonSelector from '../../components/common/SeasonSelector/SeasonSelector';
import { useToast } from '../../components/common/Toast/Toast';
import { downloadCalendarEvent, downloadSeasonCalendar, getGoogleCalendarUrl } from '../../utils/calendar';
import {
  ScheduleContainer, PageHeader, RaceList, RaceCard,
  DateBox, RaceInfo, RaceAction, WinnerBadge, TicketButton
} from './stlye';

const CalendarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 10px;
  color: ${props => props.theme.text};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

const AddToCalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: transparent;
  border: 1px solid ${props => props.theme.border};
  border-radius: 8px;
  color: ${props => props.theme.subText};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
    background: rgba(225, 6, 0, 0.1);
  }
`;

const Schedule = () => {
  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [season, setSeason] = useState('');
  const toast = useToast();

  const handleDownloadSeason = () => {
    if (schedule?.races) {
      downloadSeasonCalendar(schedule.races, schedule.season);
      toast.success('캘린더 다운로드', `${schedule.season} 시즌 일정이 다운로드되었습니다.`);
    }
  };

  const handleAddToCalendar = (race) => {
    downloadCalendarEvent(race);
    toast.success('캘린더 추가', `${race.raceNameKr} 일정이 다운로드되었습니다.`);
  };

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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2>{schedule.season} <span>SEASON</span></h2>
            <p>전체 {schedule.totalRaces}개 그랑프리 일정 및 결과를 확인하세요.</p>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <CalendarButton onClick={handleDownloadSeason}>
              <Download size={16} /> 시즌 캘린더
            </CalendarButton>
            <SeasonSelector value={season} onChange={setSeason} />
          </div>
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
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <AddToCalButton onClick={() => handleAddToCalendar(race)} title="캘린더에 추가">
                    <CalendarPlus size={16} />
                  </AddToCalButton>
                  <TicketButton>
                    예정 <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }}/>
                  </TicketButton>
                </div>
              )}
            </RaceAction>
          </RaceCard>
        ))}
      </RaceList>
    </ScheduleContainer>
  );
};

export default Schedule;
