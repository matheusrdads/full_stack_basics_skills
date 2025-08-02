

import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    string: "Hello, world!",
    number: 42,
    boolean: true,
    nullValue: null,
    array: [1, 2, 3, 4],
    object: {
      nestedKey: "nestedValue",
      nestedArray: ["a", "b", "c"],
    },
    dateString: "2025-05-03T12:00:00Z",
    users: [
      {
        id: 101,
        name: "Alice",
        email: "alice@example.com",
        address: {
          city: "São Paulo",
          country: "Brazil",
        },
      },
      {
        id: 102,
        name: "Bob",
        email: "bob@example.com",
        address: {
          city: "Lisbon",
          country: "Portugal",
        },
      },
    ],
  };

  return NextResponse.json(data);
}
