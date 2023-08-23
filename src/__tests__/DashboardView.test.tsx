import {cleanup, render, screen, waitFor } from '@testing-library/react';
import DashboardView from '../pages/dashboard/DashboardView';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/redux.hooks';
import * as dashboardDataSlice from '../store/dashboard/dashboardDataSlice';

// Mocking Redux hooks and react-router-dom
jest.mock('../store/redux.hooks', () => ({
  ...jest.requireActual('../store/redux.hooks'),
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe("Dashboard component", () => {
  const dispatch = jest.fn();
  const mockNavigate = jest.fn();

  beforeEach(() => {
    // Mocking the hooks' behavior
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
    (useAppSelector as jest.Mock).mockReturnValue(() => ({
      dashboard: {
        isError: false,
        isSuccess: false,
        isLoadingTableList: false,
        isLoadingColumnList: false,
        isLoading: false,
        databaseList: [
          {name: 'lowes_staging', id: 21},
          {name: 'lowes_prod', id: 22},
          {name: 'lowes_qa', id: 23}],
        tableList: [],
        tableWithColumn: {
          t_id: "",
          tableName: "",
          columns: []
        }
      }
    }));
  });

  afterEach(() => {
    // Clearing mocks and cleaning up after each test
    jest.clearAllMocks();
    cleanup();
  });


  // Test: Rendering the Dashboard component
  it('renders Login component successfully.', () => {
    render(
      <DashboardView />
    );
    const linkElement = screen.getByTestId('dashboard');
    expect(linkElement).toBeInTheDocument();
  });


  // Test: Rendering the title correctly
  it('renders title correctly', async () => {
    render(
      <DashboardView />
    );

    const newTitle = 'Obfuscation';
    // Retrieve and check the updated tab title
    await waitFor(() => {
      expect(document.title).toBe(`GreenSight | ${newTitle}`);
    });
  });


  it('should call getDatabase API while loading pages', async () =>{
    
    const mockDatabaseListPost = jest.fn();
    jest.spyOn( dashboardDataSlice, 'databaseListPost').mockImplementation(mockDatabaseListPost);

    mockDatabaseListPost.mockResolvedValue({
      data:[
          {name: 'lowes_staging', id: 21},
          {name: 'lowes_prod', id: 22},
          {name: 'lowes_qa', id: 23}]
    });

    const mockTableListPost = jest.fn();
    jest.spyOn( dashboardDataSlice, 'tableListPost').mockImplementation(mockTableListPost);

    render(
      <DashboardView />
    );

    await waitFor(() => {
      expect(mockDatabaseListPost).toHaveBeenCalledWith({user_id: 1});
    })
 
});

})