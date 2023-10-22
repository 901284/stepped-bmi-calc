import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import { useState } from 'react';

export enum ScreenTypes {
  Weight = 'weightScreen',
  Height = 'heightScreen',
  Result = 'resultScreen',
}

const Home: NextPage = () => {
  const [currentScreen, setCurrentScreen] = useState(ScreenTypes.Weight);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [bmi, setBMI] = useState(0);

  const clickHandler = (ev: any) => {
    ev.preventDefault();

    switch (currentScreen) {
      case ScreenTypes.Weight:
        if (weight != 0) {
          setCurrentScreen(ScreenTypes.Height);
          return weight;
        } else {
          window.alert('Please enter a valid weight.');
        }
      case ScreenTypes.Height:
        if (height != 0) {
          setCurrentScreen(ScreenTypes.Result);
          return weight;
        } else {
          window.alert('Please enter a valid height.');
        }
      case ScreenTypes.Result:
        const calc: any = ((weight / (height * height)) * 10000).toFixed(1);
        setBMI(calc);
        console.warn('AAAA', bmi)
    }
  };

  return (
    <div className={styles.main}>
      {currentScreen === ScreenTypes.Weight && (
        <>
          <label>Enter your weight</label>
          <div className={styles.controls}>
            <input
              type="number"
              value={weight}
              onChange={(ev: any) => {
                setWeight(ev.target.value);
              }}
            />
            <button type="submit" onClick={clickHandler}>
              Next
            </button>
          </div>
        </>
      )}
      {currentScreen === ScreenTypes.Height && (
        <>
          <label>Enter your height</label>
          <div className={styles.controls}>
            <input
              type="number"
              value={height}
              onChange={(ev: any) => {
                setHeight(ev.target.value);
              }}
            />
            <button type="submit" onClick={clickHandler}>
              Calculate
            </button>
          </div>
        </>
      )}
      {currentScreen === ScreenTypes.Result && (
        <>
          <h3>Your BMI is:</h3>
          {((weight / (height * height)) * 10000).toFixed(1)}
          <button
            onClick={() => {
              setCurrentScreen(ScreenTypes.Height);
            }}
          >
            Start over
          </button>
        </>
      )}
    </div>
  );
};

export default Home;
