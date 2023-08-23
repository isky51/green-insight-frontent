// useDashboardViewModel.ts
import { useEffect, useState } from 'react';
import { databaseListPost, tableColumnPost, tableListPost } from '../../store/dashboard/dashboardDataSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux.hooks';


// Modals for column and table
interface Database {
  id: number;
  name: string;
}

interface Column {
  coloum_type: string;
  coloum_name: string;
  checked: boolean;
}

interface Table {
  columns: Column[];
  t_id: any;
  tableName: string;
  tableChecked: boolean;
}

/**
 * 
 * @returns All the states and functions for DashboardView
 */

const DashboardController = () => {

  // All states 
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false)
  const [databaseState, setDatabaseState] = useState<Database[]>([]);
  const [selectedDatabase, setSelectedDatabase] = useState<string>('');
  const [selectedTables, setSelectedTables] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string>('');
  const [allTableWithColumn, setAllTableWithColumn] = useState<Table[]>([]);
  const [newDatabase, setNewDatabase] = useState<string>("")
  const [updateModal, setUpdateModal] = useState<boolean>(false)
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  // States from dashboard state
  const { databaseList, tableList, tableWithColumn, isLoadingTableList, isLoadingColumnList } = useAppSelector(
    (state) => state.dashboard
  );

  const dispatch = useAppDispatch()


  // Getting List of Databases
  useEffect(() => {
    dispatch(databaseListPost({ user_id: 1 }))
  }, [dispatch])

  // Storing the Database list into State
  useEffect(() => {
    if (databaseList) {
      setDatabaseState(databaseList)
    }
  }, [databaseList])

  // Selecting the Database
  const handleSelectDatabase = (event: any) => {
    setSelectedTables([])
    setActiveKey('')
    setSelectedDatabase(event.value)
  }

  // Gettng the list of TablesNames of selected Database
  useEffect(() => {
    if (selectedDatabase) {
      dispatch(tableListPost({ user_id: 1, db_id: selectedDatabase }))
    }
  }, [selectedDatabase, dispatch])

  // Setting all the tables to state initially
  useEffect(() => {
    if (tableList?.length) {
      setAllTableWithColumn(tableList)
    }
  }, [tableList])

  // Storing Id's of selected tables and getting the columns of table
  const handleSelectTable = (id: string) => {
    if (activeKey === id) {
      setActiveKey('')
    } else {
      setActiveKey(id)
    }
    if (!selectedTables.includes(id)) {
      const payload = { user_id: 1, db_id: selectedDatabase, table_id: [id] }
      setSelectedTables([...selectedTables, id])
      dispatch(tableColumnPost(payload))
    }
  }

  // Updating the list of tables with columns
  useEffect(() => {
    if (tableWithColumn) {
      setAllTableWithColumn((prev): any => {
        return prev.map((table) => {
          if (table.t_id === tableWithColumn.t_id) {
            return {
              ...table,
              tableChecked: table?.tableChecked || false,
              columns: tableWithColumn.columns.map((item: any) => {
                return { ...item, checked: table?.tableChecked ? true : false };
              }),
            };
          }
          return table;
        });
      });
    }
  }, [tableWithColumn])

  // Updating the status of column checked
  const handleCheckColumn = (t_id: string, column_name: string, checked: boolean) => {
    setAllTableWithColumn(prevTableData =>
      prevTableData.map(table => {
        if (table.t_id === t_id) {
          const newColumns = table.columns.map(column => {
            if (column.coloum_name === column_name) {
              return { ...column, checked: !checked };
            }
            return column;
          })

          const newTableCheck = newColumns.some(item => item?.checked === true)
          return {
            ...table,
            columns: newColumns,
            tableChecked: newTableCheck
          };
        }
        return table;
      }))
  }

  // Updating the status of table checked
  const handleCheckTable = (t_id: string, checked: boolean) => {
    setAllTableWithColumn(prevTableData =>
      prevTableData.map(table => {
        if (table.t_id === t_id) {
          return {
            ...table, tableChecked: !checked,
            columns: table?.columns?.map(column => {
              return { ...column, checked: !checked };
            })
          };
        }
        return table;
      }))
  }


  // Getting the list of chcked column
  const submitSelectedColumn = () => {
    setShowSubmitModal(true)
    setShowErrorMessage(false)
    setNewDatabase("")

  }

  // Consoling the selected column and opening update informatio modal
  const databaseModalSubmit = () => {
    if (newDatabase.trim()?.length > 0) {
      setShowSubmitModal(false)
      setUpdateModal(true)
    } else {
      setShowErrorMessage(true)
    }
  }

  // Fuction for close database model
  const handleCloseDatabaseModal = () => {
    setShowSubmitModal(false)
    setShowErrorMessage(false)
    setNewDatabase("")

  }

  //  All the states and functions returned
  return {
    showSubmitModal,
    databaseState,
    selectedDatabase,
    selectedTables,
    activeKey,
    allTableWithColumn,
    updateModal,
    setUpdateModal,
    setNewDatabase,
    newDatabase,
    setActiveKey,
    databaseModalSubmit,
    handleSelectDatabase,
    handleSelectTable,
    handleCheckColumn,
    handleCheckTable,
    submitSelectedColumn,
    showErrorMessage,
    setShowErrorMessage,
    handleCloseDatabaseModal,
    isLoadingTableList,
    isLoadingColumnList
  };
};

export default DashboardController;
