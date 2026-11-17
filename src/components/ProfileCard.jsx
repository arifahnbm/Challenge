'use client';

import { portfolioData } from '../data/portfolio';

export default function ProfileCard() {
  const { profileCard } = portfolioData;

  return (
    <div className="profile-card-container">
      <div className="profile-card-frame">
        <img
          src={profileCard.image}
          alt={profileCard.alt}
          className="profile-photo"
          loading="eager"
        />
        <span className="profile-seal-badge" aria-hidden="true">
          {profileCard.sealJp}
        </span>
        <span className="profile-tag-pill">
          <i className="dot" />
          <span className="tag-jp">{profileCard.tagJp}</span>
          <span className="tag-en">{profileCard.tagEn}</span>
        </span>
        <div className="profile-card-caption">
          <b className="cap-jp">{profileCard.titleJp}</b>
          <i className="cap-sub">{profileCard.subtitle}</i>
        </div>
      </div>
    </div>
  );
}
