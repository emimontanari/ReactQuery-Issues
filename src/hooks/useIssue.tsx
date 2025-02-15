import { useQuery } from "@tanstack/react-query";
import { Issue } from "../issues/interfaces/issue";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../helpers/sleep";

export const getIssueIndo = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);

  return data;
};

export const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );

  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issue", issueNumber],
    queryFn: () => getIssueIndo(issueNumber),
  });
  const commentsQuery = useQuery({
    queryKey: ["issue", issueNumber, "comments"],
    queryFn: () => getIssueComments(issueQuery.data!.number),
    enabled: issueQuery.data !== undefined
  });

  return {
    issueQuery,
    commentsQuery
  };
};
