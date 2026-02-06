import styled from 'styled-components';

export const PageContainer = styled.div`
  width: 100%;
  min-height: 60vh;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const PageTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;

export const TabGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 1.5rem;
`;

export const Tab = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 10px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid ${props => props.$active ? props.theme.colors.primary : props.theme.border};
  background: ${props => props.$active ? `${props.theme.colors.primary}15` : 'transparent'};
  color: ${props => props.$active ? props.theme.colors.primary : props.theme.subText};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }
`;

export const SelectionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1.5rem;
  align-items: start;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const SelectBox = styled.div`
  background: ${props => props.theme.cardBg};
  border: 2px solid ${props => props.$selected ? props.$color || props.theme.colors.primary : props.theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${props => props.$color || props.theme.colors.primary};
  }

  .label {
    font-size: 0.85rem;
    color: ${props => props.theme.subText};
    margin-bottom: 0.5rem;
  }

  .selected-name {
    font-size: 1.3rem;
    font-weight: 700;
    color: ${props => props.$color || props.theme.text};
  }

  .placeholder {
    font-size: 1.1rem;
    color: ${props => props.theme.subText};
  }
`;

export const VsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background: ${props => props.theme.colors.primary};
  border-radius: 50%;
  font-size: 1.2rem;
  font-weight: 900;
  font-style: italic;
  color: white;

  @media (max-width: 768px) {
    margin: 0 auto;
  }
`;

export const DropdownOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DropdownModal = styled.div`
  width: 90%;
  max-width: 400px;
  max-height: 70vh;
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  overflow: hidden;
`;

export const DropdownSearch = styled.div`
  padding: 1rem;
  border-bottom: 1px solid ${props => props.theme.border};

  input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid ${props => props.theme.border};
    border-radius: 10px;
    background: ${props => props.theme.bg};
    color: ${props => props.theme.text};
    font-size: 1rem;
    outline: none;

    &:focus {
      border-color: ${props => props.theme.colors.primary};
    }
  }
`;

export const DropdownList = styled.div`
  max-height: 50vh;
  overflow-y: auto;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  cursor: pointer;
  border-left: 4px solid transparent;
  transition: all 0.15s;

  &:hover {
    background: ${props => props.theme.bg};
    border-left-color: ${props => props.$color || props.theme.colors.primary};
  }

  .info {
    flex: 1;
    .name { font-weight: 600; }
    .sub { font-size: 0.85rem; color: ${props => props.theme.subText}; }
  }
`;

export const CompareSection = styled.div`
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const CompareRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.border};

  &:last-child {
    border-bottom: none;
  }

  .stat-label {
    text-align: center;
    font-size: 0.85rem;
    color: ${props => props.theme.subText};
    font-weight: 600;
  }

  .stat-value {
    font-size: 1.5rem;
    font-weight: 800;

    &.left { text-align: right; }
    &.right { text-align: left; }

    &.winner {
      color: ${props => props.theme.colors.primary};
    }
  }

  @media (max-width: 768px) {
    .stat-value { font-size: 1.2rem; }
  }
`;

export const CompareBar = styled.div`
  display: flex;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background: ${props => props.theme.bg};
  margin-top: 0.5rem;

  .left-bar {
    height: 100%;
    background: ${props => props.$leftColor || props.theme.colors.primary};
    transition: width 0.5s ease;
  }

  .right-bar {
    height: 100%;
    background: ${props => props.$rightColor || '#3498db'};
    transition: width 0.5s ease;
  }
`;
