"use client";

const SucccessPage = () => {
  return (
    <div className="flex h-[calc(100vh-70px-133px)] items-center justify-center">
      <div>
        <div className="flex flex-col items-center space-y-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-28 w-28 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h1 className="text-4xl font-bold">Complete Sign !</h1>
          <p>
            Signing has been completed. You can check the contract through the same link anytime.
          </p>
          <a className="inline-flex items-center rounded rounded-full border border-gray-400 bg-secondary-500 px-6 py-2 font-semibold text-white shadow hover:opacity-80" href="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            <span className="text-sm font-medium">See our Site</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SucccessPage;
