export interface Issue {
  id: string;
  title: string;
  url: string;
  state: "OPEN" | "CLOSED";
  createdAt: string;
}

export interface IssuesData {
  repository: {
    issues: {
      edges: {
        node: Issue;
      }[];
      pageInfo: {
        startCursor: string;
        endCursor: string;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
      };
    };
  };
}