import styled from 'styled-components';

export const SearchWrapper = styled.div`
  position: relative;
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: transparent;
  color: ${props => props.theme.text};
  border: 1px solid ${props => props.theme.border};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`;

export const SearchOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 200;
  display: flex;
  justify-content: center;
  padding-top: 100px;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const SearchModal = styled.div`
  width: 100%;
  max-width: 600px;
  max-height: 500px;
  background: ${props => props.theme.cardBg};
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid ${props => props.theme.border};

  svg {
    color: ${props => props.theme.subText};
    flex-shrink: 0;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1.1rem;
    color: ${props => props.theme.text};

    &::placeholder {
      color: ${props => props.theme.subText};
    }
  }

  .shortcut {
    padding: 4px 8px;
    background: ${props => props.theme.bg};
    border: 1px solid ${props => props.theme.border};
    border-radius: 6px;
    font-size: 0.75rem;
    color: ${props => props.theme.subText};
  }
`;

export const SearchResults = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export const ResultSection = styled.div`
  padding: 12px 0;

  .section-title {
    padding: 8px 20px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: ${props => props.theme.subText};
  }
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  cursor: pointer;
  transition: background 0.15s;

  &:hover {
    background: ${props => props.theme.bg};
  }

  .icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.$color || props.theme.colors.primary}20;
    color: ${props => props.$color || props.theme.colors.primary};
  }

  .info {
    flex: 1;

    .name {
      font-weight: 600;
      color: ${props => props.theme.text};
    }

    .sub {
      font-size: 0.85rem;
      color: ${props => props.theme.subText};
      margin-top: 2px;
    }
  }

  .arrow {
    color: ${props => props.theme.subText};
    opacity: 0;
    transition: opacity 0.15s;
  }

  &:hover .arrow {
    opacity: 1;
  }
`;

export const NoResults = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${props => props.theme.subText};

  svg {
    margin-bottom: 12px;
    opacity: 0.5;
  }

  p {
    font-size: 0.9rem;
  }
`;
