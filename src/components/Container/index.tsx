import React from 'react';

import bg from '../../../public/assets/bg.jpg';

import ProgressBar from '../ProgressBar';

import styles from './styles.scss';

export const Container: React.FC = () => (
  <div className={styles.container} style={{ backgroundImage: `url(${bg})` }}>
    <div className={styles.content}>
      <h1>Care for a walk?</h1>
      <ProgressBar />
    </div>
  </div>
);

export default Container;
