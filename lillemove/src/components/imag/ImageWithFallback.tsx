import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

// Affiche l'image, ou un dégradé aux couleurs du site si elle ne se charge pas
// (image distante supprimée, pas de réseau...), pour ne pas casser la mise en page.
export function ImageWithFallback({ src, alt, className }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`${className ?? ''} aspect-[4/3] flex items-center justify-center bg-gradient-to-br from-[#0052CC] to-[#10B981] text-white text-4xl font-bold`}
      >
        {alt}
      </div>
    );
  }

  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}
