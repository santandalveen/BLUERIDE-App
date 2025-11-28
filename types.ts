import React from 'react';

export enum ViewState {
  HOME = 'HOME',
  BOOK_RIDE = 'BOOK_RIDE',
  RENT_CAR = 'RENT_CAR',
  BECOME_DRIVER = 'BECOME_DRIVER',
  RIDE_TRACKING = 'RIDE_TRACKING',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  buttonText: string;
  onClick: () => void;
  image: string;
}