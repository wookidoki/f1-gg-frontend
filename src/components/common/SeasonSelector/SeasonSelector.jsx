import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Calendar } from 'lucide-react';
import { API_BASE_URL } from '../../../config';

const SelectorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SelectBox = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 8px 12px;
  color: white;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &:focus {
    border-color: #e10600;
  }

  option {
    background: #1a1a2e;
    color: white;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
`;

const SeasonSelector = ({ value, onChange }) => {
  const [seasons, setSeasons] = useState([]);
  const [defaultSeason, setDefaultSeason] = useState('2025');

  useEffect(() => {
    fetch(`${API_BASE_URL}/seasons`)
      .then(res => res.json())
      .then(response => {
        if (response.success) {
          setSeasons(response.data.seasons);
          setDefaultSeason(response.data.defaultSeason);
          if (!value) {
            onChange(response.data.defaultSeason);
          }
        }
      })
      .catch(err => {
        console.error("시즌 목록 조회 실패:", err);
        setSeasons(['2025', '2024', '2023', '2022', '2021']);
      });
  }, []);

  return (
    <SelectorWrapper>
      <Label>
        <Calendar size={16} />
        시즌
      </Label>
      <SelectBox value={value || defaultSeason} onChange={(e) => onChange(e.target.value)}>
        {seasons.map(season => (
          <option key={season} value={season}>
            {season}
          </option>
        ))}
      </SelectBox>
    </SelectorWrapper>
  );
};

export default SeasonSelector;
