import React from 'react';
import '../styles/LearningLogs.css';

interface LearningLog {
  id: number;
  note: string;
  created_at: string;
}

interface LearningLogsProps {
  learningLogs: LearningLog[];
}

const LearningLogs: React.FC<LearningLogsProps> = ({ learningLogs }) => {
  return (
    <section className="learning-logs-section">
      <div className="card">
        <h3>
          <i className="fas fa-list"></i> 学習ログ
        </h3>
        <ul>
          {learningLogs.map((log) => (
            <li key={log.id}>
              <i className="fas fa-book-open"></i> {log.note} - 日付:{' '}
              {new Date(log.created_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default LearningLogs;
