//src\app\DailyPractice\page.tsx

'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, setPage, RootState } from '@/store/store';
import { useTheme } from '@/context/ThemeContext';

type User = { id: number; name: string; email: string };

export default function DailyPractice() {
  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.list) as User[];
  const page = useSelector((state: RootState) => state.users.page);
  const { theme, toggleTheme } = useTheme();

  console.log('theme',theme)

  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [timeoutMsg, setTimeoutMsg] = useState('');
  const [countdown, setCountdown] = useState(10);
  const [countdownEnded, setCountdownEnded] = useState(false);

  const usersPerPage = 3;
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(filter.toLowerCase())
  );
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => dispatch(setUsers(data)))
      .catch(() => setMessage('❌ Error loading users'));
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeoutMsg('⏰ Timeout reached after 5 seconds!');
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown <= 0) {
      setCountdownEnded(true);
      return;
    }
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(`👋 Hello, ${name}!`);
    setName('');
  };

  return (
     <div className="flex justify-center items-center min-h-screen p-4 bg-background text-foreground">
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">🚀 Daily Practice</h2>

        <button
          onClick={toggleTheme}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          Toggle Theme: {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
        </button>

        <p className="text-gray-700 dark:text-gray-300">⏳ Countdown: {countdown}</p>
        {countdownEnded && <p className="text-green-600">✅ Countdown finished! Action triggered.</p>}
        {timeoutMsg && <p className="text-orange-500">{timeoutMsg}</p>}

        <input
          type="text"
          placeholder="🔍 Filter users"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            dispatch(setPage(1));
          }}
          className="w-full px-3 py-2 border rounded 
             bg-white text-black 
             dark:bg-gray-700 dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500"
        />

        <ul className="list-disc pl-5 text-gray-800 dark:text-gray-200">
          {paginatedUsers.map((u) => (
            <li key={u.id}>{u.name}</li>
          ))}
        </ul>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
            disabled={page === 1}
            className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
          >
            ⬅ Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => dispatch(setPage(Math.min(totalPages, page + 1)))}
            disabled={page === totalPages}
            className="bg-gray-300 dark:bg-gray-700 px-3 py-1 rounded disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            placeholder="👤 Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded 
             bg-white text-black 
             dark:bg-gray-700 dark:text-white 
             placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
            Send
          </button>
        </form>

        {message && <p className="text-blue-600 dark:text-blue-400">{message}</p>}
      </div>
    </div>
  );
}
