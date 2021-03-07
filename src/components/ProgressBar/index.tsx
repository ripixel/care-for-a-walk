import React, { useState, useEffect } from 'react';

import { calculateLocations } from './location-giver';

import styles from './styles.scss';

export const ProgressBar: React.FC = () => {
  const [info, setInfo] = useState<{
    locationsReachedAndNext: {
      title: string;
      distanceFromLastLocation: number;
      distanceFromStartPoint: number;
    }[];
    reached: number;
    next: number;
    totalKmWalked: any;
  }>();

  useEffect(() => {
    calculateLocations().then((result) => setInfo(result));
  }, []);

  if (!info) {
    return <p>Getting distances...</p>;
  }

  const { locationsReachedAndNext, reached, next, totalKmWalked } = info;

  const nextLocationDistanceFromStart =
    locationsReachedAndNext[next].distanceFromStartPoint;

  return (
    <div className={styles.container}>
      <p>
        So far, we've made it to {locationsReachedAndNext[reached].title}! Next
        up is {locationsReachedAndNext[next].title} - only{' '}
        <em>
          {Math.floor(nextLocationDistanceFromStart - totalKmWalked)}
          km
        </em>{' '}
        to go!
      </p>

      <div className={styles.labels}>
        {locationsReachedAndNext.map(
          (
            location: {
              distanceFromStartPoint: number;
              distanceFromLastLocation: number;
              title:
                | boolean
                | React.ReactChild
                | React.ReactFragment
                | React.ReactPortal
                | null
                | undefined;
            },
            index: number
          ) => (
            <>
              <span
                className={styles.label}
                style={{
                  marginLeft: `${
                    (location.distanceFromStartPoint /
                      nextLocationDistanceFromStart) *
                    100
                  }%`,
                }}
              >
                <em>{location.title}</em>
                <br />
                {location.distanceFromLastLocation}km
              </span>
              {index > 0 && index < locationsReachedAndNext.length - 1 && (
                <span
                  className={styles.labelMarker}
                  style={{
                    marginLeft: `${
                      (location.distanceFromStartPoint /
                        nextLocationDistanceFromStart) *
                      100
                    }%`,
                  }}
                />
              )}
            </>
          )
        )}
        <div className={styles.progressBarContainer}>
          <div
            className={styles.progressBar}
            style={{
              width: `${
                (totalKmWalked / nextLocationDistanceFromStart) * 100
              }%`,
            }}
          >
            <span />
          </div>
        </div>
      </div>

      <p>
        So far we've walked <em>{Math.floor(totalKmWalked)}km</em>!
      </p>
    </div>
  );
};

export default ProgressBar;
