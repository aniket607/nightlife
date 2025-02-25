import * as React from 'react';

export interface GuestDetails {
  name: string;
  age: number;
  mobile: string;
  email: string;
}

export interface CoupleDetails {
  male: GuestDetails;
  female: GuestDetails;
}

interface EmailTemplateProps {
  guestType: 'stag' | 'couple';
  guestDetails: GuestDetails[] | CoupleDetails[];
  event: {
    eventName: string;
    eventDate: Date;
    eventTime: Date;
    eventType: string;
    venue: {
      venueName: string;
      address: string;
      locationUrl?: string | null;
    };
  };
}

export const EmailTemplate = ({ guestType, guestDetails, event }: EmailTemplateProps) => (
  <div style={{
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#0A0A0A',
    color: '#ffffff',
    width: '100%',
    boxSizing: 'border-box'
  }}>
    {/* Header */}
    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
      <h1 style={{ 
        color: '#E5FF10',
        fontSize: '32px',
        fontWeight: '700',
        marginBottom: '12px',
        lineHeight: '1.2'
      }}>
        Guestlist Confirmation
      </h1>
      <p style={{ 
        color: '#ffffff', 
        fontSize: '18px',
        marginBottom: '24px',
        lineHeight: '1.5'
      }}>
        Your spot is confirmed! 🎉
      </p>
    </div>

    {/* Event Details */}
    <div style={{ 
      backgroundColor: '#151515',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '24px'
    }}>
      <h2 style={{ 
        color: '#E5FF10',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        📅 Event Details
      </h2>
      <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
        <strong>Event:</strong> {event.eventName}
      </p>
      <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
        <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString('en-US', { 
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
      <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
        <strong>Time:</strong> {(() => {
          const timeObj = new Date(event.eventTime);
          const hours = timeObj.getUTCHours();
          const minutes = timeObj.getUTCMinutes().toString().padStart(2, "0");
          const amPm = hours >= 12 ? "PM" : "AM";
          const hours12 = hours % 12 || 12;
          return `${hours12}:${minutes} ${amPm}`;
        })()}
      </p>
      <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
        <strong>Type:</strong> {event.eventType}
      </p>
    </div>

    {/* Venue Details */}
    <div style={{ 
      backgroundColor: '#151515',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '24px'
    }}>
      <h2 style={{ 
        color: '#E5FF10',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        📍 Venue Details
      </h2>
      <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
        <strong>Venue:</strong> {event.venue.venueName}
      </p>
      <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
        <strong>Address:</strong> {event.venue.address}
      </p>
      {event.venue.locationUrl && (
        <a 
          href={event.venue.locationUrl}
          style={{
            display: 'inline-block',
            marginTop: '16px',
            padding: '10px 20px',
            backgroundColor: '#E5FF10',
            color: '#000000',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          View on Maps 📍
        </a>
      )}
    </div>

    {/* Guest List */}
    <div style={{ 
      backgroundColor: '#151515',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '24px'
    }}>
      <h2 style={{ 
        color: '#E5FF10',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        👥 Guest List
      </h2>
      {guestType === 'stag' ? (
        <div>
          {(guestDetails as GuestDetails[]).map((guest, index) => (
            <div key={index} style={{ 
              marginBottom: index < guestDetails.length - 1 ? '20px' : 0,
              padding: '20px',
              backgroundColor: '#1A1A1A',
              borderRadius: '8px'
            }}>
              <p style={{ 
                margin: '0 0 12px 0',
                color: '#E5FF10',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Guest {index + 1}
              </p>
              <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
                <strong>Name:</strong> {guest.name}
              </p>
              <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
                <strong>Age:</strong> {guest.age}
              </p>
              <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
                <strong>Mobile:</strong> {guest.mobile}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {(guestDetails as CoupleDetails[]).map((couple, index) => (
            <div key={index} style={{ 
              marginBottom: index < guestDetails.length - 1 ? '20px' : 0,
              padding: '20px',
              backgroundColor: '#1A1A1A',
              borderRadius: '8px'
            }}>
              <p style={{ 
                margin: '0 0 12px 0',
                color: '#E5FF10',
                fontSize: '16px',
                fontWeight: '600'
              }}>
                Couple {index + 1}
              </p>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ 
                  margin: '0 0 8px 0',
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  Male Guest
                </p>
                <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
                  <strong>Name:</strong> {couple.male.name}
                </p>
                <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
                  <strong>Age:</strong> {couple.male.age}
                </p>
                <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
                  <strong>Mobile:</strong> {couple.male.mobile}
                </p>
              </div>
              <div>
                <p style={{ 
                  margin: '0 0 8px 0',
                  color: '#ffffff',
                  fontWeight: '600',
                  fontSize: '16px'
                }}>
                  Female Guest
                </p>
                <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
                  <strong>Name:</strong> {couple.female.name}
                </p>
                <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
                  <strong>Age:</strong> {couple.female.age}
                </p>
                <p style={{ margin: '8px 0', color: '#ffffff', fontSize: '16px' }}>
                  <strong>Mobile:</strong> {couple.female.mobile}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Important Notes */}
    <div style={{ 
      backgroundColor: '#151515',
      padding: '24px',
      borderRadius: '12px',
      marginBottom: '24px'
    }}>
      <h2 style={{ 
        color: '#E5FF10',
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        ⚠️ Important Notes
      </h2>
      <ul style={{ 
        margin: '0',
        paddingLeft: '24px',
        color: '#ffffff',
        fontSize: '16px',
        lineHeight: '1.6'
      }}>
        <li style={{ marginBottom: '8px' }}>
          ⏰ Please arrive at least 30 minutes before the event time
        </li>
        <li style={{ marginBottom: '8px' }}>
          🪪 Carry a valid ID proof
        </li>
        <li style={{ marginBottom: '8px' }}>
          🎫 Entry is subject to venue&apos;s right of admission
        </li>
        <li>
          👔 Dress code: Smart Casuals
        </li>
      </ul>
    </div>

    {/* Footer */}
    <div style={{ 
      textAlign: 'center',
      borderTop: '1px solid #333333',
      paddingTop: '24px'
    }}>
      <p style={{ 
        color: '#ffffff',
        fontSize: '14px',
        marginBottom: '8px',
        lineHeight: '1.5'
      }}>
        Thank you for choosing NightLife 🎉
      </p>
      <p style={{ 
        color: '#ffffff',
        fontSize: '14px',
        lineHeight: '1.5'
      }}>
        📧 For any queries, please contact support@nightlife.com
      </p>
    </div>
  </div>
);