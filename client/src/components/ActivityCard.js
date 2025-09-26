import React from 'react';

const ActivityCard = ({ activity, index }) => {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    borderRadius: '16px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const emojiStyle = {
    fontSize: '2.5rem',
    marginBottom: '0.5rem',
    display: 'block'
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: '0.75rem',
    lineHeight: '1.2'
  };

  const descriptionStyle = {
    fontSize: '1rem',
    color: '#4a5568',
    lineHeight: '1.6',
    marginBottom: '1rem'
  };

  const metaStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1rem'
  };

  const tagStyle = {
    backgroundColor: '#e2e8f0',
    color: '#2d3748',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: '500'
  };

  const handleCardHover = (e, isHovering) => {
    if (isHovering) {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 28px rgba(0, 0, 0, 0.15)';
    } else {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => handleCardHover(e, true)}
      onMouseLeave={(e) => handleCardHover(e, false)}
    >
      {/* Activity Number Badge */}
      <div style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between'
      }}>
        <div style={{ flex: 1 }}>
          <span style={emojiStyle}>{activity.emoji}</span>
          <h3 style={titleStyle}>{activity.title}</h3>
        </div>
        <div style={{
          backgroundColor: '#667eea',
          color: 'white',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          fontWeight: '600',
          marginLeft: '1rem'
        }}>
          {index + 1}
        </div>
      </div>

      <p style={descriptionStyle}>{activity.description}</p>

      {/* Activity metadata */}
      <div style={metaStyle}>
        {activity.categories && activity.categories.map(category => (
          <span key={category} style={tagStyle}>
            {category}
          </span>
        ))}
        {activity.distanceFromCenter && (
          <span style={tagStyle}>
            📍 {activity.distanceFromCenter} km from center
          </span>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;