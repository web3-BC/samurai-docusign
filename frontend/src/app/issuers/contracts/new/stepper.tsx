import { Steps } from "./page";

type StepperProps = {
  currentStep: Steps;
  className?: string;
}

const Stepper = ({ currentStep, className }: StepperProps) => {
  return (
    <ol className={`flex w-full items-center text-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:text-base ${className || ""}`}>
      <li
        className={`${
          currentStep >= Steps.VerifyHuman ? "text-blue-600 " : ""
        }after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 dark:text-blue-500 dark:after:border-gray-700 sm:after:inline-block sm:after:content-[''] md:w-full xl:after:mx-10`}
      >
        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
          {currentStep > Steps.VerifyHuman ? (
            <svg
              className="mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          ) : (
            <span className="mr-2">1</span>
          )}
          Verify <span className="hidden sm:ml-2 sm:inline-flex">Human</span>
        </span>
      </li>
      <li
        className={`${
          currentStep >= Steps.FileUpload ? "text-blue-600 " : ""
        }after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 after:content-[''] dark:after:border-gray-700 sm:after:inline-block md:w-full xl:after:mx-10`}
      >
        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
          {currentStep > Steps.FileUpload ? (
            <svg
              className="mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          ) : (
            <span className="mr-2">2</span>
          )}
          Upload <span className="hidden sm:ml-2 sm:inline-flex">File</span>
        </span>
      </li>
      <li
        className={`${
          currentStep >= Steps.RegisterSinger ? "text-blue-600 " : ""
        }after:border-1 flex items-center after:mx-6 after:hidden after:h-1 after:w-full after:border-b after:border-gray-200 after:content-[''] dark:after:border-gray-700 sm:after:inline-block md:w-full xl:after:mx-10`}
      >
        <span className="flex items-center after:mx-2 after:text-gray-200 after:content-['/'] dark:after:text-gray-500 sm:after:hidden">
          {currentStep > Steps.RegisterSinger ? (
            <svg
              className="mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
          ) : (
            <span className="mr-2">3</span>
          )}
          Regsiter <span className="hidden sm:ml-2 sm:inline-flex">Signer</span>
        </span>
      </li>
      <li
        className={`${
          currentStep >= Steps.GetLink ? "text-blue-600 " : ""
        }flex items-center`}
      >
        {currentStep > Steps.GetLink ? (
          <svg
            className="mr-2.5 h-3.5 w-3.5 sm:h-4 sm:w-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
        ) : (
          <span className="mr-2">4</span>
        )}
        Get <span className="hidden sm:ml-2 sm:inline-flex">Link</span>
      </li>
    </ol>
  );
};

export default Stepper;

