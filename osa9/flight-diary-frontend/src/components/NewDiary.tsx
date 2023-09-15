import React, { useState } from 'react';
import { Diary, Visibility, Weather } from '../types';
import diaryService from '../services/diary';
import axios from 'axios';


interface NewDiaryFormProps {
  diaries: Diary[];
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
}

const NewDiaryForm = ({ diaries, setDiaries }: NewDiaryFormProps) => {
  const [formFields, setFormFields] = useState({
    date: '',
    visibility: '',
    weather: '',
    comment: ''
  });
  const [error, setError] = useState<string>('');

  const { date, visibility, weather, comment } = formFields;

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newDiary = {
      date,
      visibility,
      weather,
      comment
    };

    try {
      const diary = await diaryService.create(newDiary);
      setDiaries(diaries.concat(diary));
      setFormFields({
        date: '',
        visibility: '',
        weather: '',
        comment: ''
      });
      setError('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === 'string') {
          setError(error.response.data);
        } else {
          setError('Unexpected error.');
        }
      } else {
        setError('Unexpected server error.');
      }
    }
  };

  return (
    <div>
      <h2>Add new entry</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <p>
          Date:
          <input
            name='date'
            type='date'
            value={date}
            onChange={event => setFormFields({ ...formFields, date: event.target.value })}
          />
        </p>
        <p>
          Visibility:
          {Object.values(Visibility).map((option) => (
            <span key={option}>
              {option}
              <input
                type='radio'
                name='visibility'
                onChange={event => setFormFields({ ...formFields, visibility: event.target.value })}
                value={option}
              />
            </span>
          ))}
        </p>
        <p>
          Weather:
          {Object.values(Weather).map((option) => (
            <span key={option}>
              {option}
              <input
                type='radio'
                name='weather'
                onChange={event => setFormFields({ ...formFields, weather: event.target.value })}
                value={option}
              />
            </span>
          ))}
        </p>
        <p>
          Comment
          <input name='comment' value={comment} onChange={event => setFormFields({ ...formFields, comment: event.target.value })} />
        </p>
        <button type='submit'>Add</button>
      </form>
    </div>
  );
};

export default NewDiaryForm;