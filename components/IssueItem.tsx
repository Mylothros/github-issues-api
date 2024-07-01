import React from "react";
import { Issue } from "../types/issue";
import styles from "../styles/Home.module.css";

interface IssueItemProps {
  issue: Issue;
}

const IssueItem: React.FC<IssueItemProps> = ({ issue }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{issue.title}</h2>
      <p className={styles.description}>{issue.state}</p>
      <a
        className={styles.link}
        href={issue.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        View Issue
      </a>
      <p className={styles.description}>Created at: {issue.createdAt}</p>
    </div>
  );
};
export default IssueItem;