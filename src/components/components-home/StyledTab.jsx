import React from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

export const STabs = styled(Tabs)`
  font-size: 20px;
`;
export const StabList = styled(TabList)`
  padding: 4px;
  display: flex;
  margin: 0;
`;
export const STab = styled(Tab)`
  margin-right: 15px;
  border: none;
  padding: 15px;
  user-select: none;
  cursor: pointer;
  background: transparent;
  color: #9999;

  &.is-selected {
    color: white;
    background: transparent;
    border-bottom: 2px solid #fff;
    transition: 0.4s;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    color: #ffffffac;
  }
`;
export const STabPanel = styled(TabPanel)`
  margin-left: 200px;
  display: flex;
  justify-content: flex-start;
  margin-top: 80px;
  flex-wrap: wrap;

  @media (max-width: 1558px) {
    margin-left: 40px;

    display: flex;
    justify-content: center;
  }
`;
