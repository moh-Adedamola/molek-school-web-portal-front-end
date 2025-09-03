// File: src/components/website/StaffCard.jsx
import React from 'react';
import { Mail, Phone, BookOpen } from 'lucide-react';

const StaffCard = ({ staff }) => {
  const {
    name,
    position,
    department,
    qualification,
    subjects,
    email,
    phone,
    image,
    experience,
    bio
  } = staff;

  return (
    <div className="card-base group hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Staff Photo */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <div className="w-24 h-24 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-neutral-200">
            {image ? (
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-600 font-semibold text-lg">
                {name.charAt(0)}
              </div>
            )}
          </div>
        </div>

        {/* Staff Information */}
        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-lg font-semibold text-neutral-800 mb-1">
            {name}
          </h3>
          <p className="text-primary-600 font-medium text-sm mb-2">
            {position}
          </p>
          
          {department && (
            <p className="text-neutral-600 text-sm mb-2">
              {department}
            </p>
          )}

          {qualification && (
            <p className="text-neutral-600 text-xs mb-3">
              {qualification}
            </p>
          )}

          {/* Subjects Taught */}
          {subjects && subjects.length > 0 && (
            <div className="flex flex-wrap gap-1 justify-center sm:justify-start mb-3">
              <BookOpen className="w-4 h-4 text-secondary-600 mt-0.5" />
              <div className="flex flex-wrap gap-1">
                {subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="badge-info text-xs px-2 py-0.5"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {experience && (
            <p className="text-neutral-600 text-xs mb-3">
              {experience} years experience
            </p>
          )}

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-2 text-xs text-neutral-500">
            {email && (
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <Mail className="w-3 h-3" />
                <span>{email}</span>
              </div>
            )}
            {phone && (
              <div className="flex items-center gap-1 justify-center sm:justify-start">
                <Phone className="w-3 h-3" />
                <span>{phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bio - Expandable */}
      {bio && (
        <div className="mt-4 pt-4 border-t border-neutral-200">
          <p className="text-sm text-neutral-600 line-clamp-3">
            {bio}
          </p>
        </div>
      )}
    </div>
  );
};

export default StaffCard;