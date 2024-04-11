import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../../hooks/useIssues";
import { LoadingIcon } from "../../shared/components/LoadingIcon";
import { State } from "../interfaces/issue";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

  const [state, setState] = useState<State>();

  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    state,
    labels: selectedLabels,
  });

  const onLabelChanged = (labelName: string) => {
    selectedLabels.includes(labelName)
      ? setSelectedLabels(selectedLabels.filter((label) => label !== labelName))
      : setSelectedLabels([...selectedLabels, labelName]);
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            state={state}
            onStateChange={(newState) => setState(newState)}
            issues={issuesQuery.data || []}
          />
        )}

        <div className="d-flex mt-2 justify-content-between align-items-center">
          <button
            className="btn btn-outline-primary"
            onClick={prevPage}
            disabled={issuesQuery.isFetching}
          >
            PREV
          </button>
          <span>{page}</span>
          <button
            className="btn btn-outline-primary"
            onClick={nextPage}
            disabled={issuesQuery.isFetching}
          >
            NEXT
          </button>
        </div>
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChange={(labelName) => onLabelChanged(labelName)}
        />
      </div>
    </div>
  );
};
