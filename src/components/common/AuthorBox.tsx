import React from 'react';

interface AuthorBoxProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const AuthorBox = ({ name, role, image, bio }: AuthorBoxProps) => {
  return (
    <div className="flex gap-6 items-start p-6 bg-neutral-900 rounded-lg">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full object-cover"
      />
      <div>
        <h4 className="font-montserrat font-bold text-lg">{name}</h4>
        <p className="text-accent-violet text-sm">{role}</p>
        <p className="mt-2 text-tertiary">{bio}</p>
      </div>
    </div>
  );
};