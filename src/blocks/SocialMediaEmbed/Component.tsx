"use client";

// Adicionada a diretiva para transformar este arquivo em um Client Component.

import React from 'react';
import dynamic from 'next/dynamic';

// Carregar react-player dinamicamente para evitar problemas de SSR
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

function isYouTubeOrVimeo(url: string) {
  return /youtube.com|youtu.be|vimeo.com/.test(url);
}

function isFacebookPost(url: string) {
  return /facebook.com\/.+\/posts\//.test(url) || /facebook.com\/permalink.php/.test(url);
}

function isFacebookPhoto(url: string) {
  return /facebook.com\/photo.php/.test(url);
}

function isInstagramPost(url: string) {
  return /instagram.com\/.+\/p\//.test(url);
}

function isTwitterPost(url: string) {
  return /twitter.com\/.+\/status\//.test(url);
}

export const SocialMediaEmbed: React.FC<{ url: string }> = ({ url }) => {
  if (!url) return null;

  if (isYouTubeOrVimeo(url)) {
    return (
      <div className="social-media-embed">
        <ReactPlayer url={url} width="100%" height="100%" controls />
      </div>
    );
  }

  if (isFacebookPost(url)) {
    return (
      <div className="social-media-embed">
        <iframe
          src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=500`}
          width="500"
          height="600"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
    );
  }

  if (isFacebookPhoto(url)) {
    return (
      <div className="social-media-embed">
        <iframe
          src={`https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(url)}&show_text=true&width=500`}
          width="500"
          height="600"
          style={{ border: 'none', overflow: 'hidden' }}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        />
      </div>
    );
  }

  if (isInstagramPost(url)) {
    // Extração segura do ID do post
    const match = url.match(/instagram.com\/p\/([^/]+)/);
    const postId = match ? match[1] : '';
    if (!postId) return null;
    return (
      <div className="social-media-embed">
        <iframe
          src={`https://www.instagram.com/p/${postId}/embed`}
          width="400"
          height="480"
          frameBorder="0"
          scrolling="no"
          allowTransparency={true}
        />
      </div>
    );
  }

  if (isTwitterPost(url)) {
    return (
      <blockquote className="twitter-tweet">
        <a href={url}>{url}</a>
      </blockquote>
    );
  }

  // Fallback: mensagem amigável
  return (
    <div className="social-media-embed">
      <span>Não foi possível embedar este conteúdo. <a href={url} target="_blank" rel="noopener noreferrer">Ver no Facebook</a></span>
    </div>
  );
};

export default SocialMediaEmbed;
