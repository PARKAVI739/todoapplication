'use client';

import Image from "next/image";
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [data, setData] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/auth/me'); // Use axios directly, no need for response.json()
        console.log('User Data:', response.data); // Axios parses JSON automatically
        if (Object.keys(response.data).length) {
          setData(true); // User is authenticated
        } else {
          setData(false); // User is not authenticated
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {data ? (
          // If the user is authenticated, show Logout
          <div>
            <a
              href="/api/auth/logout"
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            >
              Logout
            </a>
          </div>
        ) : (
          // If the user is not authenticated, show Login
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <a
              className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
              href="/api/auth/login"
              target="_blank"
              rel="noopener noreferrer"
            >
              Login With Auth0
            </a>
          </div>
        )}
      </main>
    </div>
  );
}


