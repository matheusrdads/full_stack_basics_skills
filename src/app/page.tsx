
//src\app\page.tsx

'use client';

import React, { useEffect, useState } from 'react';

// 👤 Separate and clear type for each user
type UserType = {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
    country: string;
  };
};

type DataType = {
  string: string;
  number: number;
  boolean: boolean;
  nullValue: null | string;
  array: number[];
  object: {
    nestedKey: string;
    nestedArray: string[];
  };
  dateString: string;
  users: UserType[];
};

const ExamplePage = () => {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/data');
      const json = await res.json();
      setData(json);
    };

    fetchData();
  }, []);

  if (!data) return <div className="p-8 text-gray-600 dark:text-gray-300">Loading...</div>;

  return (
    <div className="p-8 space-y-6 bg-background text-foreground min-h-screen">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300">Fetched JSON Data</h1>

      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow p-4 space-y-2">
        <p><strong>String:</strong> {data.string}</p>
        <p><strong>Number:</strong> {data.number}</p>
        <p><strong>Boolean:</strong> {data.boolean ? "True" : "False"}</p>
        <p><strong>Null:</strong> {data.nullValue ?? "This is null"}</p>
        <p><strong>Date:</strong> {new Date(data.dateString).toLocaleDateString()}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        <ul className="space-y-4">
          {data.users.map((user: UserType) => (
            <li key={user.id} className="border border-gray-200 dark:border-gray-600 p-3 rounded-lg">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>City:</strong> {user.address.city}</p>
              <p><strong>Country:</strong> {user.address.country}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Loop over Array</h2>
        <ul className="list-disc pl-5 space-y-1">
          {data.array.map((item, index) => (
            <li key={index}>Item: {item}</li>
          ))}
        </ul>
      </div>

      <div className="bg-white dark:bg-gray-800 dark:text-gray-100 rounded-xl shadow p-4">
        <h2 className="text-xl font-semibold mb-2">Loop over Object</h2>
        <ul className="list-disc pl-5 space-y-1">
          {Object.entries(data.object).map(([key, value], index) => (
            <li key={index}>
              {key}: {Array.isArray(value) ? value.join(', ') : value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExamplePage;
