import React from 'react';

interface DeleteProps {
  fillColor: string;
  borderColor: string;
  height: number;
  width: number;
  className?: string;
}

export const Delete: React.FC<DeleteProps> = ({
  fillColor,
  borderColor,
  height,
  width,
  className,
}: DeleteProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 388.25 388.25"
      fill="#780ee1"
      stroke="#780ee1"
      strokeWidth="12"
    >
      <g strokeWidth="0"></g>
      <g strokeLinecap="round" strokeLinejoin="round"></g>
      <g>
        <g>
          <path
            fill={fillColor}
            d="M107.415,388.245h173.334c21.207,0,38.342-17.159,38.342-38.342V80.928H69.097v268.975 C69.097,371.086,86.264,388.245,107.415,388.245z M253.998,129.643c0-7.178,5.796-13.03,13.006-13.03 c7.178,0,13.006,5.853,13.006,13.03v208.311c0,7.21-5.828,13.038-13.006,13.038c-7.21,0-13.006-5.828-13.006-13.038V129.643z M181.491,129.643c0-7.178,5.804-13.03,13.006-13.03c7.178,0,13.006,5.853,13.006,13.03v208.311c0,7.21-5.828,13.038-13.006,13.038 c-7.202,0-13.006-5.828-13.006-13.038C181.491,337.954,181.491,129.643,181.491,129.643z M109.025,129.643 c0-7.178,5.796-13.03,12.973-13.03s13.038,5.853,13.038,13.03v208.311c0,7.21-5.861,13.038-13.038,13.038 c-7.178,0-12.973-5.828-12.973-13.038V129.643z"
          ></path>
          <path
            fill={fillColor}
            d="M294.437,20.451h-52.779C240.39,8.966,230.75,0,218.955,0h-49.682 c-11.86,0-21.476,8.966-22.736,20.451H93.792c-25.865,0-46.756,20.955-46.902,46.756h294.466 C341.258,41.407,320.335,20.451,294.437,20.451z"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default Delete;
