import { useEffect, useState } from 'react';
import { Diary } from './types'
import diaryService from './services/diary';
import NewDiaryForm from './components/NewDiary';

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    (async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    })();
  }, []);

  return (
    <div>
      <NewDiaryForm diaries={diaries} setDiaries={setDiaries} />
      <h1>Diary entries</h1>
      {diaries.map((diary) => (
        <div key={diary.id}>
          <h2>{diary.date}</h2>
          <p>Visibility: {diary.visibility}</p>
          <p>Weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
}

export default App;