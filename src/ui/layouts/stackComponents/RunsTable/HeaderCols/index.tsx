import _ from 'lodash';
import React from 'react';

import { iconColors, iconSizes, ID_MAX_LENGTH } from '../../../../../constants';

import { useHistory, useSelector } from '../../../../hooks';
import { routePaths } from '../../../../../routes/routePaths';
import { truncate, formatDateToDisplayOnTable } from '../../../../../utils';
import { FlexBox, Paragraph, icons } from '../../../../components';
import { HeaderCol } from '../../../common/Table';
import { RunStatus } from '../RunStatus';

import { SortingHeader } from '../SortingHeader';
import { Sorting, SortingDirection } from '../types';
import { useService } from './useService';
import ReactTooltip from 'react-tooltip';
import { workspaceSelectors } from '../../../../../redux/selectors';

export const useHeaderCols = ({
  isExpended,
  runs,
  setRuns,
  activeSorting,
  activeSortingDirection,
  setActiveSortingDirection,
  setActiveSorting,
}: {
  isExpended?: boolean;
  runs: TRun[];
  setRuns: (runs: TRun[]) => void;
  activeSorting: Sorting | null;
  activeSortingDirection: SortingDirection | null;
  setActiveSortingDirection: (direction: SortingDirection | null) => void;
  setActiveSorting: (sorting: Sorting | null) => void;
}): HeaderCol[] => {
  const { sortMethod } = useService({
    setActiveSortingDirection,
    setActiveSorting,
    setRuns,
    activeSorting,
    activeSortingDirection,
    runs,
  });
  const history = useHistory();
  const selectedWorkspace = useSelector(workspaceSelectors.selectedWorkspace);

  return [
    // {
    //   width: '2%',
    //   renderRow: (stack: TStack) => <></>,
    // },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={runs.length === 1}
          sorting="id"
          sortMethod={sortMethod('id', {
            asc: (runs: TRun[]) => _.orderBy(runs, ['id'], ['asc']),
            desc: (runs: TRun[]) => _.orderBy(runs, ['id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph
            size="small"
            color="black"
            style={{ fontSize: '14px', marginLeft: '33px' }}
          >
            RUN ID
          </Paragraph>
        </SortingHeader>
      ),
      width: '20%',
      renderRow: (run: TRun) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={run.id}>
            <FlexBox.Row style={{ alignItems: 'center' }}>
              {isExpended ? (
                <icons.chevronDown
                  color={iconColors.grey}
                  size={iconSizes.xs}
                />
              ) : (
                <icons.rightArrow color={iconColors.grey} size={iconSizes.xs} />
              )}
              <Paragraph size="small" style={{ marginLeft: '20px' }}>
                {truncate(run.id, ID_MAX_LENGTH)}
              </Paragraph>
            </FlexBox.Row>
          </div>
          <ReactTooltip id={run.id} place="top" effect="solid">
            <Paragraph color="white">{run.id}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={runs.length === 1}
          sorting="name"
          sortMethod={sortMethod('name', {
            asc: (run: TRun[]) => _.orderBy(run, ['name'], ['asc']),
            desc: (run: TRun[]) => _.orderBy(run, ['name'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            RUN NAME
          </Paragraph>
        </SortingHeader>
      ),
      width: '30%',
      renderRow: (run: TRun) => (
        <div style={{ alignItems: 'center' }}>
          <div data-tip data-for={run.name}>
            <Paragraph size="small">{run.name}</Paragraph>
          </div>
          <ReactTooltip id={run.name} place="top" effect="solid">
            <Paragraph color="white">{run.name}</Paragraph>
          </ReactTooltip>
        </div>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={runs.length === 1}
          sorting="pipeline_id"
          sortMethod={sortMethod('pipeline_id', {
            asc: (run: TRun[]) => _.orderBy(run, ['pipeline_id'], ['asc']),
            desc: (run: TRun[]) => _.orderBy(run, ['pipeline_id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            PIPELINE
          </Paragraph>
        </SortingHeader>
      ),
      width: '7.5%',
      renderRow: (run: TRun) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={run.pipeline?.name && run.pipeline?.version}>
            <Paragraph
              size="small"
              style={{
                color: '#22BBDD',
                textDecoration: 'underline',
                zIndex: 100,
              }}
              onClick={(event) => {
                event.stopPropagation();
                history.push(
                  routePaths.pipeline.configuration(
                    run.pipeline?.id,
                    selectedWorkspace,
                  ),
                );
              }}
            >
              {run.pipeline?.name} ( v{run?.pipeline?.version} )
            </Paragraph>
          </div>
          <ReactTooltip
            id={run.pipeline?.name && run.pipeline?.version}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {run.pipeline?.name} ( v{run?.pipeline?.version} )
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },

    {
      render: () => (
        <SortingHeader
          onlyOneRow={runs.length === 1}
          sorting="status"
          sortMethod={sortMethod('status', {
            asc: (runs: TRun[]) => _.orderBy(runs, ['status'], ['asc']),
            desc: (runs: TRun[]) => _.orderBy(runs, ['status'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <div style={{ margin: '0 auto 0 auto' }}>
            <Paragraph
              size="small"
              color="black"
              style={{ fontSize: '14px', marginLeft: '-24px' }}
            >
              STATUS
            </Paragraph>
          </div>
        </SortingHeader>
      ),
      width: '7.5%',
      renderRow: (run: TRun) => <RunStatus run={run} />,
    },

    {
      render: () => (
        <SortingHeader
          onlyOneRow={runs.length === 1}
          sorting="stack_id"
          sortMethod={sortMethod('stack_id', {
            asc: (run: TRun[]) => _.orderBy(run, ['stack_id'], ['asc']),
            desc: (run: TRun[]) => _.orderBy(run, ['stack_id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            STACK NAME
          </Paragraph>
        </SortingHeader>
      ),
      width: '7.5%',
      renderRow: (run: TRun) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={run.stack?.name}>
            <Paragraph
              size="small"
              style={{
                color: '#22BBDD',
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
              onClick={(event) => {
                event.stopPropagation();
                history.push(
                  routePaths.stack.configuration(
                    run.stack?.id,
                    selectedWorkspace,
                  ),
                );
              }}
            >
              {run.stack?.name}
            </Paragraph>
          </div>
          <ReactTooltip id={run.stack?.name} place="top" effect="solid">
            <Paragraph color="white">{run.stack?.name}</Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={runs.length === 1}
          sorting="user_id"
          sortMethod={sortMethod('user_id', {
            asc: (run: TRun[]) => _.orderBy(run, ['user_id'], ['asc']),
            desc: (run: TRun[]) => _.orderBy(run, ['user_id'], ['desc']),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            AUTHOR
          </Paragraph>
        </SortingHeader>
      ),
      width: '7.5%',
      renderRow: (run: TRun) => {
        return (
          <FlexBox alignItems="center">
            <div
              data-tip
              data-for={
                run?.user?.full_name ? run?.user?.full_name : run?.user?.name
              }
            >
              <FlexBox alignItems="center">
                <Paragraph size="small">
                  {run?.user?.full_name
                    ? run?.user?.full_name
                    : run?.user?.name}
                </Paragraph>
              </FlexBox>
            </div>
            <ReactTooltip
              id={run?.user?.full_name ? run?.user?.full_name : run?.user?.name}
              place="top"
              effect="solid"
            >
              <Paragraph color="white">
                {run?.user?.full_name ? run?.user?.full_name : run?.user?.name}
              </Paragraph>
            </ReactTooltip>
          </FlexBox>
        );
      },
    },
    {
      render: () => (
        <SortingHeader
          onlyOneRow={runs.length === 1}
          sorting="created"
          sortMethod={sortMethod('created', {
            asc: (runs: TRun[]) =>
              _.orderBy(runs, (run: TRun) => new Date(run.created).getTime(), [
                'asc',
              ]),
            desc: (runs: TRun[]) =>
              _.orderBy(runs, (run: TRun) => new Date(run.created).getTime(), [
                'desc',
              ]),
          })}
          activeSorting={activeSorting}
          activeSortingDirection={activeSortingDirection}
        >
          <Paragraph size="small" color="black" style={{ fontSize: '14px' }}>
            CREATED AT
          </Paragraph>
        </SortingHeader>
      ),
      width: '20%',
      renderRow: (run: TRun) => (
        <FlexBox alignItems="center">
          <div data-tip data-for={formatDateToDisplayOnTable(run.created)}>
            <FlexBox alignItems="center">
              {/* <Box paddingRight="sm">
                <icons.calendar color={iconColors.grey} size={iconSizes.sm} />
              </Box> */}
              <Paragraph color="grey" size="tiny">
                {formatDateToDisplayOnTable(run.created)}
              </Paragraph>
            </FlexBox>
          </div>
          <ReactTooltip
            id={formatDateToDisplayOnTable(run.created)}
            place="top"
            effect="solid"
          >
            <Paragraph color="white">
              {formatDateToDisplayOnTable(run.created)}
            </Paragraph>
          </ReactTooltip>
        </FlexBox>
      ),
    },
  ];
};
