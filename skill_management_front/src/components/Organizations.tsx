import React from 'react';
import '../styles/Organizations.css';

interface Organization {
  id: number;
  company_name: string;
  position: string;
  start_date: string;
  end_date: string | null;
}

interface OrganizationsProps {
  organizations: Organization[];
}

const Organizations: React.FC<OrganizationsProps> = ({ organizations }) => {
  return (
    <section className="organizations-section">
      <div className="card">
        <h3>
          <i className="fas fa-building"></i> 所属組織
        </h3>
        <ul>
          {organizations.map((org) => (
            <li key={org.id}>
              <i className="fas fa-briefcase"></i> {org.company_name} -
              ポジション: {org.position} - 期間:{' '}
              {new Date(org.start_date).toLocaleDateString()} 〜{' '}
              {org.end_date
                ? new Date(org.end_date).toLocaleDateString()
                : '現在'}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Organizations;
