import React from 'react';
import { Calendar, MapPin, Trophy, ChevronRight } from 'lucide-react';
import { 
  ScheduleContainer, PageHeader, RaceList, RaceCard, 
  DateBox, RaceInfo, RaceAction, WinnerBadge, TicketButton 
} from './stlye';

const Schedule = () => {
  // 나중에 API로 불러올 데이터
  const scheduleData = [
    { id: 20, round: "R20", name: "멕시코 시티 GP", date: "10.28", circuit: "Autódromo Hermanos Rodríguez", status: "DONE", winner: "Carlos Sainz" },
    { id: 21, round: "R21", name: "상파울루 GP", date: "11.04", circuit: "Interlagos Circuit", status: "DONE", winner: "Max Verstappen" },
    { id: 22, round: "R22", name: "라스베가스 GP", date: "11.24", circuit: "Las Vegas Strip Circuit", status: "UPCOMING", winner: null },
    { id: 23, round: "R23", name: "카타르 GP", date: "12.02", circuit: "Lusail International Circuit", status: "UPCOMING", winner: null },
    { id: 24, round: "R24", name: "아부다비 GP", date: "12.08", circuit: "Yas Marina Circuit", status: "UPCOMING", winner: null },
  ];

  return (
    <ScheduleContainer>
      <PageHeader>
        <h2>2025 <span>SEASON</span></h2>
        <p>전체 그랑프리 일정 및 결과를 확인하세요.</p>
      </PageHeader>

      <RaceList>
        {scheduleData.map((race) => (
          <RaceCard key={race.id} $isUpcoming={race.status === 'UPCOMING'}>
            {/* 날짜 박스 */}
            <DateBox>
              <span>{race.round}</span>
              <span>{race.date.split('.')[1]}월</span>
            </DateBox>

            {/* 경기 정보 */}
            <RaceInfo>
              <h3>{race.name}</h3>
              <p>
                <MapPin size={14} /> {race.circuit}
              </p>
              <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>
                <Calendar size={14} /> {race.date}
              </p>
            </RaceInfo>

            {/* 우측 액션 (결과 또는 예매) */}
            <RaceAction>
              {race.status === 'DONE' ? (
                <WinnerBadge>
                  <Trophy size={14} /> {race.winner}
                </WinnerBadge>
              ) : (
                <TicketButton>
                  중계 보기 <ChevronRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }}/>
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