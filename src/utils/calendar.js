// iCal 형식으로 레이스 일정 생성
export const generateICalEvent = (race) => {
  const formatDate = (dateStr, time = '14:00') => {
    const date = new Date(dateStr);
    const [hours, minutes] = time.split(':');
    date.setHours(parseInt(hours), parseInt(minutes), 0);

    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDate = formatDate(race.date, race.time || '14:00');
  const endDate = formatDate(race.date, '16:00');

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//RACE.GG//F1 Calendar//KO
BEGIN:VEVENT
UID:race-${race.round}-${race.season}@race.gg
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:F1 ${race.raceNameKr || race.raceName}
DESCRIPTION:Round ${race.round} - ${race.circuitKr || race.circuit}
LOCATION:${race.circuitKr || race.circuit}
END:VEVENT
END:VCALENDAR`;

  return icsContent;
};

// 캘린더 파일 다운로드
export const downloadCalendarEvent = (race) => {
  const icsContent = generateICalEvent(race);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `f1-round-${race.round}-${race.raceNameKr || race.raceName}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Google Calendar URL 생성
export const getGoogleCalendarUrl = (race) => {
  const formatGoogleDate = (dateStr, time = '14:00') => {
    const date = new Date(dateStr);
    const [hours, minutes] = time.split(':');
    date.setHours(parseInt(hours), parseInt(minutes), 0);

    return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  };

  const startDate = formatGoogleDate(race.date, race.time || '14:00');
  const endDate = formatGoogleDate(race.date, '16:00');

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `F1 ${race.raceNameKr || race.raceName}`,
    dates: `${startDate}/${endDate}`,
    details: `Round ${race.round} - ${race.circuitKr || race.circuit}`,
    location: race.circuitKr || race.circuit,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

// 전체 시즌 캘린더 다운로드
export const downloadSeasonCalendar = (races, season) => {
  const events = races.map(race => {
    const formatDate = (dateStr, time = '14:00') => {
      const date = new Date(dateStr);
      const [hours, minutes] = time.split(':');
      date.setHours(parseInt(hours), parseInt(minutes), 0);
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const startDate = formatDate(race.date, race.time || '14:00');
    const endDate = formatDate(race.date, '16:00');

    return `BEGIN:VEVENT
UID:race-${race.round}-${season}@race.gg
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${startDate}
DTEND:${endDate}
SUMMARY:F1 ${race.raceNameKr || race.raceName}
DESCRIPTION:Round ${race.round} - ${race.circuitKr || race.circuit}
LOCATION:${race.circuitKr || race.circuit}
END:VEVENT`;
  }).join('\n');

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//RACE.GG//F1 Calendar//KO
X-WR-CALNAME:F1 ${season} Season
${events}
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = `f1-${season}-season-calendar.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
