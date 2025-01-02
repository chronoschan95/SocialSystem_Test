import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import './AlertDialog.css';

const LoadingDots = () => (
  <span className="loading-dots">
    <span />
    <span />
    <span />
  </span>
);

const AlertDialog = ({ 
  isOpen, 
  onClose, 
  title, 
  message,
  detail = '',
  confirmText = '确定',
  cancelText = '取消',
  onConfirm,
  onCancel,
  type = 'info',
  autoClose = 0
}) => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer;
    if (isOpen && autoClose > 0) {
      timer = setTimeout(() => {
        onClose();
      }, autoClose);
    }
    return () => clearTimeout(timer);
  }, [isOpen, autoClose, onClose]);

  if (!isOpen) return null;

  const handleAction = async (action) => {
    try {
      setIsLoading(true);
      if (action === 'confirm' && onConfirm) {
        await onConfirm();
      } else if (action === 'cancel') {
        if (onCancel) {
          await onCancel();
        } else if (onClose) {
          await onClose();
        }
      }
    } catch (error) {
      console.error('Dialog action error:', error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div className="alert-dialog-overlay" onClick={() => !isLoading && onClose()}>
      <div 
        className={`alert-dialog ${isDarkMode ? 'alert-dialog-dark' : 'alert-dialog-light'}`}
        onClick={e => e.stopPropagation()}
      >
        <h2 className="alert-dialog-title">{title}</h2>
        <div className="alert-dialog-content">
          <p className="mb-2">{message}</p>
          {detail && <p className="text-sm text-gray-500 dark:text-gray-400">{detail}</p>}
        </div>
        <div className="alert-dialog-buttons">
          {onConfirm && (
            <button
              className={`alert-button ${type === 'error' ? 'alert-button-error' : 'alert-button-primary'}`}
              onClick={() => handleAction('confirm')}
              disabled={isLoading}
            >
              {isLoading ? '处理中...' : confirmText}
            </button>
          )}
          <button
            className="alert-button alert-button-secondary"
            onClick={() => handleAction('cancel')}
            disabled={isLoading}
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog; 