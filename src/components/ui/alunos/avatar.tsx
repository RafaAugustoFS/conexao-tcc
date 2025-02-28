"use client";

import * as React from "react";

interface AvatarProps {
  children: React.ReactNode;
  className?: string;
}

export function Avatar({ children, className }: AvatarProps) {
  return <div className={`relative flex items-center justify-center rounded-full bg-gray-200 ${className}`}>{children}</div>;
}

interface AvatarImageProps {
  src: string;
  alt?: string;
}

export function AvatarImage({ src, alt = "Avatar" }: AvatarImageProps) {
  return <img className="absolute inset-0 h-full w-full rounded-full object-cover" src={src} alt={alt} />;
}

interface AvatarFallbackProps {
  children: React.ReactNode;
}

export function AvatarFallback({ children }: AvatarFallbackProps) {
  return <span className="text-gray-600">{children}</span>;
}
