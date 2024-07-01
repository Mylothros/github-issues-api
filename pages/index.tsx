import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { gql } from "@apollo/client";
import client from "../utils/graphql";
import IssueList from "../components/IssueList";
import Pagination from "../components/Pagination";
import Filter from "../components/Filter";
import { IssuesData, Issue } from "../types/issue";
import styles from "../styles/Home.module.css";

const GET_ISSUES_QUERY = gql`
  query GetIssues(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: [IssueState!]
  ) {
    repository(owner: "reactjs", name: "reactjs.org") {
      issues(
        first: $first
        after: $after
        last: $last
        before: $before
        states: $filter
      ) {
        edges {
          node {
            id
            title
            url
            state
            createdAt
          }
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }
`;

interface HomeProps {
  initialIssues: Issue[];
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

const Home: React.FC<HomeProps> = ({
  initialIssues,
  startCursor,
  endCursor,
  hasNextPage,
  hasPreviousPage,
}) => {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);
  const [afterCursor, setAfterCursor] = useState<string | null>(endCursor);
  const [beforeCursor, setBeforeCursor] = useState<string | null>(startCursor);
  const [filter, setFilter] = useState<"OPEN" | "CLOSED" | null>(null);
  const [nextPage, setNextPage] = useState<boolean>(hasNextPage);
  const [previousPage, setPreviousPage] = useState<boolean>(hasPreviousPage);
  const [all, setAll] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [closed, setClosed] = useState<boolean>(false);

  const fetchIssues = async (variables: any) => {
    try {
      const { data } = await client.query<IssuesData>({
        query: GET_ISSUES_QUERY,
        variables,
      });
      const newIssues = data.repository.issues.edges.map((edge) => edge.node);
      setIssues(newIssues);
      setAfterCursor(data.repository.issues.pageInfo.endCursor);
      setBeforeCursor(data.repository.issues.pageInfo.startCursor);
      setNextPage(data.repository.issues.pageInfo.hasNextPage);
      setPreviousPage(data.repository.issues.pageInfo.hasPreviousPage);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const handleNextPage = async () => {
    await fetchIssues({
      first: 3,
      after: afterCursor,
      filter: filter,
    });
  };

  const handlePreviousPage = async () => {
    await fetchIssues({
      last: 3,
      before: beforeCursor,
      filter: filter,
    });
  };
  const handleFilterChange = async (newFilter: any) => {
    setFilter(newFilter);
    await fetchIssues({
      first: 3,
      filter: newFilter,
    });
    if (newFilter === null) {
      setAll(true);
      setOpen(false);
      setClosed(false);
    } else if (newFilter === "OPEN") {
      setOpen(true);
      setAll(false);
      setClosed(false);
    } else {
      setClosed(true);
      setAll(false);
      setOpen(false);
    }
  };

  return (
    <div className={styles.container}>
      <Filter
        onFilterChange={handleFilterChange}
        onAll={all}
        onOpen={open}
        onClosed={closed}
      />
      <IssueList issues={issues} />
      <Pagination
        hasNextPage={nextPage}
        hasPreviousPage={previousPage}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await client.query<IssuesData>({
    query: GET_ISSUES_QUERY,
    variables: {
      first: 3,
      after: null,
      before: null,
      filter: null,
    },
  });
  const issues = data.repository.issues.edges.map((edge) => edge.node);
  return {
    props: {
      initialIssues: issues,
      startCursor: data.repository.issues.pageInfo.startCursor,
      endCursor: data.repository.issues.pageInfo.endCursor,
      hasNextPage: data.repository.issues.pageInfo.hasNextPage,
      hasPreviousPage: data.repository.issues.pageInfo.hasPreviousPage,
    },
  };
};
export default Home;