import { useEffect, useState, useRef, useMemo } from "react";
import "./styles.css";

const MESSAGES = [
  "Wow!",
  "Amazing!",
  "Nice!",
  "Unbelievable!",
  "Fantastic!",
  "Outstanding!",
  "Incredible!",
  "Brilliant!",
  "Excellent!",
  "Superb!",
  "Magnificent!",
  "Impressive!",
  "Spectacular!",
  "Phenomenal!",
  "Remarkable!",
  "Marvelous!",
  "Awesome!",
  "Gorgeous!",
  "Splendid!",
  "Terrific!",
  "Legendary!",
  "Top-tier!",
  "Next level!",
  "Godlike!",
  "You're unstoppable!",
  "You're killing it!",
  "You nailed it!",
  "That was perfect!",
  "Insane talent!",
  "Absolute genius!",
  "Peak performance!",
  "Elite!",
  "You're on fire!",
  "Keep it up!",
  "You are improving fast!",
  "That's real skill!",
  "You're built different!",
  "You shine!",
  "That was flawless!",
  "You crushed it!",
  "Total mastery!",
  "Extreme skill!",
  "You dominated!",
  "Too good!",
  "You're a star!",
  "That was smooth!",
  "That was clean!",
  "Sheer brilliance!",
  "Massive W!",
  "Never been better!",
  "You’re a legend!",
  "Perfection!",
  "Absolutely stunning!",
  "You exceeded expectations!",
  "Masterpiece!",
  "Top class!",
  "Big brain move!",
  "Unmatched!",
  "Glorious!",
  "Champion!",
  "You improved a lot!",
  "You’re rising!",
  "S-tier performance!",
  "Golden touch!",
  "Legend in the making!",
  "Formidable!",
  "Insanely good!",
  "Cracked!",
  "You’re unstoppable!",
  "That was inspirational!",
  "Skill issue — but not for you!",
  "Built for greatness!",
  "You made it look easy!",
  "Elite precision!",
  "Beyond expectations!",
  "Pure excellence!",
  "You're a natural!",
  "Your effort shows!",
  "Talent overload!",
  "You mastered it!",
  "Unreal ability!",
  "Unbreakable focus!",
  "Peak efficiency!",
  "You’re evolving rapidly!",
  "Your potential is limitless!",
  "You’re a powerhouse!",
  "You’re built for success!",
  "You’re exceptional!",
  "That’s championship energy!",
  "You’re in your prime!",
  "You’re a prodigy!",
  "You’re a force of nature!",
  "Leveling up!",
  "You’re making history!",
  "You set the standard!",
  "You’re unmatched!",
  "You’re a superstar!",
  "Ascended!",
  "Absolute unit!",
  "Victory is your habit!",
  "Too smooth!",
  "Unforgettable performance!"
];


const CHANGE_INTERVAL = 5;

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;

const formatTime = (s: number) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor((s % 3600) / 60))}:${pad(s % 60)}`;
};

export default function App() {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [msgColor, setMsgColor] = useState("#e2b922");
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickRef = useRef<HTMLAudioElement>(null);



  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        id: i,
        top: `${Math.random() * 100}vh`,
        left: `${Math.random() * 100}vw`,
        duration: `${5 + Math.random() * 5}s`,
      })),
    []
  );


  useEffect(() => {
    const start = () => {
      setStarted(true);
      if (audioRef.current) {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(() => { });
      }

      if (clickRef.current) {
        clickRef.current.volume = 0.5;
      }
    };
    window.addEventListener("click", start);
    return () => window.removeEventListener("click", start);
  }, []);

  useEffect(() => {
    if (!started) return;
    const timer = setInterval(() => {
      setSeconds((s) => {
        const next = s + 1;
        if (next % CHANGE_INTERVAL === 0) {
          setMsgColor(getRandomColor());
          if (clickRef.current) {
            clickRef.current.currentTime = 0;
            clickRef.current.play().catch(() => { });
          }
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started]);

  const message = MESSAGES[Math.floor(seconds / CHANGE_INTERVAL) % MESSAGES.length];

  return (
    <>
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            top: s.top,
            left: s.left,
            animationDuration: s.duration,
          }}
        />
      ))}

      <div id="container">
        {!started ? (
          <>
            <h1>Time Waster</h1>
            <h2 className="sub">クリックで時間を無駄にする →</h2>

            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />

            <span style={{ textAlign: "center", fontSize: "0.8rem", color: "#888" }}>
              created by: <a href="https://github.com/sodahub99k">https://github.com/sodahub99k</a>
            </span>
          </>
        ) : (
          <>
            <h1>Time Waster</h1>
            <div className="time">無駄にした時間: {formatTime(seconds)}</div>

            <pre className="aa">
              ┳┻|<br />
              ┻┳|<br />
              ┳┻|ヘミ∧   <span style={{ color: msgColor }}>{message}</span><br />
              ┻┳|・ο・)<br />
              ┳┻|⊂ノ<br />
              ┻┳|Ｊ<br />
            </pre>
          </>
        )}
      </div>

      <audio ref={audioRef} src="/bgm.mp3" loop />
      <audio ref={clickRef} src="/note.mp3" />
    </>
  );
}
