import React, { createContext, useContext, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 360px;

  @media (max-width: 768px) {
    left: 20px;
    right: 20px;
    max-width: none;
  }
`;

const ToastItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  background: ${props => props.theme.cardBg};
  border: 1px solid ${props => props.theme.border};
  border-left: 4px solid ${props => {
    switch (props.$type) {
      case 'success': return '#27ae60';
      case 'error': return '#e74c3c';
      case 'warning': return '#f39c12';
      default: return '#3498db';
    }
  }};
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: ${props => props.$removing ? slideOut : slideIn} 0.3s ease-out forwards;

  .icon {
    flex-shrink: 0;
    color: ${props => {
      switch (props.$type) {
        case 'success': return '#27ae60';
        case 'error': return '#e74c3c';
        case 'warning': return '#f39c12';
        default: return '#3498db';
      }
    }};
  }

  .content {
    flex: 1;
    min-width: 0;

    .title {
      font-weight: 600;
      margin-bottom: 2px;
    }

    .message {
      font-size: 0.9rem;
      color: ${props => props.theme.subText};
      word-break: break-word;
    }
  }

  .close {
    flex-shrink: 0;
    background: none;
    border: none;
    color: ${props => props.theme.subText};
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
      background: ${props => props.theme.bg};
      color: ${props => props.theme.text};
    }
  }
`;

const getIcon = (type) => {
  switch (type) {
    case 'success': return <CheckCircle size={20} />;
    case 'error': return <XCircle size={20} />;
    case 'warning': return <AlertCircle size={20} />;
    default: return <Info size={20} />;
  }
};

// Toast Context
const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

// Toast Provider
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.map(t =>
      t.id === id ? { ...t, removing: true } : t
    ));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 300);
  }, []);

  const addToast = useCallback(({ type = 'info', title, message, duration = 3000 }) => {
    const id = Date.now() + Math.random();

    setToasts(prev => [...prev, { id, type, title, message, removing: false }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const toast = {
    success: (title, message) => addToast({ type: 'success', title, message }),
    error: (title, message) => addToast({ type: 'error', title, message }),
    warning: (title, message) => addToast({ type: 'warning', title, message }),
    info: (title, message) => addToast({ type: 'info', title, message }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer>
        {toasts.map(t => (
          <ToastItem key={t.id} $type={t.type} $removing={t.removing}>
            <div className="icon">{getIcon(t.type)}</div>
            <div className="content">
              {t.title && <div className="title">{t.title}</div>}
              {t.message && <div className="message">{t.message}</div>}
            </div>
            <button className="close" onClick={() => removeToast(t.id)}>
              <X size={16} />
            </button>
          </ToastItem>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
