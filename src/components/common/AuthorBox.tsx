import React from 'react';
import SafeImage from './SafeImage';

interface AuthorBoxProps {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export const AuthorBox = ({ name, role, image, bio }: AuthorBoxProps) => {
  return (
    <div className="flex gap-6 items-start p-6 bg-neutral-900 rounded-lg">
      <div className="w-20 h-20 rounded-full overflow-hidden">
        <SafeImage
          image={image}
          alt={name}
          width={80}
          height={80}
          className="w-full h-full object-cover"
          fallbackText={name.charAt(0)}
        />
      </div>
      <div>
        <h4 className="font-montserrat font-bold text-lg">{name}</h4>
        <p className="text-accent-violet text-sm">{role}</p>
        <p className="mt-2 text-tertiary">{bio}</p>
      </div>
    </div>
  );
};
