import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Dashboard.css';

const Dashboard: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="dashboard-container">
      <nav className="navbar">
        <h1>ダッシュボード</h1>
        <button onClick={logout} className="logout-button">
          ログアウト
        </button>
      </nav>
      <main className="main-content">
        <section className="welcome-section">
          <h2>ようこそ、ユーザーさん！</h2>
          <p>スキルと目標を管理し、進捗を確認しましょう。</p>
        </section>
        <section className="skills-section">
          <h3>あなたのスキル</h3>
          <ul>
            <li>React - 進行中</li>
            <li>TypeScript - 完了</li>
            <li>GraphQL - 進行中</li>
          </ul>
        </section>
        <section className="goals-section">
          <h3>あなたの目標</h3>
          <ul>
            <li>Reactプロジェクトを完了する - 進行中</li>
            <li>TypeScriptの習得 - 完了</li>
            <li>GraphQLの学習 - 進行中</li>
          </ul>
        </section>
        <section className="activity-section">
          <h3>最近のアクティビティ</h3>
          <ul>
            <li>14:00に新しいスキル「TypeScript」を追加</li>
            <li>10:00にタスク「Reactの学習」を完了</li>
            <li>昨日、スキル「GraphQL」の学習を開始</li>
          </ul>
        </section>
        <section className="notifications-section">
          <h3>通知</h3>
          <ul>
            <li>3件の新しいメッセージがあります</li>
            <li>「Djangoの学習」タスクの期限は明日です</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
